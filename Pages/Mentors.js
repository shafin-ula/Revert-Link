import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { MentorRequest } from "@/entities/MentorRequest";
import { Button } from "@/components/ui/button";
import { Users, Search, Heart } from "lucide-react";
import { motion } from "framer-motion";

import MentorCard from "../components/mentors/MentorCard";
import MentorRequestForm from "../components/mentors/MentorRequestForm";
import SearchFilters from "../components/mentors/SearchFilters";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [filters, setFilters] = useState({ specialty: "all", location: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allUsers, user] = await Promise.all([
        User.filter({ is_mentor: true }),
        User.me().catch(() => null)
      ]);
      setMentors(allUsers);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading mentors:", error);
    }
    setIsLoading(false);
  };

  const handleMentorRequest = async (requestData) => {
    try {
      await MentorRequest.create({
        ...requestData,
        mentee_name: currentUser?.display_name || currentUser?.full_name || "Community Member",
        mentee_email: currentUser?.email || "",
        mentor_email: selectedMentor?.email || "",
        mentor_name: selectedMentor?.display_name || selectedMentor?.full_name || "Mentor"
      });
      setShowRequestForm(false);
      setSelectedMentor(null);
      // You could show a success message here
    } catch (error) {
      console.error("Error sending mentor request:", error);
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    const specialtyMatch = filters.specialty === "all" || 
      (mentor.mentor_specialties && mentor.mentor_specialties.includes(filters.specialty));
    const locationMatch = !filters.location || 
      (mentor.location && mentor.location.toLowerCase().includes(filters.location.toLowerCase()));
    return specialtyMatch && locationMatch;
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
            <Users className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">Find Your Mentor</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            Connect with Experienced Muslims
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Our mentors are here to guide you through your Islamic journey. 
            Get personalized support, answers to your questions, and friendship along the way.
          </p>
        </motion.div>

        <SearchFilters 
          filters={filters}
          onFilterChange={setFilters}
          className="mb-8"
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/80 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-emerald-100 rounded w-32"></div>
                    <div className="h-4 bg-emerald-50 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-emerald-50 rounded w-full"></div>
                  <div className="h-4 bg-emerald-50 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onConnect={() => {
                    setSelectedMentor(mentor);
                    setShowRequestForm(true);
                  }}
                />
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">No mentors found</h3>
                <p className="text-emerald-600">Try adjusting your search filters</p>
              </motion.div>
            )}
          </>
        )}

        {showRequestForm && selectedMentor && (
          <MentorRequestForm
            mentor={selectedMentor}
            onSubmit={handleMentorRequest}
            onCancel={() => {
              setShowRequestForm(false);
              setSelectedMentor(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
