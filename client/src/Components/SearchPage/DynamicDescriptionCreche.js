import React from "react";
import { CrecheSliderdata} from '../../data';
import { useLocation } from 'react-router-dom';
import DetailsCreche from "./DetailsCreche/DetailsCreche";



const DynamicDescriptionCreche= () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    const searchDatam = JSON.parse(localStorage.getItem('searchDatam'));


    const filteredItems1 = searchData?.filter(item => item.nomCreche === name);
    const filteredItems2 = searchDatam?.filter(item => item.nomCreche === name);
    let filteredItems
    if(!(typeof filteredItems1 === 'undefined' || filteredItems1?.length ===0)){
      console.log(filteredItems1)
      

       filteredItems = filteredItems1
    }else{
      console.log(filteredItems2)

       filteredItems = filteredItems2
    }


  
    return (
      <div>
       
        { filteredItems?.map(item => (
         <DetailsCreche id={item._id} Idproprio={item.Proprietaire} name={item.nomCreche} proprio={item.nomProprietaire} image={CrecheSliderdata[0].image} adr={item.adrCreche} TypeEtab={item.typeEtablissement} TypeAcc={item.typeAccueil} Peda={item.pedagogie} MinAge={item.ageMin} MaxAge={item.ageMax} Capacite={item.capacite} PlaceDispo={item.placesDispo} 
         hsam1={item.agenda['Samedi']?.start} hsam2={item.agenda['Samedi']?.end}
         hdim1={item.agenda['Dimanche']?.start} hdim2={item.agenda['Dimanche']?.end}
         hlun1={item.agenda['Lundi']?.start} hlun2={item.agenda['Lundi']?.end}
         hmar1={item.agenda['Mardi']?.start} hmar2={item.agenda['Mardi']?.end}
         hmer1={item.agenda['Mercredi']?.start} hmer2={item.agenda['Mercredi']?.end}
         hjeu1={item.agenda['Jeudi']?.start} hjeu2={item.agenda['Jeudi']?.end}
         hven1={item.agenda['Vendredi']?.start} hven2={item.agenda['Vendredi']?.end} 
         Email={item.email} Tel={item.tel} serviesUp={item.serviesUp}
         Paiement={item.tarifs} Description={item.description}
         Avis={item?.Avis} Url={item?.url} 
         Note={item.NoteEvaluationTotal}/>
        
        ))}
   </div>
    );
  };
  
 export default DynamicDescriptionCreche;