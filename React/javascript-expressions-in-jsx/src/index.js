import React from "react";
import ReactDOM from "react-dom";

let fname = "Het";
let lname = "Patel";
let number = 16;

ReactDOM.render(
  <div>
    <h1>Hello World!</h1>
    <p>My name is {`${fname} ${lname}`}</p>
    <p>My lucky number is {number}</p>
    <p>Random Number {Math.floor(Math.random() * 100)}</p>
  </div>,
  document.getElementById("root")
);
