import React, { useState } from "react";
import { Highlighter } from "react-fuzzy-highlighter";

interface SearchResult {
  date: string;
  content: string;
}

interface HighlightProps {
  results: SearchResult[];
  query: string;
}

const Highlight: React.FC<HighlightProps> = ({ results, query }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}>
          <div>
            <Highlighter text={result.content} highlight={query} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Highlight;
