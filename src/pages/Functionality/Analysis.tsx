import afinn from "afinn-111";

// Define an interface for the sentiment scores
interface AfinnScores {
  [key: string]: number;
}

export const sentimentScore = (value: string) => {
  // Define the input text and split it into tokens:
  const content = value.toLowerCase();
  const tokens = content.split(" ");

  let totalScore = 0;
  for (const token of tokens) {
    if (token in afinn) {
      const scores = afinn as unknown as AfinnScores;
      totalScore += scores[token];
    }
  }

  return totalScore;
};
