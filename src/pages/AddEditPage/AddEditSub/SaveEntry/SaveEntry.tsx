import { useHistory } from "react-router";
import { useIonToast } from "@ionic/react";
import { presentToast } from "../../../../else/presentToast";
import { Entry, Category, Location } from "../../../../data/interfaces";
import { EntryServiceImpl } from "../../../../data/DataService";
import { WordCloudsAnalyzer } from "../../../../data/Analyzer/WordCloudsAnalysis";
import { SentimentTrendsAnalyzer } from "../../../../data/Analyzer/SentimentAnalysis";
import { SentimentResultData } from "../../../../data/ResultConstructor";
import { WordCloudsResultData } from "../../../../data/ResultConstructor";

export const SaveEntry = () => {
  const [present] = useIonToast();
  const handleSave = async (
    titleRef: React.RefObject<HTMLIonInputElement>,
    content: string,
    selectedDate: string | undefined,
    selectedCategoryName: string | undefined,
    history: ReturnType<typeof useHistory>,
    categories: Category[],
    selectedLocation: string | undefined,
    selectedLocationName: string | undefined
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
      location: 
        {
          placeId: selectedLocation!,
          name: selectedLocationName!,
        },
    };

    try {
      // save an entry
      const entries = new EntryServiceImpl();
      const entryId = await entries.addEntry(entry);
      console.log("type of  entryId", typeof entryId);
      // update sentiment analysis
      const sentimentAnalyzer = new SentimentTrendsAnalyzer();
      const sentimentResult = await sentimentAnalyzer.analyzeSentiment(entry);
      // update wordCloud analysis
      const wordCloudsAnalyzer = new WordCloudsAnalyzer();
      const wordCloudsResult = await wordCloudsAnalyzer.analyzeWords(entry);

      const sentimentData = new SentimentResultData();
      await sentimentData.addSentimentResult(
        entryId,
        sentimentResult,
        selectedDate
      );

      const wordCloudsData = new WordCloudsResultData();
      await wordCloudsData.addWordCloudResult(entryId, wordCloudsResult);

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
