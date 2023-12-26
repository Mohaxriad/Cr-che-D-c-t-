import React from "react";
import InvestItem from "./InvestItem";
import InvestmentsDB from "./utils/InvestmentsDB";

import {FaUserFriends,FaSchool} from "react-icons/fa";


function LeftPart() {
  const {InvestDB,nbUsers , nbCreches}= InvestmentsDB();
  return (
    <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
      {/* top section*/}
      {/* top section*/}
      <div className="w-full items-start justify-start flex flex-col px-12 pt-12 pb-6">
        <h2 className="font-bold text-xl xl:text-2xl pb-2 text-[#F55D4C]"> Tableau de bord </h2>
        <p className="text-md text-gray-800">
          Statistiques
        </p>
    </div>
        <div className="md:flex items-center justify-center w-full lg:space-y-0 space-y-4  lg:space-x-4  px-12">
        <div className="space-y-6 w-full items-center justify-center flex flex-col ">
          <span className="py-4 px-4 rounded-full shadow-lg shadow-gray-300 items-center justify-center flex bg-[#FB9B90] hover:scale-110 duration-300">
            <FaSchool className=" w-8 h-8 stroke-1 text-blue-950 " />
          </span>
          <span className="items-center justify-center flex flex-col">
            <h2> Nombre de crèches </h2>
            <h2 className="font-bold text-xl text-blue-950">{nbCreches} </h2>
          </span>
        </div>
        {/* duplicate above ☝ */}
        <div className="space-y-6 w-full items-center justify-center flex flex-col ">
          <span className="py-4 px-4 rounded-full shadow-lg shadow-gray-300 items-center justify-center flex bg-[#FB9B90] hover:scale-110 duration-300">
            <FaUserFriends className="w-8 h-8 stroke-1 text-blue-950 " />
          </span>
          <span className="items-center justify-center flex flex-col">
            <h2> Nombre d'utillisateurs </h2>
            <h2 className="font-bold text-xl text-blue-950">{nbUsers} </h2>
          </span>
        </div>
       
      </div>
      {/* bottom section*/}
      <div className="w-full items-start justify-start flex flex-col px-5 py-6">
        
        <div className="w-full space-y-5 overflow-y-auto max-h-[350px] py-6 scrollbar-hide">
          {InvestDB.map((item) => (
            <InvestItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftPart;
