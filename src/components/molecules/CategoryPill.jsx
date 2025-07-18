import React from "react";
import { cn } from "@/utils/cn";

const CategoryPill = ({ 
  category, 
  size = "default",
  className,
  ...props 
}) => {
  if (!category) return null;

  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        "text-white",
        sizes[size],
        className
      )}
      style={{ backgroundColor: category.color }}
      {...props}
    >
      {category.name}
    </span>
  );
};

export default CategoryPill;