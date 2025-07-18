import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-16"
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckSquare" size={40} className="text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No tasks yet!
        </h3>
        
        <p className="text-gray-600 mb-8">
          Create your first task and start organizing your day with TaskFlow. 
          Stay productive and never miss a deadline again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={onAddTask}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            Create Your First Task
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="ArrowUp" size={16} />
            Go to Top
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;