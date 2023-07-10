type Content = {
    type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  };
  
  type Entry = {
    content: Content[];
    date: Date;
    title: string;
  };
  
  type Category = {
    category: string;
    entries: Entry[];
  };
  
  interface EntryService {
    //Get Entry
    getAllEntries(): Entry[];
    getEntryByTitle(title: string): Entry | undefined;
    getEntryByDate(date: Date): Entry | undefined;
    getEntryByCategory(category: Category): Entry | undefined;
    //Add Entry
    addEntryByCategory(category: Category, entry: Entry): void;
    addEntryByDate(date: Date, entry: Entry): void;
    // Etc.
    updateEntry(category: Category, id: string, entry: Entry): boolean;
    deleteEntry(category: Category, id: string): boolean;
    searchEntries(category: Category, keyword: string): Entry[];
  }
  
