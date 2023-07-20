interface LocationData {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface Content {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
  location?: LocationData;
  sticker?: string;
}

interface Entry {
  id?: number;
  content: Content[];
  date: string;
  title: string;
  category: string;
}

interface EntryService {
  addEntry(entry: Entry): Promise<void>;
  deleteEntry(entryId: number): Promise<void>;
  editEntry(entryId: number, updatedEntry: Entry): Promise<void>;
  getEntry(entryId: number): Promise<Entry>;
  getAllEntries(): Promise<Entry[]>;
}

interface EntryAnalysis {}
