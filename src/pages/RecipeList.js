import React, { Component, useEffect, useState }  from 'react';
import './RecipeList.css';
import { BasicTable } from './../components/BasicTable';
import axios from 'axios'
import { Audio, Circles, ColorRing, InfinitySpin, ProgressBar, RevolvingDot, Rings, ThreeCircles } from 'react-loader-spinner'
const RecipeList = (props)  => {
    const recipeDBLogo = props.recipeDBLogoLink;

    const [token, setToken] = useState(null);

    useEffect(()=>{
        if(token !== null){
            axios({
                method :"GET",
                // url : `https://cosylab.iiitd.edu.in/api/recipeDB/searchrecipe?country=Indian`,
                url : `http://127.0.0.1:5001/helloworld/india`,
                headers:{
                    'Authorization': 'Bearer '+token,
                },
                
              }).then(res=>{
            console.log('data got',res.data);
            // setJsonData(res.data);
            setJsonData(res.data);
          }).catch(err=>{
            console.log('error got',err);
          })
        }
    },[token])
    const [isFirstTime, setFirstTime] = useState(false);

    useEffect(()=>{
        if(!isFirstTime ){
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
            setFirstTime(true);
        }
    })

   

    const [jsonData,setJsonData] = useState(null);
        
    if(jsonData === null)
        return <div>
                <img src = {recipeDBLogo} className = "recipeDBLogo"></img>
                <br></br>
                <div className = "marginForSpinner">
                    <ColorRing
                    colors={['#309D66','#309D66','#309D66','#309D66','#309D66']}
                    height="200"
                    width="200"
                    />
                </div>
            
            </div>
    else   
        return (
            <div>
                <img src = {recipeDBLogo} className = "recipeDBLogo"></img>
                <h1 className='header'> Voice Assistant for RecipeDB</h1>
                <br/>
                <br/>
                <BasicTable jsonData = {jsonData} ></BasicTable>
            </div>
        );

    
}

export default RecipeList;