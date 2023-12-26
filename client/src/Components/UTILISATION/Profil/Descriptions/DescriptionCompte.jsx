import React, { useState , useEffect} from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import AccordionDescriptionCompte from "../../../PagesAccordions/AccordionDescriptionCompte";


export default function DescriptionCompte() {
  const [email,SetEmail] = useState('');
  let storeUser;
  useEffect(()=>{
      storeUser=JSON.parse(localStorage.getItem('user'))
  
      if(storeUser!=null)
      {
          SetEmail(storeUser.user.email)
      }
  } ,[])

  const User =  {
    email: email ,
  };
  return (
    <>
      <div className=" mx-[5%] ld:mx-[20%] mb-10 my-6 rounded-lg border-4 border-[#f09492] p-5 bg-[#f1c1c0]">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl  leading-7 text-rose-950">
            Informations du compte
          </h1>
        </div>
        <div className="mt-6  border-gray-100">
          <dl className="divide-y divide-gray-100">
          

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-md font-medium leading-6 text-gray-900">
                addresse mail
              </dt>
              <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {User.email}
              </dd>
            </div>          
          </dl>
        </div>
        <div className=" mt-5">
          <h2 className=" text-2xl font-medium text-blue-950 mb-5">
            Souhaitez vous modifier votre mot de passe ?
          </h2>
          <AccordionDescriptionCompte />
        </div>
      </div>
    </>
  );
}
