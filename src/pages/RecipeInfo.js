import React, { Component, useEffect, useState }  from 'react';
import {useParams} from "react-router-dom"
import axios from 'axios'
import {  ColorRing } from 'react-loader-spinner'
const RecipeList = (props)  => {
    const {recipe_id} = useParams();
    const recipeDBLogo = props.recipeDBLogoLink;
    const [recipeInfo, setRecipeInfo] = useState(null)

    useEffect(()=>{
            axios({
                method :"GET",
                url : 'https://cosylab.iiitd.edu.in/recipedb/search_recipeInfo/4542/'+recipe_id,
                
              }).then(res=>{

                setRecipeInfo(res.data);
          }).catch(err=>{
            console.log('error got',err);
          })
    },[])
    if(recipeInfo === null)
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
            <p>{recipeInfo}</p>
        </div>
    );
}
export default RecipeList;