import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { formatDate, getDueDateStatus } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";

const DueDateBadge = ({ 
  dueDate, 
  showIcon = true, 
  className,
  ...props 
}) => {
  if (!dueDate) return null;

  const status = getDueDateStatus(dueDate);
  const formattedDate = formatDate(dueDate);

  const getStatusConfig = (status) => {
    switch (status) {
      case "overdue":
        return {
          variant: "error",
          icon: "AlertTriangle",
          className: "animate-pulse"
        };
      case "today":
        return {
          variant: "warning",
          icon: "Calendar",
          className: ""
        };
      case "tomorrow":
        return {
          variant: "info",
          icon: "Clock",
          className: ""
        };
      default:
        return {
          variant: "default",
          icon: "Calendar",
          className: ""
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant} 
      className={cn(
        "inline-flex items-center gap-1", 
        config.className,
        className
      )}
      {...props}
    >
      {showIcon && (
        <ApperIcon name={config.icon} size={14} />
      )}
      {formattedDate}
    </Badge>
  );
};

export default DueDateBadge;