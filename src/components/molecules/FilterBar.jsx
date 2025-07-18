import React from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  categories = [],
  className 
}) => {
  const { status, category, priority } = filters;

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = status || category || priority;

  return (
    <div className={cn("flex flex-wrap gap-4 items-center", className)}>
      <div className="flex flex-wrap gap-3">
        <Select
          value={status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-auto min-w-[120px]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>

        <Select
          value={category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-auto min-w-[140px]"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.Id} value={cat.Id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Select
          value={priority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          className="w-auto min-w-[120px]"
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <ApperIcon name="X" size={16} className="mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;