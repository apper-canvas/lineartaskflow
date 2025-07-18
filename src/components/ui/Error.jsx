import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || "We encountered an error while loading your tasks. Please try again."}
        </p>
        
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;