type Content = {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
};

type Entry = {
  id: number; // The unique integer ID set from the backend
  content: Content[];
  date: string;
  title: string;
  category: string;
};
