import React from "react";
import Navbar from "../../Navigation/Navbar";
import Searchbar from "./Searchbar";
import CrecheSlider from "../CrecheSlider";
import Footer from "../../HomePage/Footer";
import axios from "../../../api/axios";
import { useEffect } from "react";
import { useState } from "react";

const Search = () => {
  const [documents, setDocuments] = useState([]);


window.onfocus = function(){
  window.location.reload()
}


useEffect(()=>{
  console.log(documents)
},[documents])

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className=" w-full mx-auto mt-[50px]">
        <h1 className=" ld:text-3xl  text-xl font-bold text-[#5B112B] font-[Inter] text-center ">
          Rechercher Une Créche qui Satisfait Vos Besoins{" "}
        </h1>
        <div className=" ld:mx-[18%] md:mx-[14%] sm:mx-[10%]  xxs:mx-[2%]">
        <Searchbar />
        </div>
        <h2 className="ld:text-3xl text-xl font-semibold font-[inter] text-center mt-10 text-blue-950">
          Nos Creches les plus Appreciées
        </h2>
        <div>
          <CrecheSlider datas={JSON.parse(localStorage.getItem('searchDatam'))?.slice(0,7)} />
          <CrecheSlider datas={ JSON.parse(localStorage.getItem('searchDatam'))?.slice(7,13)}/>
          <CrecheSlider datas={JSON.parse(localStorage.getItem('searchDatam'))?.slice(13)}/>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Search;
