import React , {useEffect,useState,useRef}  from "react";
import {EnfantUserx} from '../../../data';
import EnfantSelectCard from "./EnfantSelectCard";


const EnfantsSelect = ({onEnfantSelected}) => { 
  const [enfants , setEnfants] = useState([]);
  let storeUser ;
  useEffect(() => {
    storeUser = JSON.parse(localStorage.getItem('user'));

    if (storeUser !== null) {
        setEnfants(storeUser.user.Enfant);
       
    }
  }
    ,[])

  const datacamp= enfants.map((data) => {

    return (
      <EnfantSelectCard onEnfantSelected={onEnfantSelected} key={data.key} nom={data.nom} prenom={data.prenom} sexe={data.sexe} age={data.age} _id={data._id} />
    )
  }) 

  
      return ( 
      <div className="w-full grid xs:grid-cols-2 ">
             {datacamp}
      </div>
            

          );
        };

 export default EnfantsSelect;