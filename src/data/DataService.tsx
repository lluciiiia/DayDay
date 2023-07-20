import { ApiURL } from "../else/BackendURL";
import axios from "axios";

const categoriesURL = ApiURL + "/categories";
const entriesURL = ApiURL + "/entries";

export class EntryServiceImpl implements EntryService {
  async addEntry(entry: Omit<Entry, "id">): Promise<void> {
    try {
      await axios.post(entriesURL, entry);
    } catch (error) {
      throw new Error("Failed to add the entry.");
    }
  }

  async deleteEntry(entryId: number): Promise<void> {
    try {
      await axios.delete(`${entriesURL}/${entryId}`);
    } catch (error) {
      throw new Error("Failed to delete the entry.");
    }
  }

  async editEntry(entryId: number, updatedEntry: Entry): Promise<void> {
    try {
      await axios.put(`${entriesURL}/modify/${entryId}`, updatedEntry);
    } catch (error) {
      throw new Error("Failed to edit the entry.");
    }
  }

  async getEntry(entryId: number): Promise<Entry> {
    try {
      const response = await axios.get(`${entriesURL}/${entryId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get the entry.");
    }
  }

  async getAllEntries(): Promise<Entry[]> {
    try {
      const response = await axios.get(entriesURL);
      const entries = response.data;
      return entries;
    } catch (error) {
      throw new Error("Failed to get all entries.");
    }
  }
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
