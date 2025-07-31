import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Clock, User } from 'lucide-react';

const POST_TYPE_STYLES = {
  story: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  question: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  advice: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  celebration: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
  resource_share: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" }
};

export default function PostCard({ post }) {
  const typeStyle = POST_TYPE_STYLES[post.post_type] || POST_TYPE_STYLES.story;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-emerald-200">
                <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 font-semibold">
                  {post.is_anonymous ? (
                    <User className="w-5 h-5" />
                  ) : (
                    post.author_name?.charAt(0) || "U"
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author_name || "Community Member"}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {format(new Date(post.created_date), "MMM d, yyyy")}
                </div>
              </div>
            </div>
            
            <Badge 
              className={`${typeStyle.bg} ${typeStyle.border} ${typeStyle.text} border font-medium`}
            >
              {post.post_type.replace(/_/g, ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {post.title}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
                >
                  #{tag.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Heart className="w-4 h-4 mr-1" />
                {post.likes_count || 0}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Reply
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
