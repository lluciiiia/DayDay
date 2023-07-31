export interface Location {
  placeId: string;
  name: string;
}

export interface Content {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
  sticker?: string;
}

export interface Entry {
  id?: number;
  content: Content[];
  date: string;
  title: string;
  category: Category;
  location?: Location[];
}

export interface Category {
  id?: number;
  name: string;
}

export interface EntryService {
  addEntry(entry: Entry): Promise<number>;
  deleteEntry(entryId: number): Promise<void>;
  editEntry(entryId: number, updatedEntry: Entry): Promise<void>;
  getEntry(entryId: number): Promise<Entry>;
  getAllEntries(): Promise<Entry[]>;
}

export interface CategoryService {
  addCategory(category: string): Promise<void>;
  deleteCategory(categoryId: number): Promise<void>;
  editCategory(categoryId: number, updatedCategory: string): Promise<void>;
  getCategory(categoryId: number): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
}

export interface EntryAnalysis {
  // analyzeSentiment(entry: Entry): Promise<number>;
}
