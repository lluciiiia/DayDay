type Content = {
  type: "text" | "image" | "video" | "audio" | "location" | "sticker";
  text?: string;
};

type Entry = {
  content: Content[];
  date: string;
  title: string;
  category: string;
  key: number | undefined;
};


