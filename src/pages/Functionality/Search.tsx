// import React, { useState } from "react";
// import SearchPage from "../SearchPage";

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<[string, string][]>([]);
//   const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const diaries: { [date: string]: string } = JSON.parse(
//       localStorage.getItem("diaries") || "{}"
//     );
//     const filteredEntries = Object.entries(diaries).filter(([date, content]) => {
//       const lowerCaseQuery = query.toLowerCase();
//       return (
//         date.includes(lowerCaseQuery) ||
//         content.toLowerCase().includes(lowerCaseQuery)
//       );
//     });
//     setSearchResults(filteredEntries);

//     // Call onSearchSuggestions to populate search suggestions
//     handleSearchSuggestions(query);
//   };

//   const handleSearchSuggestions = (query: string) => {
//     const diaries: { [date: string]: string } = JSON.parse(
//       localStorage.getItem("diaries") || "{}"
//     );
//     const suggestions = Object.keys(diaries).filter((date) =>
//       date.includes(query)
//     );
//     setSearchSuggestions(suggestions);
//   };

//   return (
//     <SearchPage
//       searchQuery={searchQuery}
//       searchResults={searchResults}
//       searchSuggestions={searchSuggestions}
//       onSearch={handleSearch}
//       onSearchSuggestions={handleSearchSuggestions}
//     />
//   );
// };

// export default Search;
