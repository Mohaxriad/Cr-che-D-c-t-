import React from "react";
import pic from "./assets/aboutphoto.svg";



const Section1 = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row mx-10 lg:mb-[160px] lg:mt-[60px]">
    <div className="mt-6 lg:w-1/2 ">
        <img src={pic} alt="about" className="w-full h-auto" />
      </div>
      <div className="mt-10 lg:w-1/2 lg:pr-10">
        <h1 className="lg:text-4xl ld:text-2xl  text-lg text-blue-950 font-[Concert One] mb-4 md:mb-6 md:ml-10">
          <span className="lg:text-4xl ld:text-3xl text-xl  text-[#F55D4C]">La Crèche D'acoté:</span>{" "}
          votre partenaire pour trouver une place en crèche rapidement et facilement.
        </h1>
        <h2 className="md:ml-11 mx-1 ld:mx-10 md:mt-12 text-blue-950 text-lg font-semibold ">
          Chez  <span className=" text-[#F55D4C]"> La Crèche d'acôté,</span> nous sommes convaincus que chaque parent mérite de
          pouvoir travailler sans se soucier du bien-être de son enfant. C'est pourquoi
          nous avons crée un moteur de recherche de crèche, offrant
          une solution pratique et personnalisée à chaque famille.  De plus, nous offrons aux
          responsables de crèches la possibilité d'ajouter leur établissement sur notre
          site afin de bénéficier d'une meilleure visibilitée.
        </h2>
      </div>
      
    </div>
  

    </>
  );
};

export default Section1;