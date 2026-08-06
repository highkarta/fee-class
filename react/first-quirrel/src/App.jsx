import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const userName = 'error aa raha hai';
  function greet(){
    return "hello";
  }

  return (

    <>
      <p>Hi {userName}</p> {/* use curly braces to write js */}
      <input type="text" maxLength={10}/> 
      {/* use self-closing tag since every tag in react must be closed */} 
      <p>{greet()}</p>
    </>
  );
}

export default App;
