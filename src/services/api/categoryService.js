import { toast } from "react-toastify";

export const categoryService = {
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
          { field: { Name: "color_c" } },
          { field: { Name: "taskCount_c" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Transform database fields to UI field names for compatibility
      return response.data.map(category => ({
        Id: category.Id,
        name: category.Name || '',
        color: category.color_c || '#5B47E0',
        taskCount: category.taskCount_c || 0
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
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
          { field: { Name: "color_c" } },
          { field: { Name: "taskCount_c" } }
        ]
      };

      const response = await apperClient.getRecordById('category_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      const category = response.data;
      return {
        Id: category.Id,
        name: category.Name || '',
        color: category.color_c || '#5B47E0',
        taskCount: category.taskCount_c || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(categoryData) {
    try {
      const apperClient = this.getApperClient();
      
      // Only include Updateable fields in create operation
      const params = {
        records: [
          {
            Name: categoryData.name || '',
            Tags: categoryData.tags || '',
            color_c: categoryData.color || '#5B47E0',
            taskCount_c: 0
          }
        ]
      };

      const response = await apperClient.createRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} category records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const createdCategory = successfulRecords[0].data;
          return {
            Id: createdCategory.Id,
            name: createdCategory.Name || '',
            color: createdCategory.color_c || '#5B47E0',
            taskCount: createdCategory.taskCount_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
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

      if (updates.name !== undefined) {
        updateData.Name = updates.name;
      }
      if (updates.color !== undefined) {
        updateData.color_c = updates.color;
      }
      if (updates.taskCount !== undefined) {
        updateData.taskCount_c = updates.taskCount;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} category records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedCategory = successfulUpdates[0].data;
          return {
            Id: updatedCategory.Id,
            name: updatedCategory.Name || '',
            color: updatedCategory.color_c || '#5B47E0',
            taskCount: updatedCategory.taskCount_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} category records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};