import React from "react";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    onContentChange(newContent);
  };

  return (
    <div
      style={{
        height: 620,
        overflowY: "scroll",
        maxWidth: 380,
        margin: "auto",
        padding: "0px 3px 20px 3px",
      }}
    >
      <textarea
        value={content}
        onChange={handleContentChange}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          borderRadius: 10,
          borderColor: "transparent",
          fontSize: "16px",
        }}
        placeholder="Enter your diary here"
      ></textarea>
    </div>
  );
};

export default ContentEditor;
