import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import CategoryPill from "@/components/molecules/CategoryPill";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import DueDateBadge from "@/components/molecules/DueDateBadge";
import TaskForm from "@/components/organisms/TaskForm";
import ApperIcon from "@/components/ApperIcon";
import { createConfetti } from "@/utils/confetti";
import { cn } from "@/utils/cn";

const TaskItem = ({ 
  task, 
  category, 
  onComplete, 
  onUpdate, 
  onDelete,
  isCompleting = false,
  categories = []
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = async (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (!task.completed) {
      createConfetti(x, y);
    }

    await onComplete(!task.completed);
  };

  const handleUpdate = async (updates) => {
    try {
      await onUpdate(updates);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete();
        toast.success("Task deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete task");
        setIsDeleting(false);
      }
    }
  };

  const getPriorityBorderClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  if (isEditing) {
    return (
      <Card className="p-6">
        <TaskForm
          initialData={task}
          categories={categories}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="hover-lift"
    >
      <Card 
        className={cn(
          "p-6 cursor-pointer transition-all duration-200",
          getPriorityBorderClass(task.priority),
          task.completed && "opacity-60 bg-gray-50",
          isDeleting && "opacity-50 pointer-events-none"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComplete}
              disabled={isCompleting}
              className={cn(
                "mt-1 h-8 w-8 p-0 rounded-full border-2 flex-shrink-0",
                task.completed
                  ? "bg-success border-success text-white"
                  : "border-gray-300 hover:border-primary"
              )}
            >
              {isCompleting ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : task.completed ? (
                <ApperIcon name="Check" size={16} />
              ) : null}
            </Button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 
                  className={cn(
                    "text-lg font-semibold text-gray-900",
                    task.completed && "line-through text-gray-500"
                  )}
                >
                  {task.title}
                </h3>
                <PriorityBadge priority={task.priority} />
              </div>

{task.description && (
                <p 
                  className={cn(
                    "text-gray-600 mb-3",
                    task.completed && "line-through text-gray-400"
                  )}
                >
                  {task.description}
                </p>
              )}

              {task.address && (
                <p 
                  className={cn(
                    "text-gray-500 text-sm mb-3 flex items-center gap-2",
                    task.completed && "line-through text-gray-400"
                  )}
                >
                  <ApperIcon name="MapPin" size={14} />
                  {task.address}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <CategoryPill category={category} size="sm" />
                )}
                <DueDateBadge dueDate={task.dueDate} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-primary"
            >
              <ApperIcon name="Edit2" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-error"
            >
              {isDeleting ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <ApperIcon name="Trash2" size={16} />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskItem;