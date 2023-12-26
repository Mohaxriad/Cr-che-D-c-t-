import React from "react";
import { CrecheSliderdata} from '../../../data';
import { useLocation } from 'react-router-dom';
import DetailsCreche from "./PageRdv";



const DynamicDescriptionCrecheRDV= () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const creches1 = JSON.parse(localStorage.getItem('searchData'));
  const creches2 = JSON.parse(localStorage.getItem('searchData'));

  const filteredItems = creches1?.filter(item => item.nomCreche === name);

  return (
    <div>
     
      { filteredItems.map(item => (
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
 export default DynamicDescriptionCrecheRDV;