import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";


import PopUp from "../../Functions/PopUp";
import { useRef, useState } from "react";
import axios from "../../../api/axios";
import useRefreshToken from "../../../hooks/useRefreshToken";
import Select from "react-select";
 


function  EnfantSelectCard (props) {
const [selected,setSelected] = useState(false)

return (
<div className="mx-3 my-3 rounded-2xl bg-white ring ring-[#ff7c7c] font-inter">
<div className=" grid grid-cols-3 text-center items-center w-full border-b-2 border-red-200 border-t-2 my-3 ">

        <h1 className="font-inter font-bold justify-self-center">{props.prenom}</h1>
        <button onClick={()=>{props.onEnfantSelected(props._id);setSelected((prev)=>!prev)}} className="bg-[#ff6565] justify-self-end mr-[6%]  w-fit  rounded-md font-medium text-center my-2  ring ring-[#081060]  hover:scale-105 duration-75 hover:bg-[#c21010]" title="Selectionner">
         { (selected === false)?
          <  AiFillPlusCircle  size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
          :
          <  AiFillMinusCircle  size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
         }
        </button>
 </div>
    <h1 className="font-inter mt-5 mb-2 "> <span className="font-bold"> Nom : </span> {props.nom} </h1>
    <h1 className="font-inter my-2 "> <span className="font-bold"> Prénom : </span>  {props.prenom} </h1>
    <h1 className="font-inter my-2 "> <span className="font-bold"> Sexe : </span> {props.sexe} </h1>
    <h1 className="font-inter mt-2 mb-5 "> <span className="font-bold"> Age : </span> {props.age} </h1>
    
</div>
    
)


}

export default EnfantSelectCard;