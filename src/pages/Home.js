import React, { Component, useEffect, useState }  from 'react';
import './Home.css';
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Home = (props) =>{
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    
    const [userTranscript, setUserTranscipt]  = useState("")
    const recipeDBLogo = props.recipeDBLogoLink;

    useEffect(()=>{
        setUserTranscipt(transcript)
    },[transcript])

    if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return <span>Browser doesn't support speech recognition.</span>;
    }

    const [token, setToken] = useState(null)


    useEffect(()=>{
        if(token !== null){
            axios({
                method :"GET",
                url : `https://cosylab.iiitd.edu.in/api/recipeDB/searchrecipe?region=Middle Eastern`,
                headers:{
                    'Authorization': 'Bearer '+token,
                },
                
              }).then(res=>{
            console.log('data got',res);
            setUserTranscipt("");
            localStorage.setItem("RecipeListData",JSON.stringify(res))
            window.open('/search_recipe')
          }).catch(err=>{
            console.log('error got',err);
          })
        }
    },[token])

    function handleChange(event){
        setUserTranscipt(event.target.value)
        // handleSubmit(event);
    }



    function handleSubmit(event){

       
        console.log("user sposked: "+event.target.value);
         
          axios({
            method :"POST",
            url : `https://cosylab.iiitd.edu.in/api/auth/realms/bootadmin/protocol/openid-connect/token`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data : {
                'client_id': 'app-ims',
                'grant_type': 'password',
                'username': 'manas',
                'password': 'manas_cosylab',
                'scope': 'openid'
            }
          }).then(res=>{ 
            console.log('access token got:',res.data.access_token);
            setToken(res.data.access_token);
          })

        
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
        </form>
        <button className='buttonstyle buttonmargin2' onClick={handleSubmit}>SUBMIT</button> 
        </div>
  );
  
    
}
export default Home;