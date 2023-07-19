import { ApiURL } from "./BackendURL";
import axios from "axios";

const categoriesURL = ApiURL + "/categories";
const entriesURL = ApiURL + "/entries";

export class EntriesData {
  getEntries = async () => {
    try {
      const response = await axios.get(entriesURL);
      const entries = response.data;
      return entries;
    } catch (error) {
      throw new Error("Failed to update entries data.");
    }
  };

  putEntry = async (newEntry: Omit<Entry, "id">) => {
    try {
      // Omit the 'id' field before sending the request
      const response = await axios.post(entriesURL, newEntry);

      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  deleteEntry = async (id: number) => {
    try {
      await axios.delete(entriesURL, { data: { id } });
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  modifyEntry = async (id: number) => {
    try {
      await axios.put(entriesURL + "/modify", { data: { id } });
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };
}



export class CategoriesData {
    getCategories = async () => {
        try {
          const response = await axios.get(categoriesURL);
          const categories = response.data;
          return categories;
        } catch (error) {
          throw new Error("Failed to update entries data.");
        }
      };

   putCategory = async (id: string) => {
    try {
      const response = await axios.post(categoriesURL, { id });
      console.log("Backend response:", response.data);
      return response.data;
      } catch (error) {
        console.error("Error creating entry:", error);
      
        }
    };

    deleteCategory = async (id: string) => {
        try {
          await axios.delete(categoriesURL, { data: { id } });
        } catch (error) {
          console.error("Error deleting Category:", error);
        }
      };
    
      modifyCategory = async (id: string) => {
        try {
          await axios.put(categoriesURL + "/modify", { data: { id } });
        } catch (error) {
          console.error("Error updating Category:", error);
        }
      };
}


