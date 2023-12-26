import React from "react";
import Navbar from "../../Navigation/Navbar";
import Footer from "../../HomePage/Footer";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper-bundle.css';
import { useEffect,useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FaCalendarAlt } from "react-icons/fa";
import PopUp from "../../Functions/PopUp";
import AccordionRDV from "../../PagesAccordions/AccordionRDV";
import AccordionModifInfoMesCreches from "../../PagesAccordions/AccordionModifInfoMesCreches";
import { Carousel } from "flowbite-react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import AjouterAvisCreche from "../../Functions/AjouterAvisCreche";
import Evaluation from "../../SearchPage/Evaluation";
import { CrecheSliderdata } from "../../../data";
SwiperCore.use([Navigation]);

const PageRdv = (props) => {
  const sliderRef = useRef();
  const Images = CrecheSliderdata[0].image;//props.image;
  const Avis = CrecheSliderdata[0].Avis;//props.Avis;
  const NoteC = props.Note;

  const URLBack='/DescriptionCreche?name='+props.name


  const rdvRef = useRef(null);

  useEffect(() => {
    rdvRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  
 
  return (
    <>
   
      <div>
    <nav>
      <Navbar />
    </nav>
    {/* <div>
      <HeaderDescription />
</div> */}

 

    {/* <FixedButton/> */}



    <h2 className=" mt-10 text-center text-2xl font-bold font-[Inter]  tracking-tight text-blue-950 sm:text-3xl">
            Consulter les details concernant cette creche
          </h2>
          
    <div className="ring-4 rounded-xl ring-[#fc8280] mx-[1%] my-10 bg-rose-100 p-5 ld:mx-[10%]">
   <div className="flex justify-center"> <h1 className="text-3xl font-semibold font-[Inter] tracking-tight text-blue-950 sm:text-4xl">

        {props.name}
        
        </h1>
        </div>
        <div className="mt-3 flex justify-center ld:text-2xl text-lg"><Evaluation numStars={NoteC}></Evaluation>  </div>
    <div className="mt-[3%] mx-[0.5%] xs:mx-[2%] xs:px-2 ld:mx-[5%] xl:mx-[8%]  sm:px-5  my-10 rounded-lg border-4 border-[#fc8280] py-5 bg-[#f1c1c0]">
      <div className="px-4 sm:px-0">




        {/* Swipppper des images d'une creche  */}


        <h1 className=" text-2xl ld:text-3xl  leading-7 text-rose-950">
          Description de la creche
        </h1>
        

      </div>
      <div className="mt-6  ">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Nom du propriétaire
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.proprio}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Addresse
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.adr}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Type d'etablissement
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.TypeEtab}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Type d'accueil
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.TypeAcc}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Type de pedagogie
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Peda}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Age d'accueil
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              entre {props.MinAge} et {props.MaxAge} ans
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Capacites d'accueil
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Capacite} places
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Places disponibles
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.PlaceDispo} places
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Jours d'accueil
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-bold sm:col-span-2 sm:mt-0">
              <ul className="flex flex-row">
                <div>
                  <li>Dimanche : </li>

                  <li>Lundi    : </li>
                  <li>Mardi    : </li>
                  <li>Mercredi : </li>
                  <li>Jeudi    : </li>
                  <li>Vendredi    : </li>
                  <li>Samedi    : </li>
                </div>
                <div className="ml-3 font-medium">
                  <li>{props.hdim1} - {props.hdim2} </li>
                  <li>{props.hlun1} - {props.hlun2} </li>
                  <li>{props.hmar1} - {props.hmar2} </li>
                  <li>{props.hmer1} - {props.hmer2} </li>
                  <li>{props.hjeu1} - {props.hjeu2} </li>
                  <li>{props.hven1} - {props.hven2} </li>
                  <li>{props.hsam1} - {props.hsam2} </li>

                </div>
              </ul>
            </dd>
          </div>



          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Services proposes
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              <ul>
                <li>- Alimentation </li>
                <li>- Transport </li>
                <li>- Présence du Médecin </li>
                <li>- Prendre en charge les enfants handicapés </li>
                <li>- Classes préparatoires </li>
              </ul>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">


            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Email address
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Numero de telephone de la creche
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Tel}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              Paiement mensuel
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Paiement} DA
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-rose-500 ld:text-rose-950">
              A propos
            </dt>
            <dd className="mt-1 text-md leading-6 text-blue-950 font-semibold sm:col-span-2 sm:mt-0">
              {props.Description}
            </dd>
          </div>

        </dl>

    


      </div>

    </div>
        {/* images des creches */}
           {/* images des creches */}
           <div>
      <h1 className="text-center mt-14 text-3xl font-bold font-[Inter]  tracking-tight text-blue-950 md:text-4xl"> Images </h1>
      {/* Swiper */}
      {/* <div className="flex  mx-auto max-w-[1050px] mt-7 py-5 px-0  gap-2 pio:gap-4 sm:gap-8  items-center  ">
        <div className="flex xxs:ml-[5%] ml-[1%]  " >
          <button onClick={() => sliderRef.current?.slidePrev()} className="bg-red-100   flex  justify-center items-center xxs:w-10 xxs:h-10 w-5 h-5 rounded-full ring ring-[#fc8280] shadow focus:outline-none hover:bg-white hover:ring-rose-900 hover:scale-125 duration-300">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              class="chevron-left w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <Swiper freeMode={true} grabCursor={true}
          Pagination={true}


          onSwiper={it => (sliderRef.current = it)} modules={[Navigation]}
          className="mySwiper bg-[#fdbdbc] w-[100%] rounded-xl ring-4  ring-[#fc8280]  "
          slidesPerView={1} spaceBetween={25}



          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            567: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            808: {
              slidesPerView: 1,
              spaceBetween: 25,
            },


          }}
        >

          {Images.map((slide, index) => {


            return (

              <SwiperSlide key={index} className="   mx-auto   flex   my-4 bg-whtie      " >

                <img className=" mx-auto mt-2  w-[95%] " src={Images[index]} alt="" />




              </SwiperSlide>



            );
          })}



        </Swiper>


        <div className="flex xxs:mr-[5%] mr-[1%] " >
          <button onClick={() => sliderRef.current?.slideNext()} className="bg-red-100 ring ring-[#fc8280]   flex  justify-center items-center xxs:w-10 xxs:h-10 w-5 h-5 rounded-full shadow focus:outline-none hover:bg-white hover:ring-rose-900 hover:scale-125 duration-300">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              class="chevron-right w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
         
 <div>
 <div>
      */}
      <div>
      <h1 className="text-center mt-14 text-2xl sm:text-3xl  font-bold font-[Inter]  tracking-tight text-blue-950 ld:text-4xl"> Images </h1>

      <div className="mt-5 mx-auto max-w-[800px] bg-[#fdbdbc]  rounded-xl ring-4 p-1 sm:p-2 ld:p-5 ring-[#fc8280] w-[100%] h-64 ld:h-80 xl:h-[450px]">
        
  <Carousel >
  {Images.map((slide, index) => {


return (

 

    <img className=" mx-auto   w-[90%] " src={Images[index]} alt="" />




)})}
  </Carousel>
