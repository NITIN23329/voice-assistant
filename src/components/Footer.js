import React, { Component, useEffect, useState }  from 'react';
import './Footer.css';
const  Footer = (props) =>{
    return (
        <div className='footerStyle'>
            <p><img alt="" src="https://cosylab.iiitd.edu.in/recipedb/static/iiitd.png"/></p>
            <p>Copyright © 2022 &nbsp; All rights reserved.
                <br></br>
                <a  href="http://creativecommons.org/licenses/by-nc-sa/3.0/">
                    <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png"/>
                </a>
                <br/>
                This work is licensed under a {" "}
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/" style={{ fontWeight: 'bold' ,color:'white'}}>
                    Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
                </a>.
            </p>
            <p >All material on this website is a product of research and is provided for your information only and may not be construed as medical advice or instruction. <br/> No action or inaction should be taken based solely on the contents of this information; instead, readers should consult appropriate health professionals on any matter relating to their health and well-being.</p>

            <p><a style={{ color:'white'}} href="https://iiitd.ac.in/" target="_blank"><strong>Indraprastha Institute of Information Technology Delhi (IIIT-Delhi)</strong></a> | <a style={{ color:'white'}} href="https://cosylab.iiitd.edu.in/" target="_blank">Prof. Ganesh Bagler</a></p>
            <p ><a target="_blank" href="https://www.facebook.com/ganesh.bagler"></a>
            <a target="_blank" href="https://twitter.com/gansbags" ></a>
            <a target="_blank" href="https://www.linkedin.com/in/ganeshbagler"></a>
            </p>

    </div>
    );
}

export default Footer;