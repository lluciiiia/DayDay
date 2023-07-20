import { ApiURL } from "../else/BackendURL";
import axios from "axios";
import { Entry, EntryService, Category, CategoryService } from "./interfaces";

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

export class CategoryServiceImpl implements CategoryService {
  async addCategory(category: Omit<Category, "id">): Promise<void> {
    try {
      await axios.post(categoriesURL, category);
    } catch (error) {
      throw new Error("Failed to add the category.");
    }
  }

  async deleteCategory(categoryId: number): Promise<void> {
    try {
      await axios.delete(`${categoriesURL}/${categoryId}`);
    } catch (error) {
      throw new Error("Failed to delete the category.");
    }
  }

  async editCategory(categoryId: number, updatedCategory: Category): Promise<void> {
    try {
      await axios.put(`${categoriesURL}/modify/${categoryId}`, updatedCategory);
    } catch (error) {
      throw new Error("Failed to edit the category.");
    }
  }

  async getCategory(categoryId: number): Promise<Category> {
    try {
      const response = await axios.get(`${categoriesURL}/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get the category.");
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(categoriesURL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch categories.");
    }
  }
}