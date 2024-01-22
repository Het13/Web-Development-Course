import React, { useState } from "react";

function App() {
  const [fulltName, setFullName] = useState({
    fName: "",
    lName: "",
  });
  function handleChange(event) {
    const { value, name } = event.target;

    setFullName((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
        };
      }
    });
  }
  return (
    <div className="container">
      <h1>
        Hello {fulltName.fName} {fulltName.lName}{" "}
      </h1>
      <form>
        <input
          name="fName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
