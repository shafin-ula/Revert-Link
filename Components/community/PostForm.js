import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Send, Eye, EyeOff } from "lucide-react";

const POST_TYPES = [
  { value: "story", label: "Share Story", description: "Share your conversion journey" },
  { value: "question", label: "Ask Question", description: "Seek guidance from the community" },
  { value: "advice", label: "Give Advice", description: "Share wisdom and experience" },
  { value: "celebration", label: "Celebrate", description: "Share happy moments" },
  { value: "resource_share", label: "Share Resource", description: "Recommend useful content" }
];

const COMMON_TAGS = [
  "conversion_story", "prayer", "family", "workplace", "community", "learning", 
  "challenges", "celebration", "ramadan", "hajj", "relationships", "support"
];

export default function PostForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    post_type: "",
    tags: [],
    is_anonymous: false
  });
  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.post_type) {
      onSubmit(formData);
    }
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCustomTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      addTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-8"
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200">
          <CardTitle className="flex items-center justify-between text-emerald-900">
            <span className="text-xl font-bold">Share with the Community</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="post_type" className="text-emerald-800 font-semibold">Post Type</Label>
                <Select
                  value={formData.post_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, post_type: value }))}
                >
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                    <SelectValue placeholder="What would you like to share?" />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-gray-500">{type.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-emerald-800 font-semibold flex items-center gap-2">
                  <Switch
                    checked={formData.is_anonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_anonymous: checked }))}
                  />
                  <span className="flex items-center gap-2">
                    {formData.is_anonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    Post Anonymously
                  </span>
                </Label>
                <p className="text-sm text-emerald-600">
                  {formData.is_anonymous ? "Your post will show as 'Anonymous'" : "Your name will be visible"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-emerald-800 font-semibold">Title</Label>
              <Input
                id="title"
                placeholder="Give your post a meaningful title..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="border-emerald-200 focus:border-emerald-500 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-emerald-800 font-semibold">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, experiences, or questions..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="border-emerald-200 focus:border-emerald-500 min-h-32 resize-none"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-emerald-800 font-semibold">Tags</Label>
              
              <div className="flex flex-wrap gap-2">
                {COMMON_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant={formData.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                    className={formData.tags.includes(tag) 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    }
                  >
                    {tag.replace(/_/g, ' ')}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                  className="border-emerald-200 focus:border-emerald-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomTag}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  Add
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag.replace(/_/g, ' ')}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
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
                disabled={!formData.title || !formData.content || !formData.post_type}
              >
                <Send className="w-4 h-4 mr-2" />
                Share Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
