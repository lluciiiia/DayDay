interface Content {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
  image?: string;
  video?: string;
  audio?: string;
  location?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  sticker?: string;
}

interface Entry {
  id?: number;
  content: Content[];
  date: string;
  title: string;
  category: string;
}
