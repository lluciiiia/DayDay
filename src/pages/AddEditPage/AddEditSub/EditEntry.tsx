import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";
import { Entry } from "../../../data/interfaces";
import { WordCloudsAnalyzer } from "../../../data/Analyzer/WordCloudsAnalyzer";
import { SentimentTrendsAnalyzer } from "../../../data/Analyzer/SentimentAnalysis";
import { UpdateManager } from "../../../data/updateResults";
import {
  EntryServiceImpl,
  CategoryServiceImpl,
} from "../../../data/DataService";

export const EditEntry = () => {
  const [present] = useIonToast();
  const handleEdit = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string,
    selectedCategory: string,
    history: ReturnType<typeof useHistory>,
    entryid: number | undefined
  ) => {
    const title = titleRef.current?.value as string;

    if (title.trim() === "") {
      presentToast(present, "Please enter your diary title");
      return;
    }
    if (selectedCategory.trim() === "") {
      presentToast(present, "Please select your diary category");
      return;
    }
    if (content.trim() === "") {
      presentToast(present, "Please enter your diary content");
      return;
    }

    const categoryService = new CategoryServiceImpl();
    const categories = await categoryService.getAllCategories();

    const objectCategory = Object.values(categories).find(
      (category) =>
        JSON.stringify(category.name) === JSON.stringify(selectedCategory)
    );

    if (objectCategory) {
      const entry: Entry = {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
        date: selectedDate,
        title: title,
        category: objectCategory,
        id: entryid,
      };
      console.log("entry in editEntry", entry);

      try {
        const EntryService = new EntryServiceImpl();
        await EntryService.editEntry(entryid, entry);

        const updateManager = new UpdateManager();
        // update sentiment analysis
        const sentimentAnalyzer = new SentimentTrendsAnalyzer();
        const sentimentResult = await sentimentAnalyzer.analyzeSentiment(entry);
        console.log("Sentiment result: " + sentimentResult);
        await updateManager.editResultData(entryid, {
          sentiment: sentimentResult,
        });
        console.log("Updated sentiment");
        // update wordCloud analysis
        const wordCloudsAnalyzer = new WordCloudsAnalyzer();
        const wordCloudsResult = await wordCloudsAnalyzer.analyzeWords(entry);
        console.log("passed");
        console.log("WordClouds result: " + wordCloudsResult);
        await updateManager.editResultData(entryid, {
          wordClouds: wordCloudsResult,
        });

        presentToast(present, "Your diary is saved!");
        setTimeout(() => {
          history.push("/calendar");
        }, 300);
      } catch (error) {
        console.error(error);
        presentToast(present, "Failed to edit your diary.");
      }
    }
  };

  return {
    handleEdit,
  };
};

export default EditEntry;
