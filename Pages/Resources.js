import React, { useState, useEffect } from "react";
import { Resource } from "@/entities/Resource";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

import ResourceCard from "../components/resources/ResourceCard";
import ResourceFilters from "../components/resources/ResourceFilters";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({ category: "all", type: "all", search: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await Resource.list("-created_date");
      setResources(data);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
    setIsLoading(false);
  };

  const filteredResources = resources.filter(resource => {
    const categoryMatch = filters.category === "all" || resource.category === filters.category;
    const typeMatch = filters.type === "all" || resource.resource_type === filters.type;
    const searchMatch = !filters.search || 
      resource.title.toLowerCase().includes(filters.search.toLowerCase()) || 
      resource.description.toLowerCase().includes(filters.search.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">Learning Resources</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            Grow Your Knowledge of Islam
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Explore a curated collection of articles, videos, books, and courses 
            to support your learning journey as a new Muslim.
          </p>
        </motion.div>

        <ResourceFilters 
          filters={filters}
          onFilterChange={setFilters}
          className="mb-8"
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/80 rounded-3xl p-6 shadow-sm animate-pulse">
                <div className="space-y-4">
                  <div className="h-6 bg-emerald-100 rounded w-3/4"></div>
                  <div className="h-4 bg-emerald-50 rounded w-full"></div>
                  <div className="h-4 bg-emerald-50 rounded w-2/3"></div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-6 w-24 bg-emerald-100 rounded-full"></div>
                    <div className="h-10 w-24 bg-emerald-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">No resources found</h3>
                <p className="text-emerald-600">Try adjusting your filters or check back later for new content.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
