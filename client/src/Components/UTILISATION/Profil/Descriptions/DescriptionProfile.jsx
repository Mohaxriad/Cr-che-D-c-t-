import {React, useState , useEffect } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import AccordionDescriptionProfil from "../../../PagesAccordions/AccordionDescriptionProfil";







export default function DescriptionProfile() {

  const [login,SetLogin] = useState(false)
  const [email,SetEmail]=useState('')
  const [username,SetUsername]=useState('')
  const [nom,SetNom]=useState('')
  const [prenom,SetPrenom]=useState('')
  const [telephone,SetTelephone]=useState('')
  const [adresse,SetAdresse]=useState('')
  const [codePostal,SetCodePostal]=useState('')
  const [commune,SetCommune]=useState('')
  const [wilaya,SetWilaya]=useState('')
  let storeUser;
  useEffect(()=>{
      storeUser=JSON.parse(localStorage.getItem('user'))
  
      if(storeUser!=null)
      {
          SetLogin(true)
          SetAdresse(storeUser.user.adresse)
          SetCommune(storeUser.user.commune)
          SetCodePostal(storeUser.user.codePostal)
          SetNom(storeUser.user.nom)
          SetPrenom(storeUser.user.prenom)
          SetWilaya(storeUser.user.wilaya)
          SetTelephone(storeUser.user.telephone)
          SetEmail(storeUser.user.email)
          SetUsername(storeUser.user.username)
  
      }
  } ,[])

  const User =  {
    prenom: prenom,
    nom : nom,
    adresse:adresse,
    wilaya :wilaya,
    commune : commune,
    tel:telephone,
    username : username,
    codePostal : codePostal,
  };

  return (
    <>
      <div className=" mx-[5%] ld:mx-[20%] mb-10 my-6 rounded-lg border-4 border-[#f09492] p-5 bg-[#f1c1c0]">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl  leading-7 text-rose-950">
            Informations Personnelles
          </h1>
        </div>
       
          <div className="mt-6  border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Nom
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.nom}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Prenom
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {User.prenom}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Pseudo
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Addresse
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.adresse}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                commune
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {User.commune}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                wilaya
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.wilaya}
              </dd>
            </div>
        
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                numero de telephone
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.tel}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                Code postal
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
                {User.codePostal}
              </dd>
            </div>
          </dl>
        </div>
     
      

        <div className=" mt-5">
          <h2 className=" text-2xl font-medium text-blue-950 mb-5">
            Souhaitez vous modifier ces informations ?
          </h2>
          <AccordionDescriptionProfil />
        </div>
      </div>
    </>
  );
}
