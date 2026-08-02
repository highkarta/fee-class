let url = 'http://www.official-joke-api.appspot.com/random_joke';

const jokeSetup = document.getElementsByTagName('h1');
const jokePunch = document.getElementsByTagName('h2');
const btn = document.getElementsByTagName('button');
btn[0].addEventListener('click', getJoke);

// old way to dealing with promises, using then chaining
/*
const data = fetch(url);

data
.then((data) => {
  console.log(data); // this is a response object
  return data.json();
})
.then((originalData) => {
  // use then instead of catch
  console.log(originalData);
})
.finally(() => {
  // console.log("Request accepted or rejected");
}); // then works when promise is resolved and catch when promise is rejected
*/

/*
setTimeout(() => {
  console.log(data);
  }, 3000);
  */

// async, await -> the modern recommended way to deal with promises
async function getJoke() {
  // without using async keyword here, you can't use await keyword inside otherwise you'll get an error
  // try-catch block to deal with errors
  try {
    const data = await fetch(url); // await will wait till the promise is fulfilled. You get a response object which you'll need to convert into JSON
    const originalData = await data.json(); // await here too since this conversion will also take some time. You won't be able to access data otherwise
    console.log(originalData);
    jokeSetup[0].innerText = originalData.setup;
    jokePunch[0].innerText = originalData.punchline;
  } catch (error) {
    console.log(error);
  }
}
