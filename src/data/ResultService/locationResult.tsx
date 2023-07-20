import { ApiURL } from "../../else/BackendURL";
import axios from "axios";

const resultURL = ApiURL + "/locationResults";

export class LocationResultData {

  async getResult(entryId: number): Promise<any> {
    // Get the analysis result data for the given entryId from the backend
    const response = await axios.get(`${resultURL}/${entryId}`);
    return response.data;
  }

  async addResult(entryId: number, analysisResult: any): Promise<void> {
    // Add the analysis result data for the given entryId to the backend
    await axios.post(resultURL, { entryId, result: analysisResult });
  }

  async editResult(entryId: number, updatedResult: any): Promise<void> {
    // Update the analysis result data for the given entryId in the backend
    await axios.put(`${resultURL}/${entryId}`, { result: updatedResult });
  }

  async deleteResult(entryId: number): Promise<void> {
    // Delete the analysis result data for the given entryId from the backend
    await axios.delete(`${resultURL}/${entryId}`);
  }
}
