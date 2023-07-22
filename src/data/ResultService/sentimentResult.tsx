import { ApiURL } from "../../else/BackendURL";
import axios from "axios";

const sentimentURL = ApiURL + "/sentiment";

export class SentimentResultData {
  async getAllResults(): Promise<any> {
    const response = await axios.get(`${sentimentURL}/All`);
    return response.data;
  }

  async addResult(
    entryId: number,
    totalScore: number,
    entryDate: string | undefined
  ): Promise<void> {
    await axios.post(sentimentURL, {
      data: { entryId: entryId, totalScore: totalScore, entryDate: entryDate },
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
