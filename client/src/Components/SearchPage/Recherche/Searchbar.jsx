import React, { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { Communes } from "../../../data";
import axios from "../../../api/axios";


import AccordionRayon from "../../PagesAccordions/AccordionRayon";
const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilter] = useState({});
  const [selectedjours, setSelectedjours] = useState([]);
  const [selectedservices, setSelectedservices] = useState([]);
  const [data, setData] = useState(null);
  const [text, setText] = useState(null);

  const handleSearch = async  (e) => {
    e.preventDefault();
        if (selectedjours.length>0){ 
            filters.JourAccueil = selectedjours.join(',');
            
        }
        if (selectedservices.length>0) {
            filters.Services = selectedservices.join(',');
        }

        if(text){
          filters.SearchBarInput = text;
        }




        
        try{
            const response = await  axios.get('http://localhost:8080/search', {params:filters})
                              
            const datas = response.data;
            setData(datas)
            localStorage.removeItem('search')
            localStorage.setItem('searchData',JSON.stringify(datas))
            
        
         }catch(error)  {
            console.log(error);
        };
       
};


useEffect(()=>{
  if(!(data ==null)){
  console.log(data)
  handleClick()
  }
 },[data])




useEffect(() => {
  console.log(filters);
}, [filters]);

useEffect(() => {
  console.log(text);
}, [text]);

useEffect(() => {
  console.log(selectedjours);
}, [selectedjours]);

useEffect(() => {
  console.log(selectedservices);
}, [selectedservices]);

const handleInputChange = async (e) => {
       
  const  name  = e.name;
  const value = e.value;
  console.log(e.name,e.value)
  await setFilter({
    ...filters,
    [name]: value,
  });


}

function handleTextChange(event) {
  setText(event.target.value);
}

function StoreLatLon(name,value){
    setFilter((prev)=>{
   return{ ...prev,
    [name]: value,
  }})
}

const handleJoursChange = (selected) => {

  if(selected.length < selectedjours.length){
     
      setSelectedjours(selectedjours.filter((string)=>  {
          return selected.findIndex(item => item.value === string) !== -1
      }
      ))
      
  }else{
      setSelectedjours([...selectedjours,selected[selected.length-1].value]);

  }
};

const handleServicesChange = (selected) => {

  if(selected.length < selectedservices.length){

      setSelectedservices(selectedservices.filter((string)=>  {
          return selected.findIndex(item => item.value === string) !== -1
           }
      ))
      
  }else{
      setSelectedservices([...selectedservices,selected[selected.length-1].value]);

  }
};



  const menuRef = useRef();
  const inputRef = useRef();
  const formRef = useRef();
  const JoursAcc = [
    {name:"JourAccueil",value: "Dimanche", label: "Dimanche" },
    {name:"JourAccueil",value: "Lundi", label: "Lundi" },
    {name:"JourAccueil",value: "Mardi", label: "Mardi" },
    {name:"JourAccueil",value: "Mercredi", label: "Mercredi" },
    {name:"JourAccueil",value: "Jeudi", label: "Jeudi" },
    {name:"JourAccueil",value: "Vendredi", label: "Vendredi" },
    {name:"JourAccueil",value: "Samedi", label: "Samedi" }

]
const AgeAcc = [
    {name:"Age",value: 'Aucun', label: "Aucun" },
    {name:"Age",value: 2, label: "2 Ans" },
    {name:"Age",value: 3, label: "3 Ans" },
    {name:"Age",value: 4, label: "4 Ans" },
    {name:"Age",value: 5, label: "5 Ans" },
    {name:"Age",value: 6, label: "6 Ans" }

]
const Typeetab = [
    {name:"TypeEtablissement",value: 'Aucun', label: "Aucun" },
    {name:"TypeEtablissement",value: "Etatique", label: "Etatique" },
    {name:"TypeEtablissement",value: "Prive", label: "Privé" }
]

