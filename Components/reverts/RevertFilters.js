import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Heart } from 'lucide-react';

const CONVERSION_YEARS = [
  { value: "all", label: "Any Year" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018 & Earlier" }
];

const COMMON_INTERESTS = [
  { value: "all", label: "All Interests" },
  { value: "prayer", label: "Prayer" },
  { value: "quran_study", label: "Quran Study" },
  { value: "arabic_language", label: "Arabic Language" },
  { value: "family_life", label: "Family Life" },
  { value: "community_service", label: "Community Service" },
  { value: "converts_support", label: "Convert Support" },
  { value: "islamic_history", label: "Islamic History" }
];

export default function RevertFilters({ filters, onFilterChange, className }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-emerald-900">Find Your Community</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by location..."
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="pl-10 border-emerald-200 focus:border-emerald-500"
          />
        </div>
        
        <div className="relative">
          <Select
            value={filters.conversionYear}
            onValueChange={(value) => onFilterChange({ ...filters, conversionYear: value })}
          >
            <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {CONVERSION_YEARS.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <Select
            value={filters.interests}
            onValueChange={(value) => onFilterChange({ ...filters, interests: value })}
          >
            <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-400" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {COMMON_INTERESTS.map((interest) => (
                <SelectItem key={interest.value} value={interest.value}>
                  {interest.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
