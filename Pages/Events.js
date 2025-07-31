import React, { useState, useEffect } from "react";
import { Event } from "@/entities/Event";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { motion } from "framer-motion";

import EventCard from "../components/events/EventCard";
import EventFilters from "../components/events/EventFilters";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ type: "all", period: "upcoming" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await Event.list("-date"); // Sort by newest date first
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
    setIsLoading(false);
  };

  const filteredEvents = events.filter(event => {
    const typeMatch = filters.type === "all" || event.event_type === filters.type;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    
    let periodMatch = true;
    if (filters.period === 'upcoming') {
      periodMatch = eventDate >= today;
    } else if (filters.period === 'past') {
      periodMatch = eventDate < today;
    }
    
    return typeMatch && periodMatch;
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
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">Community Events</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            Connect in Person and Online
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Find local gatherings, online workshops, and community events. 
            Strengthen your bonds and grow with your Muslim brothers and sisters.
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <EventFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
          <Button
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white/80 rounded-3xl p-6 shadow-sm animate-pulse">
                <div className="h-40 bg-emerald-100 rounded-2xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-emerald-100 rounded w-3/4"></div>
                  <div className="h-4 bg-emerald-50 rounded w-1/2"></div>
                  <div className="h-4 bg-emerald-50 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Calendar className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">No events found</h3>
                <p className="text-emerald-600">Try adjusting your filters or be the first to create a new event!</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
