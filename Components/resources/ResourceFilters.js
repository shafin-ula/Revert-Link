import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Book, Video } from 'lucide-react';

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "quran", label: "Quran" },
  { value: "hadith", label: "Hadith" },
  { value: "prayer", label: "Prayer" },
  { value: "fasting", label: "Fasting" },
  { value: "charity", label: "Charity" },
  { value: "pilgrimage", label: "Pilgrimage" },
  { value: "daily_life", label: "Daily Life" },
  { value: "converts_guide", label: "Convert Guides" },
];

const TYPES = [
  { value: "all", label: "All Types" },
  { value: "article", label: "Articles" },
  { value: "video", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "book", label: "Books" },
  { value: "course", label: "Courses" },
  { value: "app", label: "Apps" },
];

export default function ResourceFilters({ filters, onFilterChange, className }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-emerald-900">Filter Resources</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10 border-emerald-200 focus:border-emerald-500"
          />
        </div>
        
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange({ ...filters, category: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange({ ...filters, type: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
