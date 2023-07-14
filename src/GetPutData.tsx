import { ApiURL } from "./BackendURL";
import axios from "axios";

const categoriesURL = ApiURL + "/categories";
const entriesURL = ApiURL + "/entries";

export class CategoriesData {
  async getCategoriesData() {
    try {
      const response = await axios.get(categoriesURL);
      const categoriesData = response.data;

      return categoriesData;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async putCategoriesData(data: string[]) {
    try {
      await axios.put(categoriesURL, data);
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to update categories data.");
    }
  }
}

export class EntriesData {
  async deleteEntriesData(data: any) {
    console.log("data in deleteEntriesData", data);
    console.log("typeof data in deleteEntriesData", typeof data);
    console.log("entriesURL", entriesURL);
    try {
      await axios.delete(entriesURL, {
        data,
        headers: {
          "Authorization": "Bearer none"
        },
      });
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
