import {React,useState,useEffect}  from "react";
import {EnfantUserx} from '../../../data';
import EnfantCard from './Enfantcard';


const Enfants = () => { 
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
      <EnfantCard key={data.key} nom={data.nom} prenom={data.prenom} sexe={data.sexe} age={data.age} _id={data._id}  />
    )
  }) 

  
      return ( 
      <div className="w-full grid xs:grid-cols-2 ">
             {datacamp}
      </div>
            

          );
        };

 export default Enfants;