import { Entry } from "../interfaces";
import { EntryAnalysis } from "../interfaces";

export interface ActivityGoalData {}

// entry.content.text, entry.date, entry.category (if applicable)
export interface ActivityGoalAnalysis extends EntryAnalysis {
  analyzeActivityAndGoal(entry: Entry): Promise<void>;
}

export class ActivityGoalAnalyzer implements ActivityGoalAnalysis {
  async analyzeActivityAndGoal(entry: Entry): Promise<void> {
    // Implementation for activity and goal analysis
  }
}
