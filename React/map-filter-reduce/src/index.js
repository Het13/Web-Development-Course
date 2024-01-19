var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
numbers = numbers.map((x) => x * 2);
console.log(numbers);

//Filter - Create a new array by keeping the items that return true.
var numbers = [3, 56, 2, 48, 5];

numbers = numbers.filter((num) => num > 10);
console.log(numbers);

//Reduce - Accumulate a value by doing something to each item in an array.
var numbers = [3, 56, 2, 48, 5];

let value = numbers.reduce(
  (accumulator, currentNumber) => accumulator + currentNumber
);
console.log(value);

//Find - find the first item that matches from an array.
var numbers = [3, 56, 2, 48, 5];

let number = numbers.find((num) => num > 10);
console.log(number);

//FindIndex - find the index of the first item that matches.
var numbers = [3, 56, 2, 48, 5];

let index = numbers.findIndex((num) => num > 10);
console.log(index);

import emojipedia from "./emojipedia";

let newMeanings = emojipedia.map((obj) => obj.meaning.substring(1,100));

console.log(newMeanings);
