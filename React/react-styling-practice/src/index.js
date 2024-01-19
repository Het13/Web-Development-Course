//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

text = "";
customStyle = {
  color: "",
};

time = new Date().getHours();

if (time >= 0 && time <= 12) {
  text = "Morning";
  customStyle.color = "red";
} else if (time > 12 && time < 18) {
  text = "Afternoon";
  customStyle.color = "green";
} else {
  text = "Night";
  customStyle.color = "blue";
}

ReactDOM.render(
  <h1 style={customStyle}>Good {text}</h1>,
  document.getElementById("root")
);
