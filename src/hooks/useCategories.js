import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError("Failed to create category. Please try again.");
      throw err;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const updatedCategory = await categoryService.update(id, updates);
      if (updatedCategory) {
        setCategories(prev => prev.map(category => 
          category.Id === parseInt(id) ? updatedCategory : category
        ));
        return updatedCategory;
      }
    } catch (err) {
      setError("Failed to update category. Please try again.");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const success = await categoryService.delete(id);
      if (success) {
        setCategories(prev => prev.filter(category => category.Id !== parseInt(id)));
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: loadCategories
  };
};