import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [isMouseOver, setcustomStyle] = useState(false);
  function handleCliclk() {
    setHeadingText("Submitted");
  }
  function handleMouseOver() {
    setcustomStyle(true);
  }
  function handleMouseOut() {
    setcustomStyle(false);
  }
  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input
        type="text"
        placeholder="What's your name?"
      />
      <button
        style={{ backgroundColor: isMouseOver ? "black" : "white" }}
        onClick={handleCliclk}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        Submit
      </button>
    </div>
  );
}

export default App;
