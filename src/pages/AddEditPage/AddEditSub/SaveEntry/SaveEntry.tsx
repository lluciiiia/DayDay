import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../../else/presentToast";
import { Entry, Category } from "../../../../data/interfaces";
import { EntryServiceImpl } from "../../../../data/DataService";
import { WordCloudsAnalyzer } from "../../../../data/Analyzer/WordCloudsAnalyzer";
import { SentimentTrendsAnalyzer } from "../../../../data/Analyzer/SentimentAnalysis";
import { UpdateManager } from "../../../../data/updateResults";

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
      // save an entry
      const entries = new EntryServiceImpl();
      const entryId = await entries.addEntry(entry);

      const updateManager = new UpdateManager();
      // update sentiment analysis
      const sentimentAnalyzer = new SentimentTrendsAnalyzer();
      const sentimentResult = await sentimentAnalyzer.analyzeSentiment(entry);
      await updateManager.addResultData(
        entryId,
        { sentiment: sentimentResult },
        selectedDate
      );
      // update wordCloud analysis
      const wordCloudsAnalyzer = new WordCloudsAnalyzer();
      const wordCloudsResult = await wordCloudsAnalyzer.analyzeWords(entry);
      await updateManager.addResultData(entryId, {
        wordClouds: wordCloudsResult,
      });

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
