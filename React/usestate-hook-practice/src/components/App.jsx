import React, { useState } from "react";

function App() {
  const [time, updateTime] = useState(new Date().toLocaleTimeString());

  function getTime() {
    updateTime(new Date().toLocaleTimeString());
  }

  setInterval(getTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
