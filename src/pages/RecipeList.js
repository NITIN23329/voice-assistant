import React, { Component, useEffect, useState }  from 'react';
import './RecipeList.css';
import { BasicTable } from './../components/BasicTable';
import axios from 'axios'
import {  ColorRing } from 'react-loader-spinner'
import Header from '../components/Header';
import Footer from '../components/Footer';
const RecipeList = (props)  => {

    const [isFirstTime, setFirstTime] = useState(false);
    const userTranscript = localStorage.getItem('userTranscript')

    useEffect(()=>{
        if(!isFirstTime ){
            axios({
                method :"GET",
                url : `http://127.0.0.1:5000/helloworld/` + userTranscript
                
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
    const response = jsonData === null?
    (
        <div className = "marginForSpinner">
            <ColorRing
            colors={['#309D66','#309D66','#309D66','#309D66','#309D66']}
            />
        </div>
    ):
    ( <BasicTable jsonData = {jsonData} ></BasicTable>)

    return (<div>
              <Header></Header>
                {response}
                <Footer></Footer>
        
        </div>
        )
    
}

export default RecipeList;