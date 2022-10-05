import React, { Component, useEffect, useState }  from 'react';
import './App.css';
import { Container  } from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const [userTranscript, setUserTranscipt]  = useState("")
  const recipeDBLogo = 'https://cosylab.iiitd.edu.in/recipedb/static/media/recipedb-logo.png'

  useEffect(()=>{
    setUserTranscipt(transcript)
  },[transcript])

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  function handleChange(event){
      setUserTranscipt(event.target.value)
  }

  function handleSubmit(event){
    console.log("user spoked: "+event.target.value);
  }

  function resetTranscript(){
    SpeechRecognition.stopListening()
    setUserTranscipt("");
  }



  return (
    <div>
        <img src = {recipeDBLogo} className = "recipeDBLogo"></img>
        <h1 className='header'> Voice Assistant for RecipeDB</h1>
        <br/>
        <br/>


      <div >
      <button className='buttonstyle buttonmargin1' onClick={SpeechRecognition.startListening}>SPEAK</button>
        <button className='buttonstyle buttonmargin1' onClick={resetTranscript}>CLEAR</button>
      </div>

      <h2 className='left-margin'>{listening ? 'Listening...' : ''}</h2>
       
    
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <form onSubmit={handleSubmit} className='centerdiv'>
        <label >
          <textarea type="text" value={userTranscript} onChange={handleChange} placeholder="Click SPEAK Button to speak something..." className='textareastyle'/>
        </label>
        <button className='buttonstyle buttonmargin2' onClick={handleSubmit}>SUBMIT</button> 
      </form>
    </div>
  );
};

export default App;
