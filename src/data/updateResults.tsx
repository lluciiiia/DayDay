import { SentimentResultData } from "./ResultService/sentimentResult";
import { WordCloudsResultData } from "./ResultService/wordCloudsResult";

// export class UpdateResults {
//   private sentimentResult = new SentimentResultData();
//   private wordCloudsResult = new WordCloudsResultData();

//   async addResultData(entryId: number, analysisResult: any, entryDate: any) {
//     this.sentimentResult.addResult(entryId, analysisResult, entryDate);
//     this.wordCloudsResult.addResult(entryId, frequencyMap); // not fitting the parameters
//   }

//   async editResultData(entryId: number | undefined, updatedResult: any) {
//     this.sentimentResult.editResult(entryId, updatedResult);
//     this.wordCloudsResult.editResult(entryId, frequencyMap); // not fitting the parameters
//   }

//   async deleteResultData(entryId: number | undefined) {
//     this.sentimentResult.deleteResult(entryId);
//     this.wordCloudsResult.deleteResult(entryId);
//   }
// }

export abstract class UpdateResults {
  abstract addResult(entryId: number, analysisResult: any, entryDate?: any): Promise<void>;
  abstract editResult(entryId: number, updatedResult: any): Promise<void>;
  abstract deleteResult(entryId: number): Promise<void>;
}

export class UpdateManager {
  private sentimentResult = new SentimentResultData();
  private wordCloudsResult = new WordCloudsResultData();

  async addResultData(
    entryId: number,
    analysisResult: any,
    entryDate?: any
  ) {
    if (analysisResult.sentiment) {
      await this.sentimentResult.addResult(entryId, analysisResult.sentiment, entryDate);
    }
    else if (analysisResult.wordClouds) {
      await this.wordCloudsResult.addResult(entryId, analysisResult.wordClouds);
    }
  }

  async editResultData(entryId: number | undefined, updatedResult: any) {
    if (updatedResult.sentiment) {
      await this.sentimentResult.editResult(entryId, updatedResult.sentiment);
    }
    else if (updatedResult.wordClouds) {
      await this.wordCloudsResult.editResult(entryId, updatedResult.wordClouds);
    }
  }

  async deleteResultData(entryId: number | undefined) {
    await this.sentimentResult.deleteResult(entryId);
    await this.wordCloudsResult.deleteResult(entryId);
  }
}