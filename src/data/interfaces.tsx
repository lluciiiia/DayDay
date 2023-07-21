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
  category: Category;
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

export interface CategoryService {
  addCategory(categoryName: string): Promise<void>;
  deleteCategory(categoryId: number): Promise<void>;
  editCategory(categoryId: number, updatedCategory: string): Promise<void>;
  getCategory(categoryId: number): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
}

export interface EntryAnalysis {}
