import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Hash } from 'lucide-react';

const POST_TYPES = [
  { value: "all", label: "All Posts" },
  { value: "story", label: "Stories" },
  { value: "question", label: "Questions" },
  { value: "advice", label: "Advice" },
  { value: "celebration", label: "Celebrations" },
  { value: "resource_share", label: "Resources" }
];

const COMMON_TAGS = [
  { value: "all", label: "All Tags" },
  { value: "conversion_story", label: "Conversion Stories" },
  { value: "prayer", label: "Prayer" },
  { value: "family", label: "Family" },
  { value: "community", label: "Community" },
  { value: "learning", label: "Learning" },
  { value: "support", label: "Support" }
];

export default function PostFilters({ filters, onFilterChange, className }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-800">Filter by:</span>
      </div>
      
      <Select
        value={filters.type}
        onValueChange={(value) => onFilterChange({ ...filters, type: value })}
      >
        <SelectTrigger className="w-40 border-emerald-200 focus:border-emerald-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {POST_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={filters.tag}
        onValueChange={(value) => onFilterChange({ ...filters, tag: value })}
      >
        <SelectTrigger className="w-48 border-emerald-200 focus:border-emerald-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COMMON_TAGS.map((tag) => (
            <SelectItem key={tag.value} value={tag.value}>
              <div className="flex items-center gap-2">
                <Hash className="w-3 h-3" />
                {tag.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {(filters.type !== "all" || filters.tag !== "all") && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange({ type: "all", tag: "all" })}
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
