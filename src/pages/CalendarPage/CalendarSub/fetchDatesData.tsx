import { EntriesData } from "../../../GetPutData";
import { Entry } from "./IEntry";

export const fetchDatesData = async (): Promise<Entry[]> => {
    const entriesData = new EntriesData();
    try {
      const entriesResult = await entriesData.getEntriesData();
      if (Array.isArray(entriesResult)) {
        const entries = entriesResult as Entry[];
        return entries;
      } else {
        throw new Error("The returned value is not an array.");
      }
    } catch (error) {
      throw error;
    }
  };
  
  
  
  
  
  