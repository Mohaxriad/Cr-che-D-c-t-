import { useStepperContext } from "../../../Demande/Reservation/GestionDesSteps/StepperContext";
import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useRef } from "react";
import useRefreshToken from '../../../../hooks/useRefreshToken'
import axios from "../../../../api/axios";
import AjoutEnfantSuccess from "../../../Functions/Success/AjoutEnfantSuccess";
export default function FormEnfant() {
    const { userData, setUserData } = useStepperContext();
  
    const refresh = useRefreshToken();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    
    const [age, setAge] = useState('');
    const [sexe, setSexe] = useState('');
    
    const sexeoptions = [
        { value: "Garcon", label: "Garcon" },
        { value: "Fille", label: "Fille" },
    ];
    const ageoptions = [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
    ];

    const [success,setSuccess]=useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAccessToken = await refresh();
            const response = await axios.post(
                '../enfant/creer',
            JSON.stringify({ nom, prenom, age, sexe }),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${newAccessToken}`,
              },
              withCredentials: true,
            }
          );

          setSuccess(true);
            const enfant = response?.data.enfant;

          //update user in loacal storage
         let storeUser = JSON.parse(localStorage.getItem('user'));
          
            storeUser.user.Enfant = enfant.Enfant ;
          let  user=storeUser.user
            localStorage.setItem('user', JSON.stringify({ user }));


            
          setNom('');
          setPrenom('');
          setSexe('');
          setAge('');
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else {
            setErrMsg('Registration Failed');
            console.log(err);
          }
        //  errRef.current.focus();
        
        }
      };

   
   
  

    return (
        <>
          {success ? (
        <section>
          <AjoutEnfantSuccess/>
        </section>
      ) : (
        <section>
        <form className="flex flex-col mx-[5%] ring-[#ff5353] ring-4  rounded-lg p-10 mt-[50px] " onSubmit={handleSubmit} >
            <h2 className="text-xl font-semibold">Inscrivez les enfants que vous voulez placer dans la creche </h2>
            <div className="grid md:grid-cols-2 md:gap-6 my-3">
                <div className="relative z-0 w-full mb-2 group">
                    <input
                       
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-rose-400 peer"
                        placeholder=" "
                        required
                        value={nom }
                        onChange={(e) => setNom(e.target.value)}
            
                    />
                    <label
                        for="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-400 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        NOM
                    </label>
                </div>
                <div className="relative z-0 w-full mb-2 group">
                    <input
                      

                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-1 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-rose-400 peer"
                        placeholder=" "
                        id='prenom'
                        name='prenom'
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
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
      
            <div id="select">
                <div className="mb-2 block">
                  <label htmlFor="age" value="Select your type" s>
                    Age
                  </label>
                </div>
                <Select required
                  onChange={(value) => setAge(value.value)}
                  options={ageoptions} />
              </div>
             
                <div id="select">
                    <div className="mb-2 block">
                        <label htmlFor="type"  >
                            Sexe
                        </label>
                    </div>
                    <Select 
                     required
                     onChange={(value) => setSexe(value.value)}
                     options={sexeoptions} />
                </div>
               
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-blue-950 hover:text-red-500"
        >
          <a href="/MesEnfants">Annuler</a> 
        </button>
        <button
          type="submit"
          className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 "
        >
            Sauvgarder
        </button>
      </div>

        </form>
        </section>)}
    </>
    );
}
