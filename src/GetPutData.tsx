import { ApiURL } from "./BackendURL";
import axios from "axios";

const categoriesURL = ApiURL + "/categories";
const entriesURL = ApiURL + "/entries";

export class CategoriesData {
  async deleteCategoriesData(id: string) {
    console.log("data in deleteCategoriesData", id);
    console.log("typeof data in deleteCategoriesData", typeof id);
    console.log("categoriesURL", categoriesURL);
    try {
      await axios.delete(categoriesURL, { data: {id} });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete category.");
    }
  }

  async getCategoriesData() {
    try {
      const response = await axios.get(categoriesURL);
      const categoriesData = response.data;

      return categoriesData;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async putCategoriesData(id: string) {
    try {
      await axios.put(categoriesURL, { data: {id} });
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to update categories data.");
    }
  }
}

export class EntriesData {
  async deleteEntriesData(data: Entry) {
    console.log("data in deleteEntriesData", data);
    console.log("typeof data in deleteEntriesData", typeof data);
    try {
      await axios.delete(entriesURL, { data });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete entry.");
    }
  }

  async getEntriesData() {
    try {
      const response = await axios.get(entriesURL);
      const entries = response.data;
      return entries;
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to update entries data.");
    }
  }

  async putEntriesData(data: Entry) {
    try {
      await axios.put(entriesURL, data);
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to update entries data.");
    }
  }
}
