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
  async getEntriesData() {
    try {
      const response = await axios.get(entriesURL);
      const entries = response.data;
    return entries;
    //   const dates = entries.map((entry: Entry) => entry.date);
    //   setDiaryDates(dates);
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to update entries data.");
    }
  };
}
