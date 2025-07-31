
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Link, User, Book, Video, Mic, Smartphone, BookOpen } from 'lucide-react';

const TYPE_ICONS = {
  article: <Book className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  audio: <Mic className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  course: <Video className="w-4 h-4" />,
  app: <Smartphone className="w-4 h-4" />,
};

const CATEGORY_COLORS = {
  quran: "bg-green-100 text-green-800 border-green-200",
  hadith: "bg-blue-100 text-blue-800 border-blue-200",
  prayer: "bg-purple-100 text-purple-800 border-purple-200",
  fasting: "bg-yellow-100 text-yellow-800 border-yellow-200",
  charity: "bg-pink-100 text-pink-800 border-pink-200",
  pilgrimage: "bg-orange-100 text-orange-800 border-orange-200",
  daily_life: "bg-indigo-100 text-indigo-800 border-indigo-200",
  converts_guide: "bg-amber-100 text-amber-800 border-amber-200",
};

export default function ResourceCard({ resource }) {
  const categoryStyle = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS.daily_life;
  const typeIcon = TYPE_ICONS[resource.resource_type] || <Book className="w-4 h-4" />;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl overflow-hidden h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
              {resource.title}
            </CardTitle>
            <div className="flex items-center justify-center p-2 bg-emerald-100 text-emerald-700 rounded-full flex-shrink-0">
              {typeIcon}
            </div>
          </div>
          <Badge className={`${categoryStyle} font-medium self-start`}>
            {resource.category.replace(/_/g, ' ')}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              {resource.description}
            </p>
            {resource.author && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{resource.author}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
            <Badge variant="outline" className={`bg-${resource.difficulty_level === 'beginner' ? 'green' : resource.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-50 text-${resource.difficulty_level === 'beginner' ? 'green' : resource.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-700 border-${resource.difficulty_level === 'beginner' ? 'green' : resource.difficulty_level === 'intermediate' ? 'yellow' : 'red'}-200`}>
              {resource.difficulty_level}
            </Badge>
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Link className="w-4 h-4 mr-2" />
                Visit
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
