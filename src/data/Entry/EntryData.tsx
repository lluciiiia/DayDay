import axios from "axios";
import { ApiURL } from "../../BackendURL";

const apiURL = ApiURL + "/entries";

export const putData = async (data: Entry[]) => {
  try {
    await axios.put(apiURL, data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update entries data.");
  }
};
