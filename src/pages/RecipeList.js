import React, { Component, useEffect, useState }  from 'react';
import './RecipeList.css';
import { BasicTable } from './../components/BasicTable';
import axios from 'axios'
import { Audio, Circles, ColorRing, InfinitySpin, ProgressBar, RevolvingDot, Rings, ThreeCircles } from 'react-loader-spinner'
const RecipeList = (props)  => {
    const recipeDBLogo = props.recipeDBLogoLink;

    const [isFirstTime, setFirstTime] = useState(false);

    useEffect(()=>{
        if(!isFirstTime ){
            axios({
                method :"GET",
                url : `https://cosylab.iiitd.edu.in/api/recipeDB/searchrecipe?country=Indian`,
                url : `http://127.0.0.1:5001/helloworld/india`
                
              }).then(res=>{
            console.log('data got',res.data);
            setJsonData(res.data);
          }).catch(err=>{
            console.log('error got',err);
          })
            setFirstTime(true);
        }
    },[])

   

    const [jsonData,setJsonData] = useState(null);
        
    if(jsonData === null)
        return <div>
                <img src = {recipeDBLogo} className = "recipeDBLogo"></img>
                <h1 className='header1'> Voice Assistant for RecipeDB</h1>
                <br></br>
                <div className = "marginForSpinner">
                    <ColorRing
                    colors={['#309D66','#309D66','#309D66','#309D66','#309D66']}
                    />
                </div>
            
            </div>
    else   
        return (
            <div>
                <img src = {recipeDBLogo} className = "recipeDBLogo"></img>
                <h1 className='header1'> Voice Assistant for RecipeDB</h1>
                <br/>
                <BasicTable jsonData = {jsonData} ></BasicTable>
            </div>
        );

    
}

export default RecipeList;