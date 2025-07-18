import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onTaskUpdate, 
  onTaskDelete,
  onRetry,
  categories = [],
  className 
}) => {
  const [completingTasks, setCompletingTasks] = useState(new Set());

  const handleTaskComplete = async (taskId, completed) => {
    setCompletingTasks(prev => new Set(prev).add(taskId));
    
    try {
      await onTaskUpdate(taskId, { completed });
    } finally {
      setCompletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return <Empty />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => {
          const category = categories.find(c => c.Id === task.categoryId);
          
          return (
            <motion.div
              key={task.Id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TaskItem
                task={task}
                category={category}
                onComplete={(completed) => handleTaskComplete(task.Id, completed)}
                onUpdate={(updates) => onTaskUpdate(task.Id, updates)}
                onDelete={() => onTaskDelete(task.Id)}
                isCompleting={completingTasks.has(task.Id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;