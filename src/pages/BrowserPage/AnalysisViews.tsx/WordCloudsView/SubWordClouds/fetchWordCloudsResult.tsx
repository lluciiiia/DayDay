import { useEffect, useState } from "react";
import { WordCloudsResultData } from "../../../../../data/ResultService/wordCloudsResult";

const fetchWordCloudsResult = () => {
  const [topWords, setTopWords] = useState<[string, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wordCloudsResult = new WordCloudsResultData();
      const result = await wordCloudsResult.getAllResults();
      console.log("result: ", result);

      const typedResult = result as { [key: string]: number };
      const sortedWordCount = Object.entries(typedResult);
      sortedWordCount.sort((a, b) => b[1] - a[1]);

      const topWordsSlice = sortedWordCount.slice(0, 51);
      console.log("Slice: ", topWordsSlice);

      setTopWords(topWordsSlice);
    };

    fetchData();
  }, []);

  return { topWords };
};

export default fetchWordCloudsResult;
