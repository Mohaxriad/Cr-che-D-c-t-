import React from 'react'

import one from "./assets/mission.svg";
import two from "./assets/engagement.svg";
import three from "./assets/value.svg";
import four from "./assets/vocation.svg";


const Section2 = () => {
  return (
    <>
      <div>
    {/*<div className="flex justify-end ">
        <img src={kid} alt="/" className=""></img>
  </div> */}
      <div className="w-full mt-5 py-[6rem] px-2 bg-[#1C1635]">
        
          {/********************************************************************************************************************* */}
        <div className="py-[4rem] max-w-[1400px] mx-auto ld:grid  xl:gap-10 xl:grid-cols-4 ld:grid-cols-2 ld:gap-5   flex flex-wrap">
          <div className="bg-[#F6C9C7] w-full shadow-xl flex flex-col  p-2 xl:p-4 my-4 rounded-3xl hover:bg-[#5B112B] hover:text-white hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem]" src={one} alt="/" />
            <h2 className="text-2xl font-bold text-center py-8">
              Notre Mission
            </h2>
            <p className="text-center text-base py-4 mx-4 font-medium ">
            Notre mission est de mettre à la disposition des parents un
            réseau de crèches fiable et facilement accessible pour 
            trouver une place pour leur enfant. Nous voulons être le 
            partenaire de confiance des parents.

            </p>
            
          </div>
          {/********************************************************************************************************************* */}

          <div className="bg-[#F6C9C7] w-full shadow-xl flex flex-col p-4  my-4 rounded-3xl hover:bg-[#5B112B] hover:text-white hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem]" src={two} alt="/" />
            <h2 className="text-2xl font-bold text-center py-8">
            Notre engagement
            </h2>
            <p className="text-center text-base py-4  mx-2 ld:mx-8 font-medium ">
            Notre nous engageons a fournir un service de qualité à tous 
            les parents , propriétaires et  enfants 
            et nous croyons que notre service peut aider à améliorer leur
            bien-être et leur épanouissement.
            </p>
          </div>
          {/********************************************************************************************************************* */}

          <div className="bg-[#F6C9C7] w-full shadow-xl flex flex-col p-4 my-4 rounded-3xl hover:bg-[#5B112B] hover:text-white hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem]" src={three} alt="/" />
            <h2 className="text-2xl font-bold text-center py-8">
            Nos valeurs
            </h2>
            <p className="text-center text-base py-4 mx-2 ld:mx-8 font-medium ">
            Nous sommes animés par des valeurs 
            fondamentales telles que  la disponibilité, 
            l'empathie et l'efficacité. Nous sommes à l'écoute de nos 
            clients et nous somme pret à leur fournir un service de 
            qualité qui respecte ces valeurs.
            </p>
          </div>
          {/********************************************************************************************************************* */}

          <div className="bg-[#F6C9C7] w-full shadow-xl flex flex-col p-4 my-4 rounded-3xl hover:bg-[#5B112B] hover:text-white hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem]" src={four} alt="/" />
            <h2 className="text-2xl font-bold text-center py-8">
            Notre vocation
            </h2>
            <p className="text-center text-sm py-4 mx-2 ld:mx-8 font-medium ">
            
            Nous avons pour vocation de créer un environnement harmonieux 
            entre les parents et les structures d'accueil pour enfants, tout 
            en contribuant à la sérénité et à l'épanouissement de chacun. 
           Nous pensons que le bien-être des enfants doit être au cœur de 
             tout projet professionnel et familial.
            </p>
          </div>
          {/********************************************************************************************************************* */}

        </div>
        
      </div>
    </div>
    </>
  )
}

export default Section2
