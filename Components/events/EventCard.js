import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const EVENT_TYPE_STYLES = {
  study_circle: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  iftar: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  social_gathering: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  workshop: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  charity: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
};

export default function EventCard({ event }) {
  const typeStyle = EVENT_TYPE_STYLES[event.event_type] || EVENT_TYPE_STYLES.social_gathering;
  const isPast = new Date(event.date) < new Date();
  
  // Create a placeholder image with SVG and CSS gradient
  const placeholderImage = (
    <div 
      className="h-40 rounded-t-3xl"
      style={{
        background: `linear-gradient(45deg, ${typeStyle.bg.replace('bg-','').replace('-100','-200')} 0%, ${typeStyle.bg.replace('bg-','').replace('-100','-300')} 100%)`
      }}
    >
      <div className="flex items-center justify-center h-full text-4xl font-bold opacity-30"
           style={{color: typeStyle.text.replace('text-','').replace('-800','-500')}}>
        {event.title.charAt(0)}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl overflow-hidden h-full flex flex-col ${isPast ? 'opacity-70' : ''}`}>
        {placeholderImage}
        
        <CardContent className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <Badge className={`${typeStyle.bg} ${typeStyle.text} ${typeStyle.border} border`}>
                {event.event_type.replace(/_/g, ' ')}
              </Badge>
              {isPast && (
                <Badge variant="outline">Past Event</Badge>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
              {event.description}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{event.location}</span>
            </div>
            {event.max_attendees && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{event.current_attendees} / {event.max_attendees} attending</span>
              </div>
            )}
          </div>
          
          <div className="pt-6 mt-4 border-t border-gray-100">
            <Button
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isPast}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
