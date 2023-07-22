export const Instruction = () => {
  return (
    <div style={{ marginTop: "60px", padding: "10px 20px" }}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        Get To Know Your Sentiment Patterns
      </div>
      <div style={{ fontSize: "18px", marginTop: "18px" }}>
        Each sentiment score ranges from -5 to +5. <br />
        Positive score: positive sentiment. <br />
        Negative score: negative sentiment. <br />
        <br />
        Each date displays the average of the day.
      </div>
    </div>
  );
};

export default Instruction;
