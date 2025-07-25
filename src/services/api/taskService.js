import { toast } from "react-toastify";

export const taskService = {
  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
{ field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "address_c" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Transform database fields to UI field names for compatibility
return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c || 'medium',
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c || task.CreatedOn,
        completedAt: task.completedAt_c,
        address: task.address_c || ''
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "address_c" } }
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      const task = response.data;
return {
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c || 'medium',
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c || task.CreatedOn,
        completedAt: task.completedAt_c,
        address: task.address_c || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const apperClient = this.getApperClient();
      
      // Only include Updateable fields in create operation
      const params = {
records: [
          {
            Name: taskData.title || '',
            Tags: taskData.tags || '',
            title_c: taskData.title || '',
            description_c: taskData.description || '',
            priority_c: taskData.priority || 'medium',
            dueDate_c: taskData.dueDate || null,
            completed_c: false,
            createdAt_c: new Date().toISOString(),
            completedAt_c: null,
            categoryId_c: parseInt(taskData.categoryId),
            address_c: taskData.address || ''
          }
        ]
      };

      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
const createdTask = successfulRecords[0].data;
          return {
            Id: createdTask.Id,
            title: createdTask.title_c || '',
            description: createdTask.description_c || '',
            categoryId: createdTask.categoryId_c?.Id || createdTask.categoryId_c,
            priority: createdTask.priority_c || 'medium',
            dueDate: createdTask.dueDate_c,
            completed: createdTask.completed_c || false,
            createdAt: createdTask.createdAt_c || createdTask.CreatedOn,
            completedAt: createdTask.completedAt_c,
            address: createdTask.address_c || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = this.getApperClient();
// Only include Updateable fields in update operation
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.description !== undefined) {
        updateData.description_c = updates.description;
      }
      if (updates.priority !== undefined) {
        updateData.priority_c = updates.priority;
      }
      if (updates.dueDate !== undefined) {
        updateData.dueDate_c = updates.dueDate;
      }
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed;
        updateData.completedAt_c = updates.completed ? new Date().toISOString() : null;
      }
      if (updates.categoryId !== undefined) {
        updateData.categoryId_c = parseInt(updates.categoryId);
      }
      if (updates.address !== undefined) {
        updateData.address_c = updates.address;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
return {
            Id: updatedTask.Id,
            title: updatedTask.title_c || '',
            description: updatedTask.description_c || '',
            categoryId: updatedTask.categoryId_c?.Id || updatedTask.categoryId_c,
            priority: updatedTask.priority_c || 'medium',
            dueDate: updatedTask.dueDate_c,
            completed: updatedTask.completed_c || false,
            createdAt: updatedTask.createdAt_c || updatedTask.CreatedOn,
            completedAt: updatedTask.completedAt_c,
            address: updatedTask.address_c || ''
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async search(query) {
    try {
      const apperClient = this.getApperClient();
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } },
          { field: { Name: "categoryId_c" } },
          { field: { Name: "address_c" } }
        ],
        whereGroups: [
{
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description_c",
                    operator: "Contains", 
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "address_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        categoryId: task.categoryId_c?.Id || task.categoryId_c,
        priority: task.priority_c || 'medium',
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c || task.CreatedOn,
        completedAt: task.completedAt_c,
        address: task.address_c || ''
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};