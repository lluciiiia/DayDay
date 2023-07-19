interface Content {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
}

interface Entry {
  id?: number;
  content: Content[];
  date: string;
  title: string;
  category: string;
}
