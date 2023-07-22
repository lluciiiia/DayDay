import { ApiURL } from "../../else/BackendURL";
import axios from "axios";

const sentimentURL = ApiURL + "/sentiment";

export class SentimentResultData {
  async getAllResults(): Promise<any> {
    // Get the analysis result data for the given entryId from the backend
    const response = await axios.get(sentimentURL);
    return response.data;
  }

  async getResult(entryId: number): Promise<any> {
    // Get the analysis result data for the given entryId from the backend
    const response = await axios.get(`${sentimentURL}/${entryId}`, {
      data: { entryId: entryId },
    });
    return response.data;
  }

  async addResult(entryId: number, totalScore: number): Promise<void> {
    await axios.post(sentimentURL, {
      data: { entryId: entryId, totalScore: totalScore },
    });
  }

  async editResult(
    entryId: number | undefined,
    newScore: number
  ): Promise<void> {
    await axios.put(`${sentimentURL}/modify/${entryId}`, {
      data: { entryId: entryId, newScore: newScore },
    });
  }

  async deleteResult(entryId: number | undefined): Promise<void> {
    console.log("entryId: " + entryId);
    await axios.delete(`${sentimentURL}/${entryId}`, {
      data: { entryId: entryId },
    });
  }
}
