import { ApiURL } from "../else/BackendURL";
import axios from "axios";

export interface ResultDataProps {
  url: string;
}

export class ResultData {
  private resultURL: string;

  constructor(props: ResultDataProps) {
    this.resultURL = ApiURL + props.url;
  }

  async getAllResults(): Promise<any> {
    const response = await axios.get(`${this.resultURL}/All`);
    return response.data;
  }

  async addResult(entryId: number, data: any): Promise<void> {
    await axios.post(this.resultURL, { data });
  }

  async editResult(entryId: number | undefined, data: any): Promise<void> {
    await axios.put(`${this.resultURL}/modify/${entryId}`, { data });
  }

  async deleteResult(entryId: number | undefined): Promise<void> {
    await axios.delete(`${this.resultURL}/${entryId}`, {
      data: { entryId: entryId },
    });
  }
}
