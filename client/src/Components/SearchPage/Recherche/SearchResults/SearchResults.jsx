import React from "react";
import Navbar from "../../../Navigation/Navbar";
import Searchbar from "../Searchbar";

import CrecheSlider from "../../CrecheSlider";
import Footer from "../../../HomePage/Footer";


const SearchResults = () => {
  const searchData = JSON.parse(localStorage.getItem('searchData'));
  const midpoint = Math.floor(searchData.length / 2);
  const firstHalf = searchData.slice(0, midpoint+1);
  const secondHalf = searchData.slice(midpoint+1);
  let content
  if(searchData.length<=3){
    content = (<><CrecheSlider datas={searchData}/></>)

  }else{
    content = (<>  <CrecheSlider datas={firstHalf}/>
    <CrecheSlider datas={secondHalf}/></>)
  }
 

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-[1300px] mx-auto ">
        <Searchbar />
      </div>
       <div className="flex">
      <h2 className="text-4xl mx-auto justify-self-center font-inter text-rose-950 my-5 font-semibold" >Les resultats de votre recherche : </h2>
      </div>
     {content}
<footer className="mt-5">
  <Footer/>
</footer>
    
    </>
  );
};

export default SearchResults;
