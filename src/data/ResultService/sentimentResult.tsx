import { ApiURL } from "../../else/BackendURL";
import axios from "axios";

const resultURL = ApiURL + "/sentiment";

export class SentimentResultData {
  async getAllResults(): Promise<any> {
    const response = await axios.get(`${resultURL}/All`);
    return response.data;
  }

  async addResult(
    entryId: number,
    totalScore: number,
    entryDate: string | undefined
  ): Promise<void> {
    await axios.post(resultURL, {
      data: { entryId: entryId, totalScore: totalScore, entryDate: entryDate },
    });
  }

  async editResult(
    entryId: number | undefined,
    newScore: number,
    entryDate: string | undefined
  ): Promise<void> {
    await axios.put(`${resultURL}/modify/${entryId}`, {
      data: { entryId: entryId, newScore: newScore, entryDate: entryDate },
    });
  }

  async deleteResult(entryId: number | undefined): Promise<void> {
    console.log("entryId: " + entryId);
    await axios.delete(`${resultURL}/${entryId}`, {
      data: { entryId: entryId },
    });
  }
}