const Typeaccueil = [
    {name:"TypeAccueil",value: 'Aucun', label: "Aucun" },
    {name:"TypeAccueil",value:"Occasionnel", label: "Occasionnel" },
    {name:"TypeAccueil",value: "Regulier", label: "Régulier" },

]

const Mixité = [
    {name:"Mixite",value: 'Aucun', label: "Aucun" },
    {name:"Mixite", value: "Les deux", label: "Mixte" },
    {name:"Mixite", value: "Garcons uniquement", label: "Garcons uniquement" },
    {name:"Mixite", value: "Filles uniquement", label: "Filles uniquement" },

]


const Pedagogie = [
    {name:"Pedagogie",value: 'Aucun', label: "Aucun" },
    {name:"Pedagogie", value: "Reggio Emilia", label: "Reggio Emilia" },
    {name:"Pedagogie", value: "Montessori", label: "Montessori" },
    {name:"Pedagogie", value: "Pikler-Loczy", label: "Pikler-Loczy" },
    {name:"Pedagogie", value: "Steiner-Waldorf", label: "Steiner-Waldorf" },
    {name:"Pedagogie", value: "Freinet", label: "Freinet" },
    {name:"Pedagogie", value: "Faber et Mazlish", label: "Faber et Mazlish" },
    {name:"Pedagogie", value: "Snoezelen", label: "Snoezelen" },

]
const Dispo = [
    {name:"PlacesDisponibles",value: 'Aucun', label: "Aucun" },
    {name:"PlacesDisponibles",value: "Places disponibles", label: "Places disponibles" },
    {name:"PlacesDisponibles",value: "Complet", label: "Complet" },
]

const Langues = [
    {name:"Langue",value: 'Aucun', label: "Aucun" },
    {name:"Langue",value: "Francais", label: "Francais" },
    {name:"Langue",value: "Anglais", label: "Anglais" },
    {name:"Langue",value: "Francais et Anglais", label: "Francais et Anglais" },

]




const Capacité = [
    {name:"capacite",value: 'Aucun', label: "Aucun" },
    {name:"capacite",value: "Aucun", label: "Aucun" },
    {name:"capacite",value: 50, label: "jusqu'à 50 places" },
    {name:"capacite",value: 100, label: "jusqu'à 100 places" },
    {name:"capacite",value: 200, label: "jusqu'à 200 places" },
    {name:"capacite",value: 300, label: "jusqu'à 300 places" },
    {name:"capacite",value: 400, label: "jusqu'à 400 places" },
    {name:"capacite",value: 500, label: "jusqu'à 500 places" },
    {name:"capacite",value: 600, label: "jusqu'à 600 places" },
]

const Evaluation = [
    {name:"NoteEvaluationTotal",value: 'Aucun', label: "Aucun" },
    {name:"NoteEvaluationTotal",value: 3, label: " 3 étoiles " },
    {name:"NoteEvaluationTotal",value: 4, label: " 4 étoiles " },
    {name:"NoteEvaluationTotal",value: 5, label: " 5 étoiles " },
]

const ServiceSupp = [
    {name:"Services",value: "Transport", label: "Transport" },
    {name:"Services",value: "Alimentation", label: "Alimentation" },
    {name:"Services",value: "Medecin", label: "Médecin" },
    {name:"Services",value: "Enfants-Handicapes", label: "Enfants-Handicapes" },
    {name:"Services",value: "Classes-Preparatoires", label: "Classes-Préparatoires" },
]

