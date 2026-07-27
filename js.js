/*
// var can be reassigned as well as redeclared -> function-scoped

function s(){
  var a = 10;
}
console.log(a); // error: using b outside it's scope
// var can't be accessed out of any function scope

if(true){
  var b = 15;
}
console.log(b); // 15
// var can be accessed out of say a conditional scope


// let can be reassigned but not redeclared -> block-scoped (can't access it out of any scope)
if(true){
  let c = 10;
}
console.log(c); // ReferenceError: c is not defined

// const -> can't redeclare, can't reassign, block-scoped

// hoisting
console.log(a); // undefined
var a = 5;
console.log(a);

// tdz in let
// hoisting in function expressions/arrow-functions -> can't be called before declaring
// standard function call works even if they aren't declared yet

a=[1, 2, 3, 4, 5];
console.log(a[-1]); // gives undefined, to use negative indexes, use at() keyword
console.log(a.at(-1));
a.unshift(-7);
console.log(a.findIndex(x=>x==4));
a.sort(); // by default sorts alphabetically?
console.log(a.sort(a,b => a-b));
console.log(a.sort((a,b) => a+b)); // swap?

// map, filter, reduce
// forin -> value, forof -> key

for(const el in arr){
  console.log(el);
}

// use while when you don't know the number of iterations
*/

/*
// anonymous function -> are these hoisted?
const a = function(){

}

// function(){} // missing identifier

const a = (a, b) => { // if you use curly braces, you'll have to separately use a return statement
  return a+b;
}

const b = (a, b) => (a + b);
console.log(b(1, 2));
// arrow functions have no this and argument keywords. Neither can you super keyword

const c = () => ({a:1, b:2});

function sum(){
  console.log(arguments); // each function has an arguments object
  console.log(arguments[0] + arguments[1]);
}
sum(2,3); // if 15 arguments are passed, you'll have to defined 15 parameters, to avoid this situation, you use arguments object

// but arrow functions do not have arguments keyword, so we do the same thing in them using rest operator
const aSum = (a, b, ...number) => { // this is rest operator, not to be confused with the spread operator
  // the rest operator is used to gather elements into an array, while the spread operator is used to spread the content of an array.
  // both rest and spread operators are same in syntax, their definition depends on context/usecase
  console.log(number);
}
aSum(1, 2, 3, 4, 5, 6, 7); // a = 1, b = 2, and rest all go to number array
// (...number, a, b) -> rest operator must be last formal parameter, otherwise error
*/

/*
// use of spread operator
const arr = [1, 2, 3, 4];
console.log(Math.max(...arr));

const anotherArr = [...arr, 5, 6, 7];
console.log(anotherArr);

// callback functions -> receiving a function within a function
// b is a callback function here
function a(b){
  b();
}

function b(){
  console.log("Hello");
}

const c = a(b); // c stores the value returned from the function and then in the next line you try to call that return value which does not make sense
c(); // why is c not a function?

// higher order functions -> functions that either receive a function as a parameter or return a function

// lexical scope -> inner function can access variable from outer scope
function outer(){
  var a = 3;
  function inner(){
    console.log(a);
  }
  inner();
}
outer();

// default parameter -> only runs when you haven't specified a parameter yourself
function f(a=4){
  console.log(a);
}
f(3);
*/

// closure -> outer variable is still remembered by the inner function even after outer function has finished execution

function outer(){
  let a = 3;
  return function inner(){
    a++;
    console.log(a);
  }
}
const f = outer();
f(); // f is a closure function

// arrays
const arr = new Array(1, 2, 3, 4); // new keyword allocates dynamic memory at runtime
console.log(arr);
console.log(arr.at(-1)); // at() was added in 2023, you can use negative indexing with arrays using this

for(item in a){
  console.log(item);
}

// map, filter, reduce
  // map, filter -> return new array
a.foreEach((item) => {
  console.log(item);
  
})

const b = a.map(item => item * item);
console.log(b);

const c = a.filter(item => item%2==0);
console.log(b);

// objects
var a = "name"; // only works in case of var??
const student = {
  name: "Whatever",
  age: 18,
  address: "Whatever",
  greet: function(){
    console.log("hello");
    console.log(this.name);
  },
  greet2: ()=>{
    console.log(this.name); // but arrow functions don't have this keyword
    // this allows you to point towards the object from which you call it
  }
}

console.log(student.name);
console.log(student.greet()); // have to use parentheses to call, I though otherwise
console.log(student[a]); // use square brackets, when your key is a variable
console.log(student["name"]); // another way

// transfer of data happens through JSON, earlier XML was used
const person = new Object();
person.name = "name";