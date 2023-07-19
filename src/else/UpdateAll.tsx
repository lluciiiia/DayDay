import WordCountAnalyzer from "./Analyzer/WordCountAnalyzer";
import { EntriesData } from "./GetPutData";

export async function AddAll(entry: Entry) {
  // add entry
  const entriesData = new EntriesData();
  entriesData.putEntriesData(entry);

  // add word count;
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.increaseWordCount(entry);
}

export async function EditAll(entry: Entry) {
  console.log("entry in EditAll", entry);
  // edit entry
  const entriesData = new EntriesData();

  const titleChange = { entryToChange: entry, newChange: entry.title, changeType: "title" };
  entriesData.modifyEntriesData(titleChange);

  // const categoryChange = { entryToChange: entry, newChange: entry.category, changeType: "category" };
  // entriesData.modifyEntriesData(categoryChange);

  // const contentChange = { entryToChange: entry, newChange: entry.content, changeType: "content" };
  // entriesData.modifyEntriesData(contentChange);

  // edit word count
}

export async function RemoveAll(entry: Entry) {
  // remove word count
  const wordCountAnalyzer = new WordCountAnalyzer();
  await wordCountAnalyzer.decreaseWordCount(entry);
}
