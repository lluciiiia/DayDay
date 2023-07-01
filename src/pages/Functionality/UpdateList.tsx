import wordCount from "./InitializeCount";
import { removeStopwords, eng, fra } from "stopword";

export const increaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  let words = content.split(" ");
  console.log("BEFORE: ", words);
  words = removeStopwords(words, eng);
  console.log("AFTER: ", words);

  words.forEach((word) => {
    const index = wordCount.findIndex((item) => item.word === word);
    if (index !== -1) {
      wordCount[index].count += 1;
    } else {
      wordCount.push({ count: 1, word });
    }
  });

  updateLocalStorage();
};

export const decreaseCount = (key: string, value: string) => {
  const content = value.toLowerCase();
  let words = content.split(" ");
  words = removeStopwords(words, eng);

  words.forEach((word) => {
    const index = wordCount.findIndex((item) => item.word === word);
    if (index !== -1) {
      wordCount[index].count -= 1;
      if (wordCount[index].count === 0) {
        wordCount.splice(index, 1);
      }
    }
  });

  updateLocalStorage();
};

function updateLocalStorage() {
  localStorage.setItem("wordCount", JSON.stringify(wordCount));
}
