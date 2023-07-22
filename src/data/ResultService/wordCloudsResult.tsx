import { ApiURL } from "../../else/BackendURL";
import axios from "axios";

const resultURL = ApiURL + "/wordCloudsResults";

export class WordCloudsResultData {
  async getAllResults(): Promise<any> {
    const response = await axios.get(`${resultURL}/All`);
    return response.data;
  }

  async addResult(entryId: number, frequencyMap: object): Promise<void> {
    await axios.post(resultURL, {
      data: { entryId: entryId, frequencyMap: frequencyMap },
    });
  }

  async editResult(
    entryId: number | undefined,
    frequencyMap: object
  ): Promise<void> {
    await axios.put(`${resultURL}/modify/${entryId}`, {
      data: { entryId: entryId, frequencyMap: frequencyMap },
    });
  }

  async deleteResult(entryId: number | undefined): Promise<void> {
    console.log("entryId: " + entryId);
    await axios.delete(`${resultURL}/${entryId}`, {
      data: { entryId: entryId },
    });
  }
}
