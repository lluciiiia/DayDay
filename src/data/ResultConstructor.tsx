import { ResultData, ResultDataProps } from "./ResultData";

const sentimentResultProps: ResultDataProps = {
  url: "/sentiment",
};

export class SentimentResultData extends ResultData {
  constructor() {
    super(sentimentResultProps);
  }

  async addSentimentResult(
    entryId: number,
    totalScore: number,
    entryDate: string | undefined
  ): Promise<void> {
    const data = { entryId, totalScore, entryDate };
    await super.addResult(entryId, data);
  }

  async editSentimentResult(
    entryId: number | undefined,
    newScore: number,
    entryDate: string | undefined
  ): Promise<void> {
    const data = { entryId, newScore, entryDate };
    await super.editResult(entryId, data);
  }
}

const wordCloudsResultProps: ResultDataProps = {
  url: "/wordClouds",
};

export class WordCloudsResultData extends ResultData {
  constructor() {
    super(wordCloudsResultProps);
  }

  async addWordCloudResult(
    entryId: number,
    frequencyMap: object
  ): Promise<void> {
    const data = { entryId, frequencyMap };
    await super.addResult(entryId, data);
  }

  async editWordCloudResult(
    entryId: number | undefined,
    newFrequencyMap: object
  ): Promise<void> {
    const data = { entryId, newFrequencyMap };
    await super.editResult(entryId, data);
  }
}
