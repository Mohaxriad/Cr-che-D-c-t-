import React from "react";
import {CrecheUserx} from '../../../../data';

import CrecheCard from "./CrecheCard";
import { useState, useEffect } from "react";


 const Creches = () => { 
  const [creches , setCreches] = useState([]);
  let storeUser ;
  useEffect(() => {
    storeUser = JSON.parse(localStorage.getItem('user'));

    if (storeUser !== null) {
        setCreches(storeUser.user.liste_creches);
       
    }
  }
    ,[])


  const datacamp = creches.map((data) => {
   
    return (
      
      <CrecheCard  name={data.nomCreche} Commune={data.commune} Wilaya={data.wilaya} Description={data.description} _id={data._id}  />
      
    )
  }) 

  
      return ( 
      <div className="w-full grid xs:grid-cols-2 ">
             {datacamp}
      </div>
            

          );
        };

 export default Creches;