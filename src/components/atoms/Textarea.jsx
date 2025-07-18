import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm",
        "transition-all duration-200",
        "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
        "placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;