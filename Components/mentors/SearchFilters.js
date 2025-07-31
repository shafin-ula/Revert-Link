import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

const SPECIALTIES = [
  { value: "all", label: "All Specialties" },
  { value: "prayer", label: "Prayer & Worship" },
  { value: "quran", label: "Quran Study" },
  { value: "daily_life", label: "Daily Islamic Life" },
  { value: "family", label: "Family Matters" },
  { value: "community", label: "Community Integration" },
  { value: "workplace", label: "Workplace Challenges" },
  { value: "arabic", label: "Arabic Language" }
];

export default function SearchFilters({ filters, onFilterChange, className }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-emerald-900">Find the Right Mentor</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by location..."
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="pl-10 border-emerald-200 focus:border-emerald-500"
          />
        </div>
        
        <Select
          value={filters.specialty}
          onValueChange={(value) => onFilterChange({ ...filters, specialty: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SPECIALTIES.map((specialty) => (
              <SelectItem key={specialty.value} value={specialty.value}>
                {specialty.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
