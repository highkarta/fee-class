let userName: string = "Hello"; // name is a reserved keyword kind of
let isOnline: boolean = false;

let scores: number[] = [10, 20, 30];
let tags: Array<string> = ["string", "array"];

function addNumbers(a: number, b: number): number{
  return a + b;
}

var a: number = 5; // ts has var keyword too

const greet = (name: string): string => {
  return `Hello, ${name}`;
};

let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Bob",
  age: 30,
  isAdmin: false
};

// let hello = "hello world"; // error because hello is also defined in check.js
// console.log(hello); // you run .ts files using node too
// hello = 2; // Type 'number' is not assignable to type 'string'

let helloWorld: string = "hello world";
// helloWorld = 3; // Type 'number' is not assignable to type 'string'
