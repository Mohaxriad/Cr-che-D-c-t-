import { useState } from "react";
import Stepper from "../GestionDesSteps/Stepper";
import StepperControl from "../GestionDesSteps/StepperControl";
import { UseContextProvider } from "../GestionDesSteps/StepperContext";
import Step2CreationCompte from "../steps/Step2CreationCompte";
import Step3PriseRDV  from "../steps/Step3PriseRDV";
import Step1Connexion from "../../Reservation/steps/Step1Connexion";
import Step4Final from "../steps/Step4Final";
import Authentification from "../../../Compte/Inscription/Authentification/Authentification";

import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import { useEffect } from "react";
const LOGIN_URL = '/auth';
const SIGNUP_URL = 'auth/signup'
const PASSWORDVALID = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const EMAILVALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMVALID = /^0\d{9}$/;
const CODEPOSTVALID = /^\d{5}$/;

function NewAccRDV(props) {
  const user = localStorage.getItem('user');
  const refresh = useRefreshToken();
  const [currentStep, setCurrentStep] = useState(user? 3:1);
  const [lastStep, setLastStep] = useState(1);
  const [connexionData, setConnexionData] = useState({});
  const [inscriptionData, setInscriptionData] = useState('');
  const [RdvData, setRdvData] = useState({});

  const [Num,setNum] = useState(0)
  const [count, setCount] = useState(0);
  const {setAuth} = useAuth();

  const steps = [
    "1",
    "2",
    "RDV",
    "Fin"
  ];

  const PassToSignIn = () => {
    setCurrentStep(2);
  };

  const handleConnexionData = (key,value) => {
    setConnexionData({...connexionData,[key]:value});
  };


  const handleInscriptionData = (key,value) => {
    setInscriptionData({...inscriptionData,[key]:value});
  };
  const handleRdvData = (key,value) => {
    setRdvData({...RdvData,[key]:value});
  };

  useEffect(()=>{
    console.log(inscriptionData)
  },[inscriptionData])

  useEffect(()=>{
    console.log(connexionData)
  },[connexionData])

  
  useEffect(()=>{
    console.log(RdvData)
  },[RdvData])


  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <div className="mx-3 "><Step2CreationCompte  onDataChange={handleInscriptionData} pass={PassToSignIn} /></div>;

      
      case 2:
        return <div className=""><Step1Connexion onDataChange={handleConnexionData} /></div>;


  
      case 3:
        return <div className="mx-3 "><Step3PriseRDV onDataChange={handleRdvData}  /></div>;
      
        case 4:
        return <div className=" "><Step4Final /></div>;
      default:
    }
  };



  const handleConnexionSubmit = async (e) => {
    // e.preventDefault();
     try{
       const response = await axios.post (LOGIN_URL ,
     JSON.stringify({email:connexionData.email,password:connexionData.password}),
     {
       headers: {'Content-Type':'application/json'},
       withCredentials:true 
     }    
       );
       //console.log(JSON.stringify(response?.data) );
       
    
     
      
       const {accessToken} = response?.data;
       const {user} = response?.data;
      
       setAuth({user,accessToken})
       localStorage.setItem('user', JSON.stringify({ user,accessToken }));
 
       
 
     }catch (err){
       if (!err?.response) {
         console.log('No Server Response');
     } else if (err.response?.status === 400) {
         console.log('Missing E-mail or Password');
     } else if (err.response?.status === 401) {
         console.log('Unauthorized');
     } else if (err.response?.status===409) { 
        console.log('Email taken');
     } else {
         console.log('Login Failed');
     }
    // errRef.current.focus();
   }
   
     }
 
 
   
 const handleInscriptionSubmit = async () => {
 //  e.preventDefault();
   // if button enabled with JS hack
   
   const v1 = EMAILVALID.test(inscriptionData.email);
   const v2 = PASSWORDVALID.test(inscriptionData.password);
   const v3 = inscriptionData.password === inscriptionData.matchPwd ;
   const v4 = CODEPOSTVALID.test(inscriptionData.codePostal);
   const v5 = NUMVALID.test(inscriptionData.NumTele);
   if (!v1 || !v2 || !v3 || !v4 || !v5) {
       console.log("Entrée invalide");
       return;
   } 
   
  
 
   try {
     const response = await axios.post(SIGNUP_URL,
         JSON.stringify({
           username:inscriptionData.username,
            email:inscriptionData.email, 
            password:inscriptionData.password ,
            nom:inscriptionData.nom ,
            prenom : inscriptionData.prenom,
            adresse:inscriptionData.adresse,
            telephone:inscriptionData.NumTele,
            wilaya:inscriptionData.wilaya,
            commune:inscriptionData.commune,
            codePostal:inscriptionData.codePostal,
            sexe:inscriptionData.sexe,
            role:inscriptionData.role }),
         {
             headers: { 'Content-Type': 'application/json' },
             withCredentials: true
         }
     );
    /* console.log(response?.data);
     console.log(response?.accessToken);
     console.log(JSON.stringify(response))
     setSuccess(true);
     //clear state and controlled inputs
     //need value attrib on inputs for this
     setEmail('');
     setUsername('');
     setPassword('');
     setNom('');
     setPrenom('');
     setAdresse('');
     setTelephone('');
     setCodePostal('');*/
     
 } catch (err) {
     if (!err?.response) {
         console.log('No Server Response');
     } else if (err.response?.status === 409) {
         console.log('Email Taken');
     } else {
         console.log('Registration Failed')
         console.log(err)
     }
    // errRef.current.focus();
 }
 
 
 
 }


 const handleRdvSubmit = async (e) => {
  // e.preventDefault();
   try{
    const newAccessToken = await refresh();
     const response = await axios.post ('../rdv/create' ,
   JSON.stringify({heure:RdvData.heure,date:RdvData.date,Creche:props.id,proprietaire:props.proprio}),
   {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccessToken}`,
    },
    
    withCredentials: true,
   }) 
       
     ;
     //console.log(JSON.stringify(response?.data) );
     
  
   
    
     

   }catch (err){
   console.log(err)
  // errRef.current.focus();
 }
 
   }

 const handleClick = (direction) => {
  let newStep = currentStep;

  if(direction === "next"){
    if(currentStep === 1){
      handleInscriptionSubmit()
      .then(()=>{

      newStep+=1;
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

      return
      }
      )
      
      
    }

    if(currentStep === 2){
      handleConnexionSubmit()
      .then(()=>{
      const user = localStorage.getItem('user');
      if(user){
      newStep++;
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
      }
      return
      })
    }



    if(currentStep === 3){
    
        handleRdvSubmit()
        .then(()=>{
        newStep+=1;
        setLastStep(1)
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    
      return
    })
    }
    


  }else{
    newStep-=lastStep;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

  }

  
};

 

  return (
    <>
   
      <div className=" rounded-2xl ring ring-[#f54b4b] bg-white pb-2    ">
        {/* Stepper */}
        <div className=" mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="  my-1 py-5  ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <div className=" ">
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
          </div>
        )}
      </div>
    
      </>
  );
}

export default NewAccRDV;