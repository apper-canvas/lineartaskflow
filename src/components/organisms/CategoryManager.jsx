import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryManager = ({ 
  categories, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory,
  className 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "#5B47E0"
  });

  const colorOptions = [
    "#5B47E0", "#3B82F6", "#22C55E", "#FFB347", 
    "#EF4444", "#8B5CF6", "#F59E0B", "#06B6D4"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (editingCategory) {
        await onUpdateCategory(editingCategory.Id, formData);
        toast.success("Category updated successfully!");
      } else {
        await onCreateCategory(formData);
        toast.success("Category created successfully!");
      }
      
      resetForm();
    } catch (error) {
      toast.error("Failed to save category");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", color: "#5B47E0" });
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      color: category.color
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await onDeleteCategory(categoryId);
        toast.success("Category deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          Add Category
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Category Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name..."
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all duration-200",
                        formData.color === color 
                          ? "border-gray-900 scale-110" 
                          : "border-gray-300 hover:scale-105"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="primary" size="sm">
                  {editingCategory ? "Update" : "Create"} Category
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <motion.div
            key={category.Id}
            whileHover={{ scale: 1.02 }}
            className="hover-lift"
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.taskCount} tasks</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="text-gray-500 hover:text-primary h-8 w-8 p-0"
                  >
                    <ApperIcon name="Edit2" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category.Id)}
                    className="text-gray-500 hover:text-error h-8 w-8 p-0"
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;