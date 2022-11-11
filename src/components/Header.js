import React, { Component, useEffect, useState }  from 'react';
import './Header.css';


const  Header = (props) =>{

    const handleCoSyClick =()=>{
        window.open('https://cosylab.iiitd.edu.in/')
    }
    const handleHomeClick =()=>{
        window.open('/')
    }
    const handleContactClick =()=>{
        window.open('/contact')
    }

    return (
    <nav className='headerStyles'>
       
        <ul>
            <img src = {require('./RecipeDBLogo.png')} ></img>
            <p>RecipeDB </p>
            <li><div  onClick={handleCoSyClick}>CoSyLab</div></li>
            <li><div  onClick = {handleContactClick}>Contact</div></li>
            <li><div  onClick={handleHomeClick}>Home</div></li>
            
            
        </ul>
    </nav>
    );
}

export default Header;