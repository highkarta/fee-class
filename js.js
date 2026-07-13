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


