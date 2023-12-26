import React from "react";
import EnfantsSelect from "./EnfantsSelect";
import { AiOutlinePlus } from 'react-icons/ai';




const GstEnfantsSelect = ({onEnfantSelected}) => {
  return (

    <div className="  w-[90%] max-w-[1100px] mt-[5]  mx-auto text-center flex flex-col justify-center text-[#0B0C38] font-inter ">

      <h2 className=" md:text-4xl sm:text-6xl text-2xl  font-bold md:py-6 ">
      Vos enfants
      </h2>
  

      <EnfantsSelect onEnfantSelected={onEnfantSelected} />
    







    </div>

  )
}

export default GstEnfantsSelect;