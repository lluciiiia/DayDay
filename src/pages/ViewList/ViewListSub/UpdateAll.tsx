import WordCountAnalyzer from "../../../else/Analyzer/WordCountAnalyzer";
import { EntriesData } from "../../../GetPutData";

export async function AddAll(entry: Entry) {
  // add entry
  const entriesData = new EntriesData();
  entriesData.putEntriesData(entry);

  // add word count;
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.increaseWordCount(entry);
}

export async function RemoveAll(entry: Entry) {
  // remove word count
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.decreaseWordCount(entry);
}
