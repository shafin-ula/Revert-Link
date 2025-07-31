
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star } from 'lucide-react';

export default function WelcomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl p-8 mb-8 text-white shadow-2xl"
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3cpath d='M36 34.017L24 29.983V20.017L36 24.017v10zm0-12.017L48 18.017v-10L36 12.017v10zM24 29.983L12 34.017v10L24 48.017v-10z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")"
        }}
      ></div>
      
      <div className="relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Assalamu Alaikum & Welcome
          </h2>
          <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
            Join our supportive community of Muslim reverts. Share your journey, ask questions, 
            find mentors, and grow together in faith. You're not alone on this beautiful path.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Supportive</p>
                <p className="text-emerald-200 text-sm">Safe space to share</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Connected</p>
                <p className="text-emerald-200 text-sm">Find your tribe</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Growing</p>
                <p className="text-emerald-200 text-sm">Learn together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full"></div>
      <div className="absolute -right-10 -top-10 w-20 h-20 bg-amber-400/20 rounded-full"></div>
    </motion.div>
  );
}
