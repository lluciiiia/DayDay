import { SentimentResultData } from "./ResultService/sentimentResult";
import { WordCloudsResultData } from "./ResultService/wordCloudsResult";

export abstract class UpdateResults {
  abstract addResult(
    entryId: number,
    analysisResult: any,
    entryDate?: any
  ): Promise<void>;
  abstract editResult(
    entryId: number,
    updatedResult: any,
    entryDate?: string | undefined
  ): Promise<void>;
  abstract deleteResult(entryId: number): Promise<void>;
}

export class UpdateManager {
  private sentimentResult = new SentimentResultData();
  private wordCloudsResult = new WordCloudsResultData();

  async addResultData(entryId: number, analysisResult: any, entryDate?: any) {
    if (analysisResult.sentiment) {
      await this.sentimentResult.addResult(
        entryId,
        analysisResult.sentiment,
        entryDate
      );
    } else if (analysisResult.wordClouds) {
      await this.wordCloudsResult.addResult(entryId, analysisResult.wordClouds);
    }
  }

  async editResultData(
    entryId: number | undefined,
    updatedResult: any,
    entryDate?: string | undefined
  ) {
    if (updatedResult.sentiment) {
      await this.sentimentResult.editResult(
        entryId,
        updatedResult.sentiment,
        entryDate
      );
    } else if (updatedResult.wordClouds) {
      await this.wordCloudsResult.editResult(entryId, updatedResult.wordClouds);
    }
  }

  async deleteResultData(entryId: number | undefined) {
    await this.sentimentResult.deleteResult(entryId);
    await this.wordCloudsResult.deleteResult(entryId);
  }
}
