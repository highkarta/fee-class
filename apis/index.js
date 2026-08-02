let url = "http://www.official-joke-api.appspot.com/random_joke";

const joke = document.getElementsByTagName("h1");
const jokeDesc = document.getElementsByTagName("h2");
const btn = document.getElementsByTagName("button");


const data = fetch(url);
/*
setTimeout(() => {
  console.log(data);
}, 3000);
*/

data.then((data) => {
  console.log(data); // this is a response object
  return data.json();
  
}).then((originalData) => { // use then instead of catch
  console.log(originalData);
}).finally(() => {
  // console.log("Request accepted or rejected");
  
}); // then works when promise is resolved and catch when promise is rejected

// const image = document.createElement("img");
// image.src = data;

// async, await -> the modern recommended way to deal with promises
async function getJoke(){ // without using async keyword here, you can't use await keyword inside otherwise you'll get an error
  
  /*
  const data = await fetch(url); // await will wait till the promise is fulfilled. You get a response object which you'll need to convert into JSON
  const originalData = await data.json(); // await here too since this conversion will also take some time. You won't be able to access data otherwise
  console.log(originalData);
  */

 // try-catch block to deal with errors
 try{
  const data = await fetch(url);
  const originalData = await data.json();
  console.log(originalData);

 }
 catch(error){
  console.log(error);
 }
}