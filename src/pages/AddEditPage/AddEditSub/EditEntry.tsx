import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../else/presentToast";
import { Entry } from "../../../data/interfaces";
import { WordCloudsAnalyzer } from "../../../data/Analyzer/WordCloudsAnalysis";
import { SentimentTrendsAnalyzer } from "../../../data/Analyzer/SentimentAnalysis";
import {
  SentimentResultData,
  WordCloudsResultData,
} from "../../../data/ResultConstructor";
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
    entryid: number | undefined,
    selectedLocation: string | undefined,
    selectedLocationName: string | undefined
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
        location: {
          placeId: selectedLocation!,
          name: selectedLocationName!,
        },
      };

      try {
        const EntryService = new EntryServiceImpl();
        await EntryService.editEntry(entryid, entry);

        // update sentiment analysis
        const sentimentAnalyzer = new SentimentTrendsAnalyzer();
        const sentimentResult = await sentimentAnalyzer.analyzeSentiment(entry);

        // update wordCloud analysis
        const wordCloudsAnalyzer = new WordCloudsAnalyzer();
        const wordCloudsResult = await wordCloudsAnalyzer.analyzeWords(entry);

        const sentimentData = new SentimentResultData();
        await sentimentData.editSentimentResult(
          entryid,
          sentimentResult,
          selectedDate
        );

        const wordCloudsData = new WordCloudsResultData();
        await wordCloudsData.editWordCloudResult(entryid, wordCloudsResult);

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
