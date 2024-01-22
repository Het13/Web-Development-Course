import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todoArray, setTodoArray] = useState(["Buy", "Go"]);

  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleClick() {
    setTodoArray((prevValue) => {
      return [...prevValue, input];
    });
    setInput('')
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
        />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todoArray.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