const Wilaya = [ 
    {name:"wilaya",value: 'Aucun', label: "Aucun" },
    {name:"wilaya",value: "Aucun" ,label: "Aucun" },
    {name:"wilaya",value: "Adrar" ,label: "1-Adrar" },
    {name:"wilaya",value: "Chlef" ,label: "2-Chlef" },
    {name:"wilaya",value: "Laghouat" ,label: "3-Laghouat" },
    {name:"wilaya",value: "Oum El Bouaghi" ,label: "4-Oum El Bouaghi" },
    {name:"wilaya",value: "Batna" ,label: "5-Batna" },
    {name:"wilaya",value: "Bejaia" ,label: "6-Bejaia" },
    {name:"wilaya",value: "Beskra" ,label: "7-Beskra" },
    {name:"wilaya",value: "Bechar" ,label: "8-Bechar" },
    {name:"wilaya",value:  "Blida" , label: "9-Blida" },
    {name:"wilaya",value:  "Bouira" , label: "10-Bouira" },
    {name:"wilaya",value:  "Tamanrasset" , label: "11-Tamanrasset" },
    {name:"wilaya",value:  "Tebessa" , label: "12-Tebessa" },
    {name:"wilaya",value:  "Telemcen" , label: "13-Telemcen" },
    {name:"wilaya",value:  "Tiaret" , label: "14-Tiaret" },
    {name:"wilaya",value:  "TiziOuzou" , label: "15-Tizi-ouzou" },
    {name:"wilaya",value:  "Alger" , label: "16-Alger" },
    {name:"wilaya",value:  "Djelfa" , label: "17-Djelfa" },
    {name:"wilaya",value:  "Jijel" , label: "18-Jijel" },
    {name:"wilaya",value:  "Setif" , label: "19-Setif" },
    {name:"wilaya",value:  "Saida" , label: "20-Saida" },
    {name:"wilaya",value:  "Skikda" , label: "21-Skikda" },
    {name:"wilaya",value:  "Sidi Bel Abbes" , label: "22-Sidi Bel Abbes" },
    {name:"wilaya",value:  "Annaba" , label: "23-Annaba" },
    {name:"wilaya",value:  "Guelma" , label: "24-Guelma" },
    {name:"wilaya",value:  "Constantine" , label: "25-Constantine" },
    {name:"wilaya",value:  "Medea" , label: "26-Médéa" },
    {name:"wilaya",value:  "Mostaganem" , label: "27-Mostaganem" },
    {name:"wilaya",value:  "MSila" , label: "28-M'Sila" },
    {name:"wilaya",value:  "Mascara" , label: "29-Mascara" },
    {name:"wilaya",value:  "Ouargla" , label: "30-Ouargla" },
    {name:"wilaya",value:  "Oran" , label: "31-Oran" },
    {name:"wilaya",value:  "El Bayadh" , label: "32-El Bayadh" },
    {name:"wilaya",value:  "Illizi" , label: "33-Illizi" },
    {name:"wilaya",value:  "Bordj Bou Arreridj" , label: "34-Bordj Bou Arreridj" },
    {name:"wilaya",value:  "Boumerdes" , label: "35-Boumerdès" },
    {name:"wilaya",value:  "El Tarf" , label: "36-El Tarf" },
    {name:"wilaya",value:  "Tindouf" , label: "37-Tindouf" },
    {name:"wilaya",value:  "Tissemsilt" , label: "38-Tissemsilt" },
    {name:"wilaya",value:  "El Oued" , label: "39-El Oued" },
    {name:"wilaya",value:  "Khenchela" , label: "40-Khenchela" },
    {name:"wilaya",value:  "Souk Ahras" , label: "41-Souk Ahras" },
    {name:"wilaya",value:  "Tipaza" , label: "42-Tipaza" },
    {name:"wilaya",value:  "Mila" , label: "43-Mila" },
    {name:"wilaya",value:  "Ain Defla" , label: "44-Aïn Defla" },
    {name:"wilaya",value:  "Naama" , label: "45-Naâma" },
    {name:"wilaya",value:  "Ain Temouchent" , label: "46-Aïn Témouchent" },
    {name:"wilaya",value:  "Ghardaia" , label: "47-Ghardaïa" },
    {name:"wilaya",value:  "Relizane" , label: "48-Relizane" },
    {name:"wilaya",value:  "Timimoun" , label: "49-Timimoun" },
    {name:"wilaya",value:  "Bordj Badji Mokhtar" , label: "50-Bordj Badji Mokhtar" },
    {name:"wilaya",value:  "Ouled Djellal" , label: "51-Ouled Djellal" },
    {name:"wilaya",value:  "Beni Abbes" , label: "52-Béni Abbès" },
    {name:"wilaya",value:  "In Salah" , label: "53-In Salah" },
    {name:"wilaya",value:  "In Guezzam" , label: "54-In Guezzam" },
    {name:"wilaya",value:  "Touggourt" , label: "55-Touggourt" },
    {name:"wilaya",value:  "Djanet" , label: "56-Djanet" },
    {name:"wilaya",value:  "El MGhair" , label: "57-El M'Ghair" },
    {name:"wilaya",value:  "El Meniaa " , label: "58-El Meniaa " },
]

  const Price = [
    {name:"tarif",value: 'Aucun', label: "Aucun" },
    {name:"tarif", value: 8000, label: "8000-10000" },
    {name:"tarif", value: 10000, label: "10000-12000" },
    {name:"tarif", value: 12000, label: "12000-14000" },
    {name:"tarif", value: 14000, label: "14000-16000" },
    {name:"tarif", value: 16000, label: "16000-18000" },
    {name:"tarif", value: 18000, label: "18000-20000" },
    {name:"tarif", value: 20000, label: "20000-22000" },
  ];


  window.addEventListener("click", (e) => {
    if (
      e.target !== menuRef.current &&
      e.target !== inputRef.current &&
      e.target === formRef.current
    ) {
      setOpen(false);
    }
  });

  const navigate = useNavigate();





  function handleClick() {
  
  navigate('/SearchResults');
  window.location.reload()
  }

  return (
    <div className=" font-inter mt-1 w-full h-full flex flex-col justify-center text-center text-white p-4">
      <div className="Searchbar flex flex-col mt-4">
        {/* <form
                    className="flex justify-between items-center max-w-[700px] mx-auto w-full border border-[#ED6361] p-1
          rounded-xl text-white bg-[#63132f] ring ring-[#d84f4f] hover:scale-105 duration-75 pr-2"
                >
                    <div>
                        <input
                            onClick={() => setOpen(!open)}
                            ref={inputRef}
                            className="bg-transparent w-full font-[Inter] focus:outline-none pl-5"
                            type="text" 
                            placeholder="  Saisissez un lieu"
                        />
                    </div>

                     <div> 
                     <a href="/SearchResults">    <button className=" mr-1 p-3  border-[#ED6361] bg-transparent rounded-md hover:scale-105 duration-300 hover:bg-[#ED6361] hover:border-rose-950">
                         <AiOutlineSearch
                                size={20}
                                className="color:#5B112B text-2xl cursor-pointer"
                            /> 
                        </button></a>
                     
                    </div>   
                </form> */}

        <form className=" flex ld:flex-row flex-col justify-center   ">
          <div className="w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Rechercher
            </label>
            <div class="relative ">
              <div class="absolute inset-y-0  flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onClick={() => setOpen(!open)}
                ref={inputRef}
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-xl text-white bg-[#63132f] focus:ring-[#ff5454] focus:border-[#ff5454] "
                placeholder=" Saisissez un lieu"
                onChange={handleTextChange}
              />
              <button
                onClick={handleSearch}
                class="text-white absolute right-2.5 bottom-[7px] bg-[#f3817f] border-2 border-[#fb4747] hover:scale-105 duration-300 hover:bg-[#ED6361] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2  hover:bg-rosee-700 focus:ring-rose-800"
              >
                Rechercher
              </button>
            </div>
          </div>
          <div className="max-w-[100px] mx-auto  ld:ml-5 mt-[2px]">
            <AccordionRayon getDistance={handleInputChange} storeLatLon={StoreLatLon}/>
          </div>
        </form>

        {open && (
          <div
            ref={menuRef}
            className="flex justify-center mx-auto items-center bg-white font-medium text-blue-950 ring ring-[#ff4f4f] w-full   mt-3 rounded-xl max-w-[700px]"
          >
            <form
              ref={formRef}
              className=" grid pio:grid-cols-2 xs:grid-cols-3"
            >
              <div className="mx-3 my-3">
                <label
                  htmlFor="etab"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age d'acceuil
                </label>
                <div className="mt-2">
                  <Select
                    name="Age"
                    className="z-[70]  "
                    options={AgeAcc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
             

              <div className="mx-3 my-3">
                <label
                  htmlFor="etab"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jours d'acceuils
                </label>
                <div className="mt-2">
                  <Select
                    isMulti={true}
                    name="JourAccueil"
                    className="z-[69] "
                    options={JoursAcc}
                    onChange={handleJoursChange}
                  />
                </div>
              </div>
              <div className=" mx-3 my-3">
                <label
                  htmlFor="etab"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type d'etablissement
                </label>
                <div className="mt-2">
                  <Select className="z-[68] " name="TypeEtablissement" options={Typeetab} onChange={handleInputChange} />
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="acceuil"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type d'accueil
                </label>
                <div className="mt-2">
                  <Select className="z-[67] " name="TypeAccueil" options={Typeaccueil} onChange={handleInputChange} />
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="pedagogie"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pedagogie
                </label>
                <div className="mt-2">
                  <Select className="z-[66] " name="Pedagogie" options={Pedagogie} onChange={handleInputChange}/>
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="dispo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Disponibilité
                </label>
                <div className="mt-2">
                  <Select className="z-[65]" name="PlacesDisponibles" options={Dispo} onChange={handleInputChange} />
                </div>
              </div>

             

              <div className=" mx-3 my-3">
                <label
                  htmlFor=" Prix"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prix Da/Mois
                </label>
                <div className="mt-2">
                  <Select className="z-[64] " name="tarif"  options={Price} onChange={handleInputChange} />
                </div>
              </div>
              <div className=" mx-3 my-3">
                <label
                  htmlFor="capacité"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Capacité
                </label>
                <div className="mt-2">
                  <Select className="z-[63] " name="capacite" options={Capacité} onChange={handleInputChange} />
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="capacité"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Evaluation
                </label>
                <div className="mt-2">
                  <Select className="z-[62] " name="NoteEvaluationTotal" options={Evaluation} onChange={handleInputChange} />
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="capacité"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Wilaya
                </label>
                <div className="mt-2">
                  <Select className="z-[61]  " name="wilaya" options={Wilaya} onChange={handleInputChange} />
                </div>
              </div>
              <div className=" mx-3 my-3">
                <label
                  htmlFor="capacité"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Communes
                </label>
                <div className="mt-2">
                  <Select className="z-[60] " name="commune" options={((!filters.wilaya ) ||(filters.wilaya === 'Aucun')) ?[{value:"nothing",label:"Choisissez une Wilaya"}]:Communes[filters.wilaya]} onChange={handleInputChange} />
                </div>
              </div>

              <div className=" mx-3 my-3">
                <label
                  htmlFor="capacité"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mixité
                </label>
                <div className="mt-2">
                  <Select className="z-[59] " name="Mixite" options={Mixité} onChange={handleInputChange} />
                </div>
              </div>
              <div className=" mx-3 my-3">
                <label
                  htmlFor="Langue"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Langue supplémentaires
                </label>
                <div className="mt-2">
                  <Select className="z-[58] " name="Langue" options={Langues} onChange={handleInputChange} />
                </div>
              </div>
              <div className="mx-3 my-3">
                <label
                  htmlFor="etab"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Services Particuliers
                </label>
                <div className="mt-2">
                  <Select
                    isMulti={true}
                    name="Services"
                    className="z-[57]"
                    options={ServiceSupp}
                    onChange={handleServicesChange}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Searchbar;
