import React from "react";
import { CrecheSliderdata } from "../../../../data";


import SearchCard from "./SearchCard";


 const Creches = (props) => { 
   
  const datacamp = props.datas?.map((data) => {
   
    return (
      
        <SearchCard  name={data.nomCreche} Commune={data.commune} Wilaya={data.wilaya}  TypeEtab={data.typeEtablissement} Paiement={data.tarifs}    image={CrecheSliderdata[0].image}  />
      
    )
  }) 

  
      return ( 
      <div className="w-full grid ">
             {datacamp}
      </div>
            

          );
        };

 export default Creches;