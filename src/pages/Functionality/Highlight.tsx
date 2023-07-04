import * as React from "react";
import FuzzyHighlighter, { Highlighter } from "react-fuzzy-highlighter";
import Dictionary from "./InitializeDictionary";

interface IAppState {
  query: string;
  Dictionary: Array<{
    date: string;
    content: string;
  }>;
}

class Highlight extends React.Component<{}, IAppState> {
  public state: IAppState = {
    query: "John", // TODO: actual input
    Dictionary,
  };

  public render() {
    return (
      <>
        <input
          type="search"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <FuzzyHighlighter
          query={this.state.query}
          data={this.state.Dictionary}
          options={{
            shouldSort: true,
            includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            //   maxPatternLength: 32,
            //   minMatchCharLength: 1,
            keys: ["date", "content"],
          }}>
          {({ formattedResults }) => {
            return (
              <ul>
                {formattedResults.map((formattedResult, resultIndex) => {
                  if (formattedResult.formatted.date === undefined) {
                    return null;
                  }

                  return (
                    <li
                      key={resultIndex}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1rem",
                      }}>
                      <div>
                        <Highlighter text={formattedResult.formatted.date} />
                      </div>
                      <div>
                        <Highlighter text={formattedResult.formatted.content} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </FuzzyHighlighter>
      </>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };
}

export default Highlight;
