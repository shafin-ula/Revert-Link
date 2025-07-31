import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, Heart, MessageCircle, Sparkles } from "lucide-react";

export default function ConnectModal({ revert, onSend, onClose }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
    }
  };

  const conversionYear = revert.conversion_date ? 
    new Date(revert.conversion_date).getFullYear() : null;

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
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  Connect with {revert.display_name || revert.full_name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <Avatar className="w-16 h-16 border-3 border-purple-200 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 text-xl font-bold">
                    {(revert.display_name || revert.full_name || "R").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {revert.display_name || revert.full_name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    {revert.location && (
                      <p className="text-purple-600">📍 {revert.location}</p>
                    )}
                    {conversionYear && (
                      <p className="text-purple-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Reverted {conversionYear}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="connect-message" className="block text-emerald-800 font-semibold mb-2">
                    Send a friendly message
                  </label>
                  <Textarea
                    id="connect-message"
                    placeholder="Assalamu alaikum! I saw your profile and thought we might have some common interests. Would love to connect and chat about our Islamic journey together..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-500 min-h-32 resize-none"
                  />
                  <p className="text-sm text-emerald-600 mt-2">
                    Share why you'd like to connect - common interests, similar experiences, or just wanting to make a new friend!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-800">Building Connections</h4>
                  </div>
                  <p className="text-sm text-emerald-700">
                    Remember, every Muslim is your brother or sister. Be kind, respectful, 
                    and open to new friendships. May Allah bless your connections! 💚
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Maybe Later
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Connection Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
