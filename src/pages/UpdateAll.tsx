import WordCountAnalyzer from "../data/Analyzer/WordCountAnalyzer";
import { putData } from "../data/Entry/EntryData";

export async function AddAll(entry: Entry) {
  // add entry
  await putData(entry);

  // add word count;
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.increaseWordCount(entry);
}

export async function RemoveAll(entry: Entry) {
  // remove word count
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.decreaseWordCount(entry);
}
