import axios from "axios";
import { ApiURL } from "../else/BackendURL";

const googlePlaceApi_URL = ApiURL + "/googleplaceapi";

export class getPlaceAPI {
  async getEntry(): Promise<string> {
    try {
      const response = await axios.get(`${googlePlaceApi_URL}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get the google place api.");
    }
  }
}
