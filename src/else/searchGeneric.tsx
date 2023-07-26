import { useState } from "react";
import { search, SearchData, SearchResult } from "./search"; // Assuming you have the search logic in a separate file
import { InputChangeEventDetail } from "@ionic/react";

export interface SearchHookResult<T> {
  results: T[];
  inputValue: string;
  handleInput: (event: CustomEvent<InputChangeEventDetail>) => void;
}

export function useSearch<T>(searchData: SearchData<T>): SearchHookResult<T> {
  const [results, setResults] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (event: CustomEvent<InputChangeEventDetail>) => {
    const input = event.detail.value || "";
    setInputValue(input); // Store the input value

    if (input) {
      const searchResults: SearchResult<T>[] = search(searchData, input);
      setResults(searchResults.map((result) => result.item));
    } else {
      setResults([]); // Clear the search results when input is empty
    }
  };

  return { results, inputValue, handleInput };
}
