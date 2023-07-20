export interface LocationData {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface Content {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
  location?: LocationData;
  sticker?: string;
}

export interface Entry {
  id?: number;
  content: Content[];
  date: string;
  title: string;
  category: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface EntryService {
  addEntry(entry: Entry): Promise<void>;
  deleteEntry(entryId: number): Promise<void>;
  editEntry(entryId: number, updatedEntry: Entry): Promise<void>;
  getEntry(entryId: number): Promise<Entry>;
  getAllEntries(): Promise<Entry[]>;
}

export interface EntryAnalysis {
  analyzeSentiment(entry: Entry): Promise<string>;
  analyzeLocation(entry: Entry): Promise<LocationData>;
}
