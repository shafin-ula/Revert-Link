import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from 'lucide-react';

const EVENT_TYPES = [
  { value: "all", label: "All Events" },
  { value: "study_circle", label: "Study Circles" },
  { value: "iftar", label: "Iftars" },
  { value: "social_gathering", label: "Social Gatherings" },
  { value: "workshop", label: "Workshops" },
  { value: "charity", label: "Charity" },
];

const TIME_PERIODS = [
  { value: "upcoming", label: "Upcoming Events" },
  { value: "past", label: "Past Events" },
  { value: "all", label: "All Time" },
];

export default function EventFilters({ filters, onFilterChange, className }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-800">Filter:</span>
      </div>
      
      <Select
        value={filters.type}
        onValueChange={(value) => onFilterChange({ ...filters, type: value })}
      >
        <SelectTrigger className="w-48 border-emerald-200 focus:border-emerald-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {EVENT_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={filters.period}
        onValueChange={(value) => onFilterChange({ ...filters, period: value })}
      >
        <SelectTrigger className="w-48 border-emerald-200 focus:border-emerald-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_PERIODS.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
