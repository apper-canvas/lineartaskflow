import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(250);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedTask = { ...tasks[index], ...updates };
    
    // Handle completion status
    if (updates.completed !== undefined) {
      updatedTask.completedAt = updates.completed ? new Date().toISOString() : null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return tasks.filter(t => t.categoryId === parseInt(categoryId)).map(t => ({ ...t }));
  },

  async getByPriority(priority) {
    await delay(300);
    return tasks.filter(t => t.priority === priority).map(t => ({ ...t }));
  },

  async getByStatus(completed) {
    await delay(300);
    return tasks.filter(t => t.completed === completed).map(t => ({ ...t }));
  },

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    ).map(t => ({ ...t }));
  }
};