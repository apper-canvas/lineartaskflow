import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import CategoryManager from "@/components/organisms/CategoryManager";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/molecules/FilterBar";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { cn } from "@/utils/cn";

const TaskManager = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: ""
  });

  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    createTask, 
    updateTask, 
    deleteTask, 
    searchTasks, 
    refreshTasks 
  } = useTasks();

  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    refreshCategories
  } = useCategories();

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status) {
      const isCompleted = task.completed;
      if (filters.status === "completed" && !isCompleted) return false;
      if (filters.status === "pending" && isCompleted) return false;
    }

    // Category filter
    if (filters.category) {
      if (task.categoryId !== parseInt(filters.category)) return false;
    }

    // Priority filter
    if (filters.priority) {
      if (task.priority !== filters.priority) return false;
    }

    return true;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      category: "",
      priority: ""
    });
    setSearchQuery("");
  };

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  const completedTasks = filteredTasks.filter(task => task.completed);
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center gap-3">
            <ApperIcon name="CheckSquare" size={24} />
            <div>
              <p className="text-sm opacity-90">Total Tasks</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-success to-emerald-600 text-white">
          <div className="flex items-center gap-3">
            <ApperIcon name="CheckCircle" size={24} />
            <div>
              <p className="text-sm opacity-90">Completed</p>
              <p className="text-2xl font-bold">{completedTasks.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-warning to-orange-600 text-white">
          <div className="flex items-center gap-3">
            <ApperIcon name="Clock" size={24} />
            <div>
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-2xl font-bold">{pendingTasks.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-info to-cyan-600 text-white">
          <div className="flex items-center gap-3">
            <ApperIcon name="TrendingUp" size={24} />
            <div>
              <p className="text-sm opacity-90">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Task Form and Categories */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                onClick={() => setShowTaskForm(!showTaskForm)}
                className="flex-1"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add Task
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCategoryManager(!showCategoryManager)}
                className="flex-1"
              >
                <ApperIcon name="Tag" size={16} className="mr-2" />
                Categories
              </Button>
            </div>

            {showTaskForm && (
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowTaskForm(false)}
                categories={categories}
              />
            )}
          </Card>

          {/* Category Manager */}
          {showCategoryManager && (
            <Card className="p-6">
              <CategoryManager
                categories={categories}
                onCreateCategory={createCategory}
                onUpdateCategory={updateCategory}
                onDeleteCategory={deleteCategory}
              />
            </Card>
          )}
        </div>

        {/* Right Column - Task List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                categories={categories}
              />
            </div>
          </Card>

          {/* Task List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Tasks
                {filteredTasks.length !== totalTasks && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({filteredTasks.length} of {totalTasks})
                  </span>
                )}
              </h2>
              
              {filteredTasks.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshTasks}
                  className="text-gray-500 hover:text-primary"
                >
                  <ApperIcon name="RefreshCw" size={16} />
                </Button>
              )}
            </div>

            <TaskList
              tasks={filteredTasks}
              loading={tasksLoading}
              error={tasksError}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
              onRetry={refreshTasks}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;