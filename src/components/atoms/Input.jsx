import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm",
        "transition-all duration-200",
        "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
        "placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;