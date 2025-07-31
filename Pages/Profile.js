import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, MapPin, Calendar, Heart, Users, Settings, Globe, PersonStanding } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

import ProfileEditForm from "../components/profile/ProfileEditForm";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      
      const incomplete = !userData.display_name || !userData.gender || !userData.country_of_origin;
      setIsProfileIncomplete(incomplete);
      if (incomplete) {
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setIsLoading(false);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      await User.updateMyUserData(updatedData);
      setIsEditing(false);
      loadUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white/80 rounded-3xl p-8 shadow-lg animate-pulse">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full"></div>
              <div className="space-y-3">
                <div className="h-8 bg-emerald-100 rounded w-48"></div>
                <div className="h-4 bg-emerald-50 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <ProfileEditForm
        user={user}
        onSave={handleProfileUpdate}
        onCancel={() => setIsEditing(false)}
        isProfileIncomplete={isProfileIncomplete}
      />
    );
  }

  const yearsAsMentor = user?.conversion_date ? 
    new Date().getFullYear() - new Date(user.conversion_date).getFullYear() : 0;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    {user?.profile_image_url ? (
                      <img 
                        src={user.profile_image_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-white text-emerald-700 text-2xl font-bold">
                        {(user?.display_name || user?.full_name || "U").charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">
                      {user?.display_name || user?.full_name || "Community Member"}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-emerald-100">
                      {user?.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {user.location}
                        </div>
                      )}
                      {user?.country_of_origin && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          From {user.country_of_origin}
                        </div>
                      )}
                      {user?.conversion_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Reverted {format(new Date(user.conversion_date), "MMMM yyyy")}
                        </div>
                      )}
                      {user?.is_mentor && (
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Users className="w-3 h-3 mr-1" />
                          Mentor
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {user?.bio && (
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    My Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-emerald-50 p-6 rounded-2xl">
                    {user.bio}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {user?.gender && (
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                      <PersonStanding className="w-5 h-5" />
                      Gender
                    </h3>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 capitalize">
                      {user.gender}
                    </Badge>
                  </div>
                )}
                {user?.interests && user.interests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <Badge
                          key={index}
                          className="bg-emerald-100 text-emerald-800 border-emerald-200"
                        >
                          {interest.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user?.is_mentor && user?.mentor_specialties && user.mentor_specialties.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4">Mentor Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.mentor_specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          className="bg-amber-100 text-amber-800 border-amber-200"
                        >
                          {specialty.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Available to mentor new reverts for {yearsAsMentor}+ years
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
