import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Heart, Filter, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import RevertCard from "../components/reverts/RevertCard";
import RevertFilters from "../components/reverts/RevertFilters";
import ConnectModal from "../components/reverts/ConnectModal";

export default function MeetRevertsPage() {
  const [reverts, setReverts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRevert, setSelectedRevert] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [filters, setFilters] = useState({ 
    location: "", 
    conversionYear: "all", 
    interests: "all" 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me().catch(() => null);
      setCurrentUser(user);

      if (user && user.gender) {
        const allUsers = await User.filter({
          is_mentor: false,
          gender: user.gender
        });
        const otherReverts = allUsers.filter(u => u.email !== user.email);
        setReverts(otherReverts);
      } else {
        setReverts([]); // Don't show anyone if profile is incomplete
      }
    } catch (error) {
      console.error("Error loading reverts:", error);
    }
    setIsLoading(false);
  };

  const handleConnect = (revert) => {
    setSelectedRevert(revert);
    setShowConnectModal(true);
  };

  const handleSendConnection = async (message) => {
    console.log("Sending connection request:", { to: selectedRevert, message });
    setShowConnectModal(false);
    setSelectedRevert(null);
  };

  const filteredReverts = reverts.filter(revert => {
    const locationMatch = !filters.location || 
      (revert.location && revert.location.toLowerCase().includes(filters.location.toLowerCase()));
    
    const yearMatch = filters.conversionYear === "all" || 
      (revert.conversion_date && 
       new Date(revert.conversion_date).getFullYear().toString() === filters.conversionYear);
    
    const interestMatch = filters.interests === "all" || 
      (revert.interests && revert.interests.includes(filters.interests));
    
    return locationMatch && yearMatch && interestMatch;
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
            <UserPlus className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">Meet Fellow Reverts</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            Connect with Your Muslim Family
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Meet other Muslim reverts who understand your journey. Build friendships, 
            share experiences, and grow together in this beautiful community.
          </p>
        </motion.div>

        <RevertFilters 
          filters={filters}
          onFilterChange={setFilters}
          className="mb-8"
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/80 rounded-3xl p-6 shadow-sm animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full mb-4"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-6 bg-emerald-100 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-emerald-50 rounded w-1/2 mx-auto"></div>
                  </div>
                  <div className="mt-4 space-y-2 w-full">
                    <div className="h-4 bg-emerald-50 rounded w-full"></div>
                    <div className="h-4 bg-emerald-50 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredReverts.map((revert) => (
                <RevertCard
                  key={revert.id}
                  revert={revert}
                  onConnect={() => handleConnect(revert)}
                />
              ))}
            </div>

            {(!currentUser || !currentUser.gender) && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">Complete Your Profile to Connect</h3>
                <p className="text-emerald-600 mb-4">
                  Please complete your profile with your gender to meet other reverts.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link to={createPageUrl("Profile")}>
                    <Edit className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Link>
                </Button>
              </motion.div>
            )}

            {currentUser && currentUser.gender && filteredReverts.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">No Reverts Found</h3>
                <p className="text-emerald-600">Try adjusting your filters. As the community grows, you'll find more connections here!</p>
              </motion.div>
            )}
          </>
        )}

        {showConnectModal && selectedRevert && (
          <ConnectModal
            revert={selectedRevert}
            onSend={handleSendConnection}
            onClose={() => {
              setShowConnectModal(false);
              setSelectedRevert(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
