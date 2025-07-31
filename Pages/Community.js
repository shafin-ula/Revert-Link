import React, { useState, useEffect } from "react";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PostForm from "../components/community/PostForm";
import PostCard from "../components/community/PostCard";
import PostFilters from "../components/community/PostFilters";
import WelcomeHero from "../components/community/WelcomeHero";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filters, setFilters] = useState({ type: "all", tag: "all" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedPosts, user] = await Promise.all([
        Post.list("-created_date"),
        User.me().catch(() => null)
      ]);
      setPosts(fetchedPosts);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmitPost = async (postData) => {
    try {
      await Post.create({
        ...postData,
        author_name: postData.is_anonymous ? "Anonymous" : (currentUser?.display_name || currentUser?.full_name || "Community Member")
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const typeMatch = filters.type === "all" || post.post_type === filters.type;
    const tagMatch = filters.tag === "all" || (post.tags && post.tags.includes(filters.tag));
    return typeMatch && tagMatch;
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <WelcomeHero />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">Community Feed</h1>
            <p className="text-emerald-600 mt-1">Share your journey, ask questions, and connect with fellow reverts</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Share Your Story
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <PostForm
              onSubmit={handleSubmitPost}
              onCancel={() => setShowForm(false)}
            />
          )}
        </AnimatePresence>

        <PostFilters 
          filters={filters} 
          onFilterChange={setFilters}
          className="mb-8"
        />

        <div className="space-y-6">
          <AnimatePresence>
            {isLoading ? (
              <div className="space-y-6">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-emerald-100 rounded w-32"></div>
                        <div className="h-3 bg-emerald-50 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-6 bg-emerald-100 rounded w-3/4"></div>
                      <div className="h-4 bg-emerald-50 rounded w-full"></div>
                      <div className="h-4 bg-emerald-50 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))
            )}
          </AnimatePresence>

          {!isLoading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">No posts yet</h3>
              <p className="text-emerald-600">Be the first to share your story with the community!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
