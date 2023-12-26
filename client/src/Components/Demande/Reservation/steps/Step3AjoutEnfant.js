import { useStepperContext } from "../GestionDesSteps/StepperContext";
import React from "react";
import Select from "react-select";
import { useState } from "react";
import AccordionAjouterAutreEnfant from "../../../PagesAccordions/AccordionAjouterAutreEnfant";
import AccordionEnfantDejaAjoutes from "../../../PagesAccordions/AccordionEnfantDejaAjoutes";

export default function Step3AjoutEnfant({onDataChange,onEnfantSelected,NumEnfant}) {
  const { userData, setUserData } = useStepperContext();
  const incrementedNum = NumEnfant+1;




  const options = [
    {name:"sexe", value: "Garcon", label: " HOMME" },
    {name:"sexe", value: "Fille", label: "FEMME" },
  ];


  return (
    <div className="flex flex-col mx-5 ">
          <h2 className="text-xl font-semibold">Inscrivez les enfants que vous voulez placer dans cette creche</h2>
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value,NumEnfant)}}
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-1 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value,NumEnfant)}}

            />
            <label
              for="prenom"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PRENOM
            </label>
          </div>
        </div>
      <div className="grid md:grid-cols-2 md:gap-6 my-2">
        {/* <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            NUMERO DU PV CS
          </label>
        </div> */}
        <div className="relative z-0 w-full mb-2 group mt-0">
            <input
              type="date"
              name="date"
              id="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value,NumEnfant)}}

            />
            <label
              for="date"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DATE DE NAISSANCE
            </label>
          </div>
        <div id="select">
          <div className="mb-2 block">
            <label htmlFor="type" value="Select your type" s>
             Sexe
            </label>
          </div>
          <Select options={options} onChange={(e)=>{onDataChange(e.name,e.value,NumEnfant)}} />
        </div>
         <div className="relative z-0 w-full mb-2 group mt-5 ld:mt-0">
            <input
              type="date"
              name="dateAjout"
              id="dateAjout"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value,NumEnfant)}}

            />
            <label
              for="dateAjout"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date souhaites pour ajouter l'enfant
            </label>
          </div>
          <div className="relative z-0 w-full mb-2 group mt-5 ld:mt-0">
            <input
              type="date"
              name="dateFin"
              id="dateFin"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
              placeholder=" "
              required
              onChange={(e)=>{onDataChange(e.target.name,e.target.value,NumEnfant)}}

            />
            <label
              for="dateFin"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date de fin de reservation
            </label>
          </div>
      </div>
            <div className="grid md:grid-cols-2 md:gap-6 my-2">
            <div className="relative z-0 w-full mb-3 group my-2">
            <AccordionAjouterAutreEnfant onDataChange={onDataChange} NumEnfant={incrementedNum}/>
          </div>
        <div className="relative z-0 w-full mb-6 group">
        <AccordionEnfantDejaAjoutes onEnfantSelected={onEnfantSelected}/>
        </div>
      </div>
   
    </div>
  );
}