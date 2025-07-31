import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, Heart } from "lucide-react";

const HELP_AREAS = [
  "Prayer and worship",
  "Quran study",
  "Islamic history",
  "Daily Islamic practices",
  "Family relationships",
  "Community integration",
  "Workplace challenges",
  "Converting questions",
  "Arabic language",
  "Islamic finance",
  "Other"
];

export default function MentorRequestForm({ mentor, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    area_of_help: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.area_of_help && formData.message) {
      onSubmit(formData);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <Heart className="w-6 h-6" />
                  Connect with {mentor.display_name || mentor.full_name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8 p-4 bg-emerald-50 rounded-2xl">
                <Avatar className="w-16 h-16 border-3 border-emerald-200">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 text-xl font-bold">
                    {(mentor.display_name || mentor.full_name || "M").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">
                    {mentor.display_name || mentor.full_name}
                  </h3>
                  <p className="text-emerald-600">
                    Ready to help with your Islamic journey
                  </p>
                  {mentor.location && (
                    <p className="text-sm text-emerald-500">📍 {mentor.location}</p>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="area_of_help" className="text-emerald-800 font-semibold">
                    What would you like help with?
                  </Label>
                  <Select
                    value={formData.area_of_help}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, area_of_help: value }))}
                  >
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                      <SelectValue placeholder="Choose an area..." />
                    </SelectTrigger>
                    <SelectContent>
                      {HELP_AREAS.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-emerald-800 font-semibold">
                    Personal Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell your mentor a bit about yourself and what specific guidance you're seeking..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500 min-h-32 resize-none"
                  />
                  <p className="text-sm text-emerald-600">
                    The more specific you are, the better your mentor can help you!
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Your request will be sent to the mentor. 
                    They'll contact you directly if they're available to help.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!formData.area_of_help || !formData.message}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
