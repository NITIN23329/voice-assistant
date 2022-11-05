import React, { Component, useEffect, useState }  from 'react';
import {useParams} from "react-router-dom"
import axios from 'axios'
import {  ColorRing } from 'react-loader-spinner'
import './RecipeInfo.css';
const RecipeList = (props)  => {
    const {recipe_id} = useParams();
    const recipeDBLogo = props.recipeDBLogoLink;
    const [instructionInfo, setInstructionInfo] = useState(null);
    const [recipeInfo, setRecipeInfo] = useState(null)
    const [ingridientInfo,setIngridientInfo] = useState(null);


    useEffect(()=>{
            axios({
                method :"GET",
                url : `http://127.0.0.1:5000/api/recipeDB/getingredientsbyrecipe/` + recipe_id
                
              }).then(res=>{
                console.log('data by geting',res.data);
                var lst = []
                var cnt = 1;
                Object.keys(res.data).forEach(function(key) {
                   lst.push({"id":cnt,"name":res.data[key]['ingredient_Phrase']+"."})
                   cnt+=1;
                  });
                setIngridientInfo(lst);
                // console.log(lst)
          }).catch(err=>{
            console.log('error got while getting indridents',err);
          })
    },[recipe_id])

    useEffect(()=>{
        axios({
            method :"GET",
            url : `http://127.0.0.1:5000/api/recipeDB/recipeInfo/` + recipe_id
            
          }).then(res=>{
            console.log('data by recipeInfo',res.data);
            setRecipeInfo(res.data);
      }).catch(err=>{
        console.log('error got while getting recipeInfo',err);
      })
  },[recipe_id])

  useEffect(()=>{
    axios({
        method :"GET",
        url : `http://127.0.0.1:5000/api/recipeDB/instructions/` + recipe_id
        
      }).then(res=>{
       
        var lst = []
        var cnt = 1;
        res.data.forEach((ele)=> {
           lst.push({"id":cnt,"name":ele})
           cnt+=1;
          });
        setInstructionInfo(lst);
        console.log('data by instuction',lst);

  }).catch(err=>{
    console.log('error got while getting instuctions',err);
  })
},[recipe_id])



    if(ingridientInfo === null || recipeInfo === null || instructionInfo === null)
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

            <h2 className='recipeName'> {recipeInfo.recipe_title}</h2>
            <div className='recipeInfo'>
                <img src = {recipeInfo.img_url} className='recipeImage'></img>
                <div className='recipeLocation'>
                    <p className='cuisine'>Cuisine: </p>
                    <p>{recipeInfo.continent}{" >> "}{recipeInfo.region}{" >> "}{recipeInfo.sub_region}</p>
                </div>
               
                
            </div>

            <h2 className='header2'>Ingredients Used:</h2>
            <div>
                {   
                    ingridientInfo.map((data)=>(
                        <p 
                            className='ingridient'> {data.id}{".  "} 
                            <span>&nbsp;</span>{
                            data.name}
                        </p>
                    ))
                    
                }
            </div>
            <h2 className='header2'>Cooking Instructions:</h2>
            <div>

                {
                    instructionInfo.map((data)=>(
                        <p 
                            className='ingridient'> {data.id}{".  "} 
                            <span>&nbsp;</span>{
                            data.name}
                        </p>
                    ))
                }
            </div>

        </div>
    );
}
export default RecipeList;