import { useStepperContext } from "../GestionDesSteps/StepperContext";
import Choice from "../../../Compte/TypeUtilisateur/Choice";
//  
import Select from "react-select";

import React from "react";

import { useState, useEffect, useRef } from "react";
import { Communes } from "../../../../data";



const PASSWORDVALID = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const EMAILVALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMVALID = /^0\d{9}$/;
const CODEPOSTVALID = /^\d{5}$/;



export default function Step2CreationCompte({onDataChange,pass}) {


  const wilayaoptions = [
    {name:"wilaya",value: "Aucun" ,label: "Aucun" },
    {name:"wilaya",value: "Adrar" ,label: "1-Adrar" },
    {name:"wilaya",value: "Chlef" ,label: "2-Chlef" },
    {name:"wilaya",value: "Laghouat" ,label: "3-Laghouat" },
    {name:"wilaya",value: "Oum El Bouaghi" ,label: "4-Oum El Bouaghi" },
    {name:"wilaya",value: "Batna" ,label: "5-Batna" },
    {name:"wilaya",value: "Bejaia" ,label: "6-Bejaia" },
    {name:"wilaya",value: "Beskra" ,label: "7-Beskra" },
    {name:"wilaya",value: "Bechar" ,label: "8-Bechar" },
    {name:"wilaya",value:  "Blida" , label: "9-Blida" },
    {name:"wilaya",value:  "Bouira" , label: "10-Bouira" },
    {name:"wilaya",value:  "Tamanrasset" , label: "11-Tamanrasset" },
    {name:"wilaya",value:  "Tebessa" , label: "12-Tebessa" },
    {name:"wilaya",value:  "Telemcen" , label: "13-Telemcen" },
    {name:"wilaya",value:  "Tiaret" , label: "14-Tiaret" },
    {name:"wilaya",value:  "Tizi-ouzou" , label: "15-Tizi-ouzou" },
    {name:"wilaya",value:  "Alger" , label: "16-Alger" },
    {name:"wilaya",value:  "Djelfa" , label: "17-Djelfa" },
    {name:"wilaya",value:  "Jijel" , label: "18-Jijel" },
    {name:"wilaya",value:  "Setif" , label: "19-Setif" },
    {name:"wilaya",value:  "Saida" , label: "20-Saida" },
    {name:"wilaya",value:  "Skikda" , label: "21-Skikda" },
    {name:"wilaya",value:  "Sidi Bel Abbes" , label: "22-Sidi Bel Abbes" },
    {name:"wilaya",value:  "Annaba" , label: "23-Annaba" },
    {name:"wilaya",value:  "Guelma" , label: "24-Guelma" },
    {name:"wilaya",value:  "Constantine" , label: "25-Constantine" },
    {name:"wilaya",value:  "Médéa" , label: "26-Médéa" },
    {name:"wilaya",value:  "Mostaganem" , label: "27-Mostaganem" },
    {name:"wilaya",value:  "M'Sila" , label: "28-M'Sila" },
    {name:"wilaya",value:  "Mascara" , label: "29-Mascara" },
    {name:"wilaya",value:  "Ouargla" , label: "30-Ouargla" },
    {name:"wilaya",value:  "Oran" , label: "31-Oran" },
    {name:"wilaya",value:  "El Bayadh" , label: "32-El Bayadh" },
    {name:"wilaya",value:  "Illizi" , label: "33-Illizi" },
    {name:"wilaya",value:  "Bordj Bou Arreridj" , label: "34-Bordj Bou Arreridj" },
    {name:"wilaya",value:  "Boumerdès" , label: "35-Boumerdès" },
    {name:"wilaya",value:  "El Tarf" , label: "36-El Tarf" },
    {name:"wilaya",value:  "Tindouf" , label: "37-Tindouf" },
    {name:"wilaya",value:  "Tissemsilt" , label: "38-Tissemsilt" },
    {name:"wilaya",value:  "El Oued" , label: "39-El Oued" },
    {name:"wilaya",value:  "Khenchela" , label: "40-Khenchela" },
    {name:"wilaya",value:  "Souk Ahras" , label: "41-Souk Ahras" },
    {name:"wilaya",value:  "Tipaza" , label: "42-Tipaza" },
    {name:"wilaya",value:  "Mila" , label: "43-Mila" },
    {name:"wilaya",value:  "Aïn Defla" , label: "44-Aïn Defla" },
    {name:"wilaya",value:  "Naâma" , label: "45-Naâma" },
    {name:"wilaya",value:  "Aïn Témouchent" , label: "46-Aïn Témouchent" },
    {name:"wilaya",value:  "Ghardaïa" , label: "47-Ghardaïa" },
    {name:"wilaya",value:  "Relizane" , label: "48-Relizane" },
    {name:"wilaya",value:  "Timimoun" , label: "49-Timimoun" },
    {name:"wilaya",value:  "Bordj Badji Mokhtar" , label: "50-Bordj Badji Mokhtar" },
    {name:"wilaya",value:  "Ouled Djellal" , label: "51-Ouled Djellal" },
    {name:"wilaya",value:  "Béni Abbès" , label: "52-Béni Abbès" },
    {name:"wilaya",value:  "In Salah" , label: "53-In Salah" },
    {name:"wilaya",value:  "In Guezzam" , label: "54-In Guezzam" },
    {name:"wilaya",value:  "Touggourt" , label: "55-Touggourt" },
    {name:"wilaya",value:  "Djanet" , label: "56-Djanet" },
    {name:"wilaya",value:  "El M'Ghair" , label: "57-El M'Ghair" },
    {name:"wilaya",value:  "El Meniaa " , label: "58-El Meniaa " },
  ]
  


  const roleoptions = [
    { name :'role',value: 'parent' , label : 'parent' },
    { name :'role',value: 'proprietaire', label: 'proprietaire' }
  ]

  const SexeOptions = [
    { name :'sexe',value: "HOMME", label: "HOMME" },
    { name :'sexe',value: "FEMME", label: "FEMME" },

  ];

  const emailRef = useRef();
  const errRef = useRef();

  const [wilaya , setWilaya] = useState('');


  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [telephone, setTelephone] = useState('');
  const [validTelephone, setValidTelephone] = useState(false);
  const [telephoneFocus, setTelephoneFocus] = useState(false);

  const [codePostal, setCodePostal] = useState('');
  const [validCodePostal, setValidCodePostal] = useState(false);
  const [codePostalFocus, setCodePostalFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

 











useEffect(() => {
  setValidEmail(EMAILVALID.test(email));
}, [email])

useEffect(() => {
  setValidTelephone(NUMVALID.test(telephone));
}, [telephone])

useEffect(() => {
  setValidCodePostal(CODEPOSTVALID.test(codePostal));
}, [codePostal])


useEffect(() => {
  setValidPassword(PASSWORDVALID.test(password));
  setValidMatch(password === matchPwd);
}, [password, matchPwd])

useEffect(() => {
  setErrMsg('');
}, [email, telephone ,codePostal , password, matchPwd ])








  return (
    <>
    <div className="mx-5">
      <div className="flex flex-col ">
        <h2 className="text-xl font-semibold">Creez un compte pour pouvoir reserver</h2>
        {/* <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-2 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              MATRICULE
            </label>
          </div>
        </div> */}
        {/* <div className="relative z-0 w-full mb-6 group"> 
        <input
          type="e-mail"
          name="floating_first_name"
          id="floating_first_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
          placeholder=" "
          required />
        <label
          for="floating_first_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          E-mail
        </label>
      </div>*/}
      </div>
      <>
        <div className="grid md:grid-cols-2 md:gap-6 my-3">
          <div className="relative z-0 w-full mb-2 group">
            <input
                onKeyPress={(event) => {
                  if (!/[a-zA-Z]/i.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              type="text"
              name="nom"
              id="nom"
              autoComplete="nom"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{ onDataChange(e.target.name,e.target.value)}}
            />
            <label
              for="nom"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              NOM
            </label>
          </div>
          <div className="relative z-0 w-full mb-2 group">
            <input
              onKeyPress={(event) => {
                if (!/[a-zA-Z]/i.test(event.key)) {
                  event.preventDefault();
                }
              }}
              
              type="text"
              name="prenom"
              id="prenom"
              autoComplete="family-name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-1 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value)}}
            />
            <label
              for="prenom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PRENOM
            </label>
          </div>
        </div>
        
      </>
      <div className="grid md:grid-cols-2 md:gap-6 my-3">
        <div className="relative z-0 w-full mb-2 group">
          <input

            id="username"
            name="username"
            type="text"
           // value={username}
            autoComplete="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            onChange={(e)=>{onDataChange(e.target.name,e.target.value)}}
            />
          <label
           htmlFor="username"
            for="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input

            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            ref={emailRef}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e)=>{setEmail(e.target.value); onDataChange(e.target.name,e.target.value)}}
            />
                               <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                         E-mail non valide.
                     </p>
           
          <label
           htmlFor="email"
            for="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            E-mail
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            value={codePostal }
            id="codePostal"
            name="codePostal"
            type="text"
            autoComplete="codePostal"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            aria-invalid={validCodePostal ? "false" : "true"}
            aria-describedby="codepostnote"
            onFocus={() => setCodePostalFocus(true)}
            onBlur={() => setCodePostalFocus(false)} 
            onChange={(e)=>{setCodePostal(e.target.value); onDataChange(e.target.name,e.target.value)}}
            />
             <p id="codepostnote" className={codePostalFocus && codePostal && !validCodePostal ? "instructions" : "offscreen"}>
                       Code postal doit etre compose de 5 chiffres
                     </p>
          <label
           htmlFor="codePostal"
            for="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Code Postal
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={ telephone }
            type="text"
            name="NumTele"
            id="NumTele"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            aria-invalid={validTelephone ? "false" : "true"}
            aria-describedby="telnote"
            onFocus={() => setTelephoneFocus(true)}
            onBlur={() => setTelephoneFocus(false)}
            onChange={(e)=>{setTelephone(e.target.value); onDataChange(e.target.name,e.target.value)}}
            />
            <p id="telnote" className={telephoneFocus && telephone && !validTelephone ? "instructions" : "offscreen"}>
                       Telephone non valide 
                     </p>
          <label
            for="NumTele"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Numéro de telephone
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
            <input
              onKeyPress={(event) => {
                if (!/[a-zA-Z]/i.test(event.key)) {
                  event.preventDefault();
                }
              }}
              
              type="text"
              name="adresse"
              id="adresse"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-1 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value)}}
            />
            <label
              for="adresse"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adresse
            </label>
          </div>
          <div id="select">
            <Select options={wilayaoptions} placeholder='Wilaya' onChange={(e)=>{setWilaya(e.value);onDataChange(e.name,e.value)}}/>
          </div>
          <div id="select">

          <Select options={((wilaya === null) ||(wilaya === 'Aucun')) ?[{value:"nothing",label:"Choisissez une Wilaya"}]:Communes[wilaya]}
          
          placeholder='Commune' onChange={(e)=>{onDataChange(e.name,e.value)}} />
          </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            // onKeyPress={(event) => {
            //   if (!/[0-9]/.test(event.key)) {
            //     event.preventDefault();
            //   }
            // }}
            type="password"
            name="password"
            id="password"
            value={password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            onChange={(e)=>{setPassword(e.target.value); onDataChange(e.target.name,e.target.value)}}
            />
            <p id="pwdnote" className={passwordFocus && password && !validPassword ? "instructions max-w-xs justify-self-center" : "offscreen"}>
                         Le mot de passe doit etre compose de 8 caracteres, une lettre majuscule,
                         une lettre miniscule et un chiffre.
                        </p>
          <label
            for="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mot de passe
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            // onKeyPress={(event) => {
            //   if (!/[0-9]/.test(event.key)) {
            //     event.preventDefault();
            //   }
            // }}
            type="password"
            name="matchPwd"
            id="matchPwd"
            value={matchPwd}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="pwdconfirm"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            onChange={(e)=>{setMatchPwd(e.target.value); onDataChange(e.target.name,e.target.value)}}

          />
           <p id="pwdconfirm" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Le mot de passe n'est pas identique
                        </p> 
          <label
            for="matchPwd"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirmation du mot de passe
          </label>
        </div>
     <div>
    
      </div>
      </div>
      <div>
   
      <div className="mb-20">
      <div id="select">
            <div className="mb-2 block">
              <label htmlFor="type" value="Select your type" s>
                Sexe
              </label>
            </div>
            <Select options={SexeOptions} onChange={(e)=>{onDataChange(e.name,e.value)}}/>
          </div>
          <div id="select">
            <div className="mb-2 block">
              <label htmlFor="type" value="Select your type" s>
                Mode d'utilisation
              </label>
            </div>
            <Select options={roleoptions} onChange={(e)=>{onDataChange(e.name,e.value)}}/>
          </div>
          <p class="text-sm text-center font-medium text-[#152071]">
                    Vous avez deja un compte{" "}
                    <a
                      onClick={()=>{pass()}}
                      href="javascript:void(0)"
                      class="font-medium text-[#F16951] hover:underline "
                    >
                        Inscrivez-vous
                    </a>
                  </p>
      </div>
      <h2 className="text-lg">Les modes d'utilisation</h2>
      <div className="Choose mt-3 mx-2 flex flex-row">

          <div className="Proprio rounded-md p-10 bg-[#FBEDEC]  mr-2 ring ring-[#ff3b4e] ">
            <div className="flex justify-center ">
          
             

                <h2 className=" text-3xl text-rose-900 text-center font-semibold mb-3 ">
                  Un Propriétaire
                </h2>
             
            </div>
            <div className="rounded-md bg-[white] p-5 ring ring-[#f15968]">
              <h4>
                Un compte propriétaire vous permet de bénéficier des
                fonctionnalités du mode parent, mais également ajouter les
                crèches que vous possédez sur notre site afin d'attirer de
                nouveaux clients. En plus de pouvoir gérer les inscriptions et
                les réservations, ainsi que communiquer par e-mail avec les
                parents intéressés par vos services.{" "}
              </h4>
            </div>
          </div>
          {/* <div class="container">
            <h1 className="text-3xl text-rose-900">Ou bien</h1>
          </div> */}

          <div className="Parent rounded-md p-10 bg-[#FBEDEC] ml-2 ring ring-[#f15968] ">

            <div className="flex justify-center ">
           
              
               
                <h2 className="text-3xl  text-center font-semibold text-rose-900 mb-3">
                  
                  Un Parent
                </h2>
             
            </div>
            <div className="ring ring-[#f15968] rounded-md bg-[white] p-5">
              <h4>
                Un compte parent vous permet d'ajouter à vos favoris les
                différentes crèches disponibles et d'inscrire vos enfants. Vous
                pourrez alors réserver directement une place pour eux dans une
                crèche choisie ou prendre rendez-vous avec une crèche pour en
                savoir plus sur les disponibilités et les modalités
                d'inscription.
              </h4>
            </div>
          </div>
        </div>
        </div>
        </div>
    </>
  );
}
