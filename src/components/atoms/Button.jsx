import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 hover:brightness-105",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
    outline: "border-2 border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary",
    ghost: "text-gray-600 hover:text-primary hover:bg-gray-100",
    danger: "bg-error text-white hover:shadow-lg hover:shadow-error/30 hover:brightness-105",
    success: "bg-success text-white hover:shadow-lg hover:shadow-success/30 hover:brightness-105",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:transform hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;