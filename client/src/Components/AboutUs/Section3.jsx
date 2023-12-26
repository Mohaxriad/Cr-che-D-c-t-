import React from 'react'

import pic2 from "./assets/team.svg";

const Section3 = () => {
  return (
    <>
        <div className="flex flex-col ml-5 lg:flex-row  xl:mt-[80px]">
    <div className="   lg:w-1/2 xl:-mt-52">
        <img src={pic2} alt="about" className="w-full h-auto " />
      </div>
      <div className="lg:w-1/2 lg:pr-10">
        <h1 className="text-4xl text-blue-950 font-[Concert One] ld:mt-10 mb-4 lg:mb-6 lg:ml-10">
          <span className="ld:text-4xl text-3xl  text-[#F55D4C]">Notre  équipe:</span>{" "}
        </h1>
        <h2 className="lg:ml-11 mx-1 ld:mx-10 lg:mt-14 text-blue-950 text-base sm:text-lg font-semibold ">
        Notre équipe est composée de 6 membres passionnés et dévoués qui travaillent 
  ensemble pour offrir un service de qualité à tous les parents  
  cherchant une solution de garde pour leurs enfants.  Chacun des membres apporte sa contribution unique pour fournir un service optimal afin de satisfaire nos clients.
  Que ce soit à travers le développement web, la conception graphique, ou la gestion
  des partenariats...etc
 
        </h2>
      </div>
      
    </div>
    </>
  )
}

export default Section3