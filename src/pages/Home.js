import React, { Component, useEffect, useState }  from 'react';
import './Home.css';
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Footer from '../components/Footer';
import Header from '../components/Header';
const Home = (props) =>{
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    
    const [userTranscript, setUserTranscipt]  = useState("")

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
        console.log("user wants to say : ",userTranscript)
        if(userTranscript.trim().length > 0){
            window.open('/search_recipe')
            localStorage.setItem('userTranscript',userTranscript);
        }
        setUserTranscipt("")
        
    }

    function resetTranscript(){
        SpeechRecognition.stopListening()
        setUserTranscipt("");
    }

    return (
        <div>
            <Header></Header>
            
            <button className='buttonstyle buttonmargin1' onClick={SpeechRecognition.startListening}>SPEAK</button>
            <button className='buttonstyle buttonmargin1' onClick={resetTranscript}>CLEAR</button>

            <h2 className='left-margin'>{listening ? 'Listening...' : ''}</h2>
            
            <form onSubmit={handleSubmit} className='centerdiv'>
                <label >
                <textarea type="text" value={userTranscript} onChange={handleChange} placeholder="Click SPEAK Button to speak something..." className='textareastyle'/>
                </label>
            </form>

            <button className='buttonstyle buttonmargin2' onClick={handleSubmit}>SUBMIT</button> 
            
            <Footer></Footer>
       
        </div>
        
  );
  
    
}
export default Home;