import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { formatDateInput } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";

const TaskForm = ({ 
  onSubmit, 
  onCancel, 
  initialData = null, 
  categories = [],
  className 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || "",
    priority: initialData?.priority || "medium",
    dueDate: initialData?.dueDate ? formatDateInput(initialData.dueDate) : ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        dueDate: formData.dueDate || null
      };

      await onSubmit(submitData);
      toast.success(initialData ? "Task updated successfully!" : "Task created successfully!");
      
      if (!initialData) {
        // Reset form for new tasks
        setFormData({
          title: "",
          description: "",
          categoryId: "",
          priority: "medium",
          dueDate: ""
        });
      }
    } catch (error) {
      toast.error("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-6", className)}
    >
      <FormField
        label="Task Title"
        type="text"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter task title..."
        error={errors.title}
        required
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Add task description..."
        rows={4}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Category"
          error={errors.categoryId}
        >
          <Select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Priority"
        >
          <Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormField>
      </div>

      <FormField
        label="Due Date (Optional)"
        type="date"
        value={formData.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={initialData ? "Save" : "Plus"} size={16} className="mr-2" />
              {initialData ? "Update Task" : "Create Task"}
            </>
          )}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </motion.form>
  );
};

export default TaskForm;