import {React , useState , useEffect} from "react";
import { CrecheSliderdata} from '../../../../../data';
import { useLocation } from 'react-router-dom';
import DetailsCreche from "./DetailsMesCreches";



const DynamicDescriptionMesCreches= () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const _id = params.get('_id');

    
    const [creches , setCreches] = useState([]);
    let storeUser ;
    useEffect(() => {
      storeUser = JSON.parse(localStorage.getItem('user'));
  
      if (storeUser !== null) {
          setCreches(storeUser.user.liste_creches);
         
      }
    }
      ,[])
  
    const filteredItems = creches.filter(item => item._id === _id);
  
    return (
      <div>
       
        { filteredItems.map(item => (
         <DetailsCreche  
         name={item.nomCreche} proprio={item.nomProprietaire} image={item.Images} adr={item.adrCreche} 
         TypeEtab={item.typeEtablissement} TypeAcc={item.typeAccueil} Peda={item.pedagogie} 
         MinAge={item.ageMin} MaxAge={item.ageMax} Capacite={item.capacite} PlaceDispo={item.placesDispo} 
         hsam1={item.agenda.Samedi.start} hsam2={item.agenda.Samedi.end}
         hdim1={item.agenda.Dimanche.start} hdim2={item.agenda.Dimanche.end}
         hlun1={item.agenda.Lundi.start} hlun2={item.agenda.Lundi.end}
         hmar1={item.agenda.Mardi.start} hmar2={item.agenda.Mardi.end}
         hmer1={item.agenda.Mercredi.start} hmer2={item.agenda.Mercredi.end}
         hjeu1={item.agenda.Jeudi.start} hjeu2={item.agenda.Jeudi.end}
         hven1={item.agenda.Vendredi.start} hven2={item.agenda.Vendredi.end} 
         Email={item.email} Tel={item.tel}
         Paiement={item.tarifs} Description={item.description}
         services={item.serviesUp}
         Avis={[]} Url={item.url} location={item.location} />
         
        ))}
   </div>
    );
  };
  
 export default DynamicDescriptionMesCreches;