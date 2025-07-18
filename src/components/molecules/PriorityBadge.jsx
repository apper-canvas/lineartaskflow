import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ 
  priority, 
  showIcon = true, 
  className,
  ...props 
}) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return {
          variant: "error",
          icon: "AlertCircle",
          label: "High"
        };
      case "medium":
        return {
          variant: "warning",
          icon: "Clock",
          label: "Medium"
        };
      case "low":
        return {
          variant: "success",
          icon: "CheckCircle",
          label: "Low"
        };
      default:
        return {
          variant: "default",
          icon: "Minus",
          label: "None"
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge 
      variant={config.variant} 
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {showIcon && (
        <ApperIcon name={config.icon} size={14} />
      )}
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;