import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3" />
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-16" />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
              </div>
              
              <div className="flex gap-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse w-20" />
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse w-16" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;