import React from "react";
import ReactDOM from "react-dom";

customStyle = {
  color: "red",
  border: "1px solid black",
  textAlign: "center",
};
ReactDOM.render(
  <h1 style={customStyle}>Hello World!</h1>,
  document.getElementById("root")
);
