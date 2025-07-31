import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Save, Plus, AlertCircle, Upload, Camera } from "lucide-react";
import { UploadFile } from "@/integrations/Core";

import CountrySelect from "./CountrySelect";

const INTEREST_OPTIONS = [
  "prayer", "quran_study", "hadith", "arabic_language", "islamic_history",
  "family_life", "community_service", "charity", "fasting", "pilgrimage",
  "islamic_finance", "converts_support", "interfaith_dialogue", "youth_programs"
];

const MENTOR_SPECIALTIES = [
  "prayer", "quran_study", "daily_life", "family_matters", "workplace_challenges",
  "community_integration", "arabic_language", "islamic_history", "converts_guidance",
  "youth_mentoring", "womens_issues", "mens_issues"
];

export default function ProfileEditForm({ user, onSave, onCancel, isProfileIncomplete }) {
  const [formData, setFormData] = useState({
    display_name: user?.display_name || "",
    gender: user?.gender || "",
    country_of_origin: user?.country_of_origin || "",
    location: user?.location || "",
    bio: user?.bio || "",
    conversion_date: user?.conversion_date || "",
    interests: user?.interests || [],
    is_mentor: user?.is_mentor || false,
    mentor_specialties: user?.mentor_specialties || [],
    profile_image_url: user?.profile_image_url || ""
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.display_name && formData.gender && formData.country_of_origin) {
      onSave(formData);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({ ...prev, profile_image_url: file_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsUploading(false);
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      mentor_specialties: prev.mentor_specialties.includes(specialty)
        ? prev.mentor_specialties.filter(s => s !== specialty)
        : [...prev.mentor_specialties, specialty]
    }));
  };
  
  const canSave = formData.display_name && formData.gender && formData.country_of_origin;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  className="text-white hover:bg-white/20"
                  disabled={isProfileIncomplete}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {isProfileIncomplete && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                    <div>
                      <h4 className="font-semibold text-amber-800">Complete Your Profile</h4>
                      <p className="text-amber-700 text-sm">Please fill out the required fields (*) to continue using the app.</p>
                    </div>
                  </div>
                )}

                {/* Profile Picture Section */}
                <div className="space-y-4 text-center">
                  <Label className="text-emerald-800 font-semibold">Profile Picture</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      {formData.profile_image_url ? (
                        <img 
                          src={formData.profile_image_url} 
                          alt="Profile" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-emerald-200 shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center border-4 border-emerald-200 shadow-lg">
                          <Camera className="w-12 h-12 text-emerald-600" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-image"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-2 right-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                    {isUploading && (
                      <p className="text-sm text-emerald-600">Uploading image...</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="display_name" className="text-emerald-800 font-semibold">
                      Display Name *
                    </Label>
                    <Input
                      id="display_name"
                      placeholder="How should others see your name?"
                      value={formData.display_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                      required
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-emerald-800 font-semibold">
                      Gender *
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                      required
                    >
                      <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country_of_origin" className="text-emerald-800 font-semibold">
                      Country of Origin *
                    </Label>
                    <CountrySelect
                      value={formData.country_of_origin}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country_of_origin: value }))}
                      placeholder="Select your country of origin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-emerald-800 font-semibold">
                      Current Location (Optional)
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, State, Country"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="conversion_date" className="text-emerald-800 font-semibold">
                      Conversion Date (Optional)
                    </Label>
                    <Input
                      id="conversion_date"
                      type="date"
                      value={formData.conversion_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, conversion_date: e.target.value }))}
                      className="border-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-emerald-800 font-semibold">
                    Your Story
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Share your conversion journey, experiences, or anything you'd like the community to know about you..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    className="border-emerald-200 focus:border-emerald-500 min-h-32 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-emerald-800 font-semibold">Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleInterest(interest)}
                        className={formData.interests.includes(interest)
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }
                      >
                        {interest.replace(/_/g, ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-emerald-100 pt-8">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.is_mentor}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_mentor: checked }))}
                    />
                    <Label className="text-emerald-800 font-semibold">
                      I'm available to mentor new reverts
                    </Label>
                  </div>
                  <p className="text-sm text-emerald-600">
                    Mentors help guide new Muslims through their journey and answer questions
                  </p>

                  {formData.is_mentor && (
                    <div className="space-y-4 bg-emerald-50 p-6 rounded-2xl">
                      <Label className="text-emerald-800 font-semibold">Mentoring Specialties</Label>
                      <div className="flex flex-wrap gap-2">
                        {MENTOR_SPECIALTIES.map((specialty) => (
                          <Button
                            key={specialty}
                            type="button"
                            variant={formData.mentor_specialties.includes(specialty) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSpecialty(specialty)}
                            className={formData.mentor_specialties.includes(specialty)
                              ? "bg-amber-600 hover:bg-amber-700 text-white"
                              : "border-amber-200 text-amber-700 hover:bg-amber-50"
                            }
                          >
                            {specialty.replace(/_/g, ' ')}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isProfileIncomplete}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!canSave}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
