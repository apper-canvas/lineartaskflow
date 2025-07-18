import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError("Failed to create task. Please try again.");
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === parseInt(id) ? updatedTask : task
        ));
        return updatedTask;
      }
    } catch (err) {
      setError("Failed to update task. Please try again.");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      const success = await taskService.delete(id);
      if (success) {
        setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      throw err;
    }
  };

  const searchTasks = async (query) => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.search(query);
      setTasks(data);
    } catch (err) {
      setError("Failed to search tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refreshTasks: loadTasks
  };
};