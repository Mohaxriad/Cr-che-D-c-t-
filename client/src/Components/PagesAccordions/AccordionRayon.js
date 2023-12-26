import React, { useState } from 'react';
import AccordionSection from './AccordionSection';
import Select from "react-select";
import {FaStreetView} from "react-icons/fa"


const AccordionRayon = ({getDistance,storeLatLon}) => {

  const Rayon = [
    {name:"Distance",value: 'Aucun', label: "Aucun" },
    {name:"Distance",value: 2000, label: "2 Km" },
    {name:"Distance",value: 5000, label: "5 Km" },
    {name:"Distance",value: 10000, label: "10 Km" },
    {name:"Distance",value: 15000, label: "15 Km" },
    {name:"Distance",value: 30000, label: "30 Km" },
    {name:"Distance",value: 50000, label: "50 Km" },
    {name:"Distance",value: 100000, label: "100 Km" },

];

function getIPAddress() {
  fetch('https://api.ipify.org/?format=json')
  .then((response)=>response.json())
  .then((data)=>{
       console.log(data.ip)
       getLoc(data.ip)
  })
}



async function getLoc(ip){

  fetch(`https://ipapi.co/${ip}/json/`)
  .then((response)=>response.json())
  .then((data)=>{
     storeLatLon('longitude',data.longitude)
     storeLatLon('latitude',data.latitude)

  })
}
const handleLocationClick = ()=>{
  getIPAddress()
}
   
    const [sections, setSections] = useState([
        { title: <>
        <div className=' flex justify-center border-2 border-[#ff3e3e] p-4 rounded-lg text-white bg-[#63132f] hover:scale-105 duration-300 hover:bg-[#f3817f] hover:cursor-pointer' title="Filtrer dans un rayon ">
      <FaStreetView/>
      </div>
    </>, content: <>
    <div className="  my-1 ">
                    <label
                      htmlFor="rayon"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Rayon
                    </label>
                    <div className="mt-2">
                      <Select className="z-[71]  text-black" options={Rayon} onChange={(e) => storeLatLon('Distance',e.value)} />
                    </div>
                  </div>
        </>, isOpen: false },
        // { title: 'Section 2', content: 'Contenu de la section 2', isOpen: false },
        // { title: 'Section 3', content: 'Contenu de la section 3', isOpen: false },
      ]);
    
      const toggleSection = (index) => {
        handleLocationClick()
        const newSections = [...sections];
        newSections[index].isOpen = !newSections[index].isOpen;
        setSections(newSections);
      };
    
      return (
        <div>
          {sections.map((section, index) => (
            <AccordionSection
              key={index}
              title={section.title}
              content={section.content}
              isOpen={section.isOpen}
              toggleSection={() => toggleSection(index)}
            />
          ))}
        </div>
      );
    }

export default AccordionRayon