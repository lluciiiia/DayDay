type Content = {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
};

type Entry = {
  content: Content[];
  date: string;
  title: string;
  category: string;
  id: number;
};

interface EntryService {
  // Get Entry
  getAllEntries(): Entry[];
  getEntryByTitle(title: string): Entry | undefined;
  getEntryByDate(date: string): Entry | undefined;
  getEntryByCategory(category: string): Entry | undefined; // Updated parameter type
  // Add Entry
  addEntryByCategory(category: string, entry: Entry): void; // Updated parameter type
  addEntryByDate(date: string, entry: Entry): void;
  // Etc.
  updateEntry(category: string, id: string, entry: Entry): boolean; // Updated parameter type
  deleteEntry(category: string, id: string): boolean; // Updated parameter type
  searchEntries(category: string, keyword: string): Entry[]; // Updated parameter type
}
