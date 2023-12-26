import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from "react-router-dom";
import PopUp from "../../../Functions/PopUp";
import { useRef, useState } from "react";
import{RiErrorWarningFill} from 'react-icons/ri'
import useRefreshToken from '../../../../hooks/useRefreshToken';
import axios from "../../../../api/axios";


function  CrecheCard (props) {
  const URLmodif='/DescriptionMesCreches?_id='+props._id+'#modifCreche'
  const URL='/DescriptionMesCreches?_id='+props._id
  function Delete() {  
 
    const [errMsg, setErrMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const refresh = useRefreshToken();


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const newAccessToken = await refresh();

            const response = await axios.delete(
                `../creche/delete/${props._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                    withCredentials: true,
                }
            );

            setSuccess(true);
            const creche = response?.data.creche;

            //update user in loacal storage
           let storeUser = JSON.parse(localStorage.getItem('user'));
            
              storeUser.user.liste_creches = creche.liste_creches ;
            let  user=storeUser.user
              localStorage.setItem('user', JSON.stringify({ user }));
            //relaod page
            window.location.reload();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else
            {
                setErrMsg( ' creche n"existe pas ');
                console.log(err.response.message);
            }
            //errRef.current.focus();

        }
    };

    const [showButton, setShowButton] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      
    };

    return (
      <div className="z-50">
 
        <div className="hover:text-blue-950">
        {showButton && (

    <button 
    onClick={() => { openPopup();   }}
      
    className="bg-[#ff6565] justify-self-end mr-[6%]  w-fit  rounded-md font-medium text-center my-2  ring ring-[#081060]  hover:scale-105 duration-75 hover:bg-[#c21010]" title="Supprimer">
 < AiFillDelete size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>

    )}
    </div>
        {showPopup && <PopUp content={<>
          <div className="  mx-auto max-w-[300px] ld:max-w-[500px]">
            <div className="">
              <div className=" flex flex-col mx-[5%]  ring-4  rounded-lg p-10 mt-[50px]">
                <h2 className="ld:text-xl text-base text-blue-950 text-center font-semibold">
              Etes vous sur de vouloir supprimer cette creche ?
                </h2>
    
                <div className="mt-6 flex flex-col items-center justify-center gap-x-6">
                 <div className=" text-[#8a2424] text-4xl mb-5 ring-[#ea1d1d] ring rounded-full"> <RiErrorWarningFill/></div>
                <div className="flex flex-row ">
                 <button
                    type="submit"
                    className="rounded-md bg-[#0f0080] mr-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                  >
                    <a href="/MesCreches">Annuler</a>
                  </button>
               
                  <button
                  onClick={handleClick}
                    type="submit"
                    className="rounded-md ml-3 bg-[#800000] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                  >
                   Supprimer
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </>}
           closePopup={closePopup} />}
      </div>
    );
  };
return (
<div className="mx-3 my-3 rounded-2xl bg-white ring ring-[#ff7c7c] font-inter">
<div className="  grid grid-cols-3 text-center items-center w-full border-b-2 border-red-200 border-t-2 my-3 ">
  
  <div className="justify-self-start ml-[6%] ">
    <a href={URLmodif}>
    
        <button className="bg-[#2b305e] ring ring-[#c21010]   w-fit rounded-md font-medium text-center my-2    hover:scale-105 duration-75 hover:bg-[#091278]" title="Modifier">
          < AiFillEdit size={20} className=' text-center text-white  cursor-pointer mx-1 my-1  xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>
        </a>
        </div>

        <h1 className="font-inter font-bold justify-self-center">{props.name} </h1>
         <div className="justify-self-end mr-[6%] ">
      <Delete/>
       
        </div>
        
 </div>
    <h1 className="font-inter mt-5 mb-3 "> <span className="font-bold"> Nom : </span> {props.name} </h1>
    <h1 className="font-inter my-3"> <span className="font-bold"> Location : </span>  {props.Commune} , {props.Wilaya} </h1>
    <h1 className="font-inter my-3  "> <span className="font-bold"> Description : </span> {props.Description} </h1>
     <a href={URL} >
    <button className=" bg-[#ff9292] text-white  py-2.5 px-8  w-fit  rounded-md font-medium text-center mt-3 mb-5  ring  ring-[#ff4b4b] hover:bg-[#930a0a] hover:scale-105 duration-0" title="Supprimer">
          Voir Plus  
      </button>
      </a>
      
      
      
      
      
    
</div>
    
)


}

export default CrecheCard; 