</div>
</div>
      {/* Fin swiper */}
      </div>
    {/* Fin Images des creches*/}



    </div>
   
   {/* debut espace localisation */}
    <div>
      <h2 className="text-2xl ld:text-3xl font-bold font-[Inter] tracking-tight text-blue-950 text-center my-10 sm:text-4xl">
        Geolocalisation de la creche
      </h2>
      <div className="flex justify-center mx-[10%]  rounded-xl ring-4 bg-[#f7d7d6] ring-[#fc8280] px-2 py-5  mb-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.97278256306!2d3.0813428!3d36.723214899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faddf7f824d7f%3A0xfb77ea53037312b2!2sCreche%20Amoula!5e0!3m2!1sfr!2sdz!4v1682460139044!5m2!1sfr!2sdz"

          className=" max-w-[1000px] w-[95%]  xxs:h-[360px] md:h-[550px] "
          allowfullscreen=""
          loading="eager"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>


    </div>
    <div ref={rdvRef} id="RDV" >
  
    <div id='RDV' className=" mt-[40px] 3xs:mx-[1%] sm:mx-[6%] ld:mx-[10%]">
     <AccordionRDV id={props.id} proprio={props.Idproprio}/>
   
    </div>
    <div className="mt-6 flex items-center justify-center gap-x-6">
      <a href={URLBack}>  <button
          type="button"
          // className="text-sm font-semibold leading-6 text-blue-950 hover:text-red-500"
          className="rounded-md bg-red-400 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Annuler
        </button></a>
       
      </div>
      </div>
   


      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="mx-auto text-center lg:mx-0">
        
            <h2 className="text-2xl ld:text-3xl font-bold font-[Inter]  tracking-tight text-blue-950 sm:text-4xl">
              Consulter les retours de nos utilisateurs sur cette creche
            </h2>
            
          </div>
          <div className=" my-5 flex justify-start text-center ">
            <h2 className=" text-2xl text-rose-900 font-semibold ">Note gloable : </h2><div className="ml-2 text-xl"><Evaluation numStars={NoteC}  ></Evaluation> </div> </div>

      <div>
        <AjouterAvisCreche/>
        </div> 
          
        <div className="   gap-4 h-[520px] ld:h-96 max-w-[1400px]  bg-[#fdbdbc]  rounded-xl ">
          <Carousel slideInterval={8000}>
            <div className="flex ld:flex-row flex-col py-4 mx-auto">
              {Avis.slice(0, 2).map((post) => (
                <div className="ld:mx-16 my-12">
                  <article
                    key={post.id}
                    className="  flex max-w-[600px] text text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time  className="text-gray-500">
                        {post.datetime}
                      </time>
                    </div>
                    <div className="relative mt-3 flex items-center gap-x-4">
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          
                            <span className="absolute inset-0" />
                            {post.author.name}
                          
                        </p>
                        <div className="mt-1  text-base ld:text-lg"><Evaluation numStars={post.Note}></Evaluation>  </div>
                      
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              {Avis.slice(2, 4).map((post) => (
                <div className="ld:mx-16 my-10">
                  <article
                    key={post.id}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">
                        {post.datetime}
                      </time>
                    </div>
                    <div className="relative mt-3 flex items-center gap-x-4">
                  
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          
                            <span className="absolute inset-0" />
                            {post.author.name}
                       
                        </p>
                        <div className="mt-1  text-base ld:text-lg"><Evaluation numStars={post.Note}></Evaluation>  </div>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              {Avis.slice(4, 6).map((post) => (
                <div className="ld:mx-16 my-10">
                  <article
                    key={post.id}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time  className="text-gray-500">
                        {post.datetime}
                      </time>
                    </div>
                    <div className="relative mt-3 flex items-center gap-x-4">
                      
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          
                            <span className="absolute inset-0" />
                            {post.author.name}
                       
                        </p>
                        <div className="mt-1  text-base ld:text-lg"><Evaluation numStars={post.Note}></Evaluation>  </div>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              {Avis.slice(6, 8).map((post) => (
                <div className="ld:mx-16 my-10">
                  <article
                    key={post.id}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time  className="text-gray-500">
                        {post.datetime}
                      </time>
                    </div>
                    <div className="relative mt-3 flex items-center gap-x-4">
                      
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          
                            <span className="absolute inset-0" />
                            {post.author.name}
                        
                        </p>
                        <div className="mt-1  text-base ld:text-lg"><Evaluation numStars={post.Note}></Evaluation>  </div>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </Carousel>
     
   
 
        </div>
        </div>
      </div>




   


    <Footer />
    </div>
  </>
);
}



export default PageRdv;