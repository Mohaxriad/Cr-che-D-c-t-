import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/Compte/Inscription/Formulaire/SignUp';

import PageAuthentification from './Components/Compte/Inscription/Authentification/PageAuthentification';
import PageLogin from './Components/Compte/Connexion/PageLogin';
import PageChoice from './Components/Compte/TypeUtilisateur/PageChoice';
import Menu from './Components/UTILISATION/PagesProprio/Menu'
import Menu2 from './Components/UTILISATION/PagesParent/Menu2';
import Home from './Components/HomePage/Home';
import Search from './Components/SearchPage/Recherche/Search';
import DetailsCreche from './Components/SearchPage/DetailsCreche/DetailsCreche';
import MesEnfants from './Components/UTILISATION/Enfants/MesEnfants';
import MesCreches from './Components/UTILISATION/PagesProprio/MesCreches/MesCreches';
import MonProfil from './Components/UTILISATION/Profil/MonProfil';
import PageReservation from './Components/Demande/Reservation/PageReservation';
import AjoutCreche from './Components/UTILISATION/PagesProprio/AjoutCreche/AjoutCreche';
import DynamicDescriptionCreche from './Components/SearchPage/DynamicDescriptionCreche'
import AjoutEnfant from './Components/UTILISATION/Enfants/AjoutEnfant/AjoutEnfant';
import DynamicDescriptionMesCreches from './Components/UTILISATION/PagesProprio/MesCreches/DetailsMesCreches/DynamicDescriptionMesCreches';
import DynamicDescriptionCrecheRDV from './Components/Demande/Prise RDV/DynamicDescriptionCrecheRDV';
import DynamicDescriptionCrecheReservation from './Components/Demande/Reservation/DynamicDescriptionCrecheReservation';
import SearchResults from './Components/SearchPage/Recherche/SearchResults/SearchResults';
import ForgotPassword from './Components/Compte/Connexion/ForgotPassword';
import MailSent from './Components/Compte/Connexion/MailSent';
import MesNotifs from './Components/UTILISATION/Notifications/MesNotifs';
import AboutUs from './Components/AboutUs/AboutUs';
import RdvProprio from './Components/UTILISATION/PagesProprio/RdvProprio';
import RdvParent from './Components/UTILISATION/PagesParent/RdvParent';
import ReservationProprio from './Components/UTILISATION/PagesProprio/ReservationProprio';
import DeleteConfirmation from './Components/Functions/DeleteConfirmation';
import ReservationParent from './Components/UTILISATION/PagesParent/ReservationParent';
import SignUpSuccess from './Components/Functions/Success/SignUpSuccess';
import LoginSuccess from './Components/Functions/Success/LoginSuccess';
import AjoutCrecheSuccess from './Components/Functions/Success/AjoutCrecheSuccess';
import AjoutEnfantSuccess from './Components/Functions/Success/AjoutEnfantSuccess';
import Section5Prime from './Components/AboutUs/Section5Prime';
import AjoutCommentaireSuccess from './Components/Functions/Success/AjoutCommentaireSuccess';
import AboutUsPrime from './Components/AboutUs/AboutUsPrime';
import AjoutCommentaireCrecheSuccess from './Components/Functions/Success/AjoutCommentaireCrecheSuccess';
import LogOut from './Components/Functions/LogOut';
import Unauthorized from './Components/Unauthorized';
import RequireAuth from './Components/RequireAuth';
import RequirenotAuth from './Components/RequirenotAuth';
import SiteStats from './Components/AAdmin/components/Statistiques';
import StatsAvis from './Components/AAdmin/components/avis';
import StatsCreches from './Components/AAdmin/components/creches';
import StatsEnfants from './Components/AAdmin/components/enfants';
import StatsUsers from './Components/AAdmin/components/users';

//admin
// import AdminHome from './Components/Aadmin/Statistiques'
// import AdminAvis from './Components/Aadmin/avis'
// import AdminCreches from './Components/Aadmin/creches'
// import AdminEnfants from './Components/Aadmin/enfants'
// import AdminUsers from './Components/Aadmin/users'



// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const PROP = 'proprietaire'
const PARENT = 'parent'
const ADMIN = 'admin'

function App() {
  return (

    <>
    <Routes>
      
    <Route path='/Unauthorized' element={<Unauthorized />} />

    <Route element={<RequirenotAuth  />} >
    <Route path="/Login" element={<PageLogin/>} />
    <Route path="/SignUp" element={<SignUp />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[PROP, PARENT, ADMIN]} />} >
      <Route path="/MenuParent" element={<Menu2 />} />
      <Route path='/MesEnfants' element={<MesEnfants/>}></Route>
      <Route path='/MonProfil'  element={<MonProfil/>}/>
      <Route path='/AjoutEnfant' element={<AjoutEnfant/>}/>
      <Route path='/AddEnfantSuccess' element={<AjoutEnfantSuccess/>}/>
      <Route path='/LogOut' element={<LogOut/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={[PROP,ADMIN]} />} >
      <Route path="/MenuProprio" element={<Menu />} />
      <Route path='/MesCreches' element={<MesCreches/>}></Route>
      <Route path='/AjoutCreche' element={<AjoutCreche/>}></Route>
      <Route path='/AddCrecheSuccess' element={<AjoutCrecheSuccess/>}/>
      <Route path="/DescriptionMesCreches" element={<DynamicDescriptionMesCreches/>}></Route>
      </Route>
         
      <Route path='/SignUpSuccess' element={<SignUpSuccess/>}/>
      <Route path='/LoginSuccess' element={<LoginSuccess/>}/>
      <Route path='/' element={<Home />} />
      <Route path='/AboutUs' element={<AboutUs/>}/>
      <Route path='/Nous' element={<AboutUsPrime/>}/>


      <Route path="/Search" element={< Search />} />
      <Route path="/DescriptionCreche" element={<DynamicDescriptionCreche/>}></Route>
      <Route path='/Reservation'  element={<PageReservation/>}/>
      <Route path='/DescriptionCrecheRDV' element={<DynamicDescriptionCrecheRDV/>}/>
      <Route path='/DescriptionCrecheReservation' element={<DynamicDescriptionCrecheReservation/>}/>
      <Route path="/SearchResults" element={<SearchResults/>}/>
      <Route path='/MesNotifs' element={<MesNotifs/>} />
      <Route path='/RdvProprio' element={<RdvProprio/>} />
      <Route path='/RdvParent' element={<RdvParent/>} />
      <Route path='/ReservationProprio' element={<ReservationProprio/>} />
      <Route path='/ReservationParent' element={<ReservationParent/>} />
      <Route path='/sup' element={<DeleteConfirmation/>} />
      <Route path='/AddCommentSuccess' element={<AjoutCommentaireSuccess/>}/>
      <Route path='/AddCommentCrecheSuccess' element={<AjoutCommentaireCrecheSuccess/>}/>



       {/*  <Route path="/Authentification" element={<PageAuthentification />} />
     <Route path="/Choice" element={<PageChoice />} />         
       <Route path='/ForgotPassword' element={<ForgotPassword/>} />
      <Route path='/MailSent' element={<MailSent/>} />
       */}
      {/* admin */}
      <Route element={<RequireAuth allowedRoles={[ADMIN]} />} >
        <Route path='/StatsUser' element={<StatsUsers/>}/>
        <Route path='/StatsCreches' element={<StatsCreches/>}/>
        <Route path='/StatsEnfants' element={<StatsEnfants/>}/>
        <Route path='/StatsComments' element={<StatsAvis/>}/>
        <Route path='/HomeAdmin' element={<SiteStats/>}/>
      </Route>

    

      {/* admin */}
      {/* <Route path='/HomeAdmin' element={<AdminHome/>}/>
      <Route path='/UserStats' element={<AdminUsers/>}/>
      <Route path='/CrecheStats' element={<AdminCreches/>}/>
      <Route path='/EnfantStats' element={<AdminEnfants/>}/>

      <Route path='/CommentStats' element={<AdminAvis/>}/> */}
     
    </Routes>
      


       </>
  );
}

export default App;
