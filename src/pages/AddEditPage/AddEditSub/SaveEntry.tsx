import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";
import { Entry, Category } from "../../../data/interfaces";
import { EntryServiceImpl } from "../../../data/DataService";
import { SentimentTrendsAnalyzer } from "../../../data/Analyzer/SentimentAnalysis";
import { UpdateResults } from "../../../data/updateResults";

export const SaveEntry = () => {
  const [present] = useIonToast();
  const handleSave = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string | undefined,
    selectedCategoryName: string | undefined,
    history: ReturnType<typeof useHistory>,
    categories: Category[]
  ) => {
    const title = titleRef.current?.value as string;

    if (title.trim() === "") {
      presentToast(present, "Please enter your diary title");
      return;
    }
    console.log(selectedCategoryName);
    if (selectedCategoryName === "") {
      presentToast(present, "Please select your diary category");
      return;
    }
    if (content.trim() === "") {
      presentToast(present, "Please enter your diary content");
      return;
    }

    const selectedCategory = Object.values(categories).find(
      (value) => value.name === selectedCategoryName
    );

    const entry: Entry = {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
      date: selectedDate!,
      title: title,
      category: selectedCategory!,
      id: undefined,
    };

    try {
      // save an entry + update analysis with the entry id
      const entries = new EntryServiceImpl();
      const entryId = await entries.addEntry(entry);
      // update analysis
      const sentimentAnalyzer = new SentimentTrendsAnalyzer();
      const updateResults = new UpdateResults();
      const sentimentResult = await sentimentAnalyzer.analyzeSentiment(entry);
      await updateResults.addResultData(entryId, sentimentResult, selectedDate);

      presentToast(present, "Your diary is saved!");
      setTimeout(() => {
        history.push("/calendar");
      }, 300);
    } catch (error) {
      console.error(error);
      presentToast(present, "Failed to save your diary.");
    }
  };

  return {
    handleSave,
  };
};

export default SaveEntry;
