import { TimeBasedResultData } from "./ResultService/TimeBasedResult";
import { SentimentResultData } from "./ResultService/sentimentResult";
import { ActivityGoalResultData } from "./ResultService/ActivityGoalResult";
import { LocationResultData } from "./ResultService/locationResult";
import { EmotionalMappingResultData } from "./ResultService/MappingResult";

export class updateResults {
  private timeBasedResult = new TimeBasedResultData();
  private sentimentResult = new SentimentResultData();
  private activityGoalResult = new ActivityGoalResultData();
  private locationResult = new LocationResultData();
  private emotionalMappingResult = new EmotionalMappingResultData();

  async addResultData(entryId: number, analysisResult: any) {
    this.timeBasedResult.addResult(entryId, analysisResult);
    this.sentimentResult.addResult(entryId, analysisResult);
    this.activityGoalResult.addResult(entryId, analysisResult);
    this.locationResult.addResult(entryId, analysisResult);
    this.emotionalMappingResult.addResult(entryId, analysisResult);
  }

  async editResultData(entryId: number, updatedResult: any) {
    this.timeBasedResult.editResult(entryId, updatedResult);
    this.sentimentResult.editResult(entryId, updatedResult);
    this.activityGoalResult.editResult(entryId, updatedResult);
    this.locationResult.editResult(entryId, updatedResult);
    this.emotionalMappingResult.editResult(entryId, updatedResult);
  }

  async deleteResultData(entryId: number) {
    this.timeBasedResult.deleteResult(entryId);
    this.sentimentResult.deleteResult(entryId);
    this.activityGoalResult.deleteResult(entryId);
    this.locationResult.deleteResult(entryId);
    this.emotionalMappingResult.deleteResult(entryId);
  }
}
