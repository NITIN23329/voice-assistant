import React, { Component, useEffect, useState }  from 'react';
import './RecipeList.css';
import { BasicTable } from './../components/BasicTable';

const RecipeList = (props)  => {
    const recipeDBLogo = props.recipeDBLogoLink;
    const jsonData = JSON.parse(localStorage.getItem('RecipeListData')).data;
    localStorage.removeItem('RecipeListData');
    console.log('data got: in RecipeList',jsonData)
        
    if(jsonData === null)
        return <h> Zero Recipies Found</h>
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