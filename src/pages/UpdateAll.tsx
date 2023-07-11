import WordCountAnalyzer from "../data/Analyzer/WordCountAnalyzer";

async function AddAll(entry: Entry) {
  // Call AddFunctionalities();
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.increaseWordCount(entry);
}

async function RemoveAll(entry: Entry) {
  // Call RemoveFunctionalities();
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.decreaseWordCount(entry);
}
