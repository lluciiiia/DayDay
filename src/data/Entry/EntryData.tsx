import axios from "axios";

export const putData = async (data: Entry) => {
  try {
    await axios.put("http://localhost:3003/api/entries", data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update entries data.");
  }
};
