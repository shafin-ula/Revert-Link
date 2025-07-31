import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, MessageCircle, Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function MentorCard({ mentor, onConnect }) {
  const yearsAsMentor = mentor.conversion_date ? 
    new Date().getFullYear() - new Date(mentor.conversion_date).getFullYear() : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl overflow-hidden h-full">
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center">
            <Avatar className="w-20 h-20 border-4 border-emerald-200 mb-4">
              <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 text-xl font-bold">
                {(mentor.display_name || mentor.full_name || "M").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold text-gray-900">
              {mentor.display_name || mentor.full_name || "Mentor"}
            </h3>
            <div className="flex items-center gap-2 text-emerald-600 text-sm">
              <Star className="w-4 h-4" />
              <span>Mentor for {yearsAsMentor}+ years</span>
            </div>
            {mentor.location && (
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                {mentor.location}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {mentor.bio && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {mentor.bio}
            </p>
          )}

          {mentor.mentor_specialties && mentor.mentor_specialties.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-emerald-800 mb-2">Specializes in:</p>
              <div className="flex flex-wrap gap-2">
                {mentor.mentor_specialties.slice(0, 3).map((specialty, index) => (
                  <Badge
                    key={index}
                    className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs"
                  >
                    {specialty.replace(/_/g, ' ')}
                  </Badge>
                ))}
                {mentor.mentor_specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{mentor.mentor_specialties.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {mentor.interests && mentor.interests.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">Interests:</p>
              <div className="flex flex-wrap gap-1">
                {mentor.interests.slice(0, 3).map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-50 text-gray-600 text-xs"
                  >
                    {interest.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {mentor.conversion_date && (
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
              <Calendar className="w-4 h-4" />
              <span>Reverted {format(new Date(mentor.conversion_date), "MMMM yyyy")}</span>
            </div>
          )}

          <Button
            onClick={onConnect}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Connect as Mentee
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
