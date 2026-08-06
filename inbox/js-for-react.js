// the conventional way
export default function DoSomething() {

}

// exporting functions also becomes easier with arrow functions using the export keyword
export const DoSomething = () => {

}

const MyComponent = () => {
   return (
      <div onClick={DoSomething}></div> // linking to an already defined function
   )
}

// OR you can link it to an anyonymous function
<button
   onClick={() => {
         console.log("hello world");
      }}
></button>

// conditionals
if (true){
  
} else{
  
}

let name = age > 10 && "Pedro"; // if age>10 condition is true, set name to "Pedro"
let name = age > 10 || "Pedro"; // does the opposite of above. if age > 10 is false, then name is set to "Pedro"
let name = age > 10 ? "Pedro" : "Jack"; // if age > 10 is true, name is "Pedro" otherwise "Jack"

// Practical example of this in React
const Component = () => {
   return age > 10 ? <div>Pedro</div> : <div>Jack</div>; // which div will be returned in our html depends on whether age is greater than 10 or not.
}

// Objects in JS (are basically dictionaries in Python)
const person = {
   name: "Pedro",
   age: 20,
   isMarried: false,
};

// defining variable names for the object values, but it takes 3 lines, so there exists a shorter way to do this
const name = person.name
const age = person.age
const isMarried = person.isMarried

// shorter way using the destructing property of objects (destructing any key-value pair from the object directly)
const {name, age, isMarried} = person;

// conventional way (if key and value pairs have the same name)
const name = "Pedro";
const age = 18;

const person = {
   name: name,
   age: age,
};

// shorter and recommended way (can be used when both the value and key pair have the same name)
const person = {
   name,
   age,
};

// two users have same details, say only the name is different
// now instead of copying the entire object and then modifiying the name, you can use the spread operator (...)
const person2 = {...person, name: "Jack"}; // ...person suggests that give me person object as it is, only change the name key

// arrays
const names = ["Pedro", "Jack", "Jessica"];
const names2 = [...names, "Joel"]; // this is how you're going to add and manipulate elements when they're inside of states. Give me the arrays names as it is and add "Joel" in it when a change in state is seen and store it in names2

// three basic functions that one must know when working with arrays, .map(), .filter(), .reduce();
names.map((name) => { // basically like for name in names, print name + "1" --> using an anonymous function with an argument name in it.
   console.log(name);
   return name + "1";
});

// practical example from react
names.map((name) => {
   return <h1>{name}</h1>
});

// filter method (to filter through lists)
let names = ["Pedro", "James", "Pedro", "Pedro"] // we want to remove duplicates from this list

names.filter((name) => {
   return name !== "Pedro"; // filter uses return to change the values of the list based on a given condition
});
