import React from "react";
import ReactDOM from "react-dom";
import pi, { doublePI, triplePI } from "./math";

ReactDOM.render(
  <ul>
    <li>{pi}</li>
    <li>{doublePI()}</li>
    <li>{triplePI()}</li>
  </ul>,
  document.getElementById("root")
);
