import React, { Fragment } from "react";
import {CrecheSliderdata} from '../../data';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper-bundle.css';
import  { useRef } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Rating } from "flowbite-react";
import Evaluation from "./Evaluation";

SwiperCore.use([Navigation]);





const CrecheSlider = (props) => {
  const sliderRef = useRef();
  let a = props.datas?.length
  let b = props.datas?.length

  if(a>3){
    a = 3;
  }

  if(b>2){
    b = 2;
  }

 
  
  return (




    <div className="flex justify-center py-5 px-0  gap-8 items-center  ">
       <div className="hidden xs:block  xs:ml-1 ld:ml-5 z-50" >
          <button onClick={() => sliderRef.current?.slidePrev()} className="bg-[#FB9B90] ring  ring-rose-900  flex  justify-center items-center xxs:w-10 xxs:h-10 w-5 h-5 rounded-full  shadow focus:outline-none hover:bg-white hover:ring-blue-900 hover:scale-125 duration-300">
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
        className="mySwiper mx-[5px] "
        slidesPerView={3} spaceBetween={25}
        


        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          780: {
            slidesPerView: b,
            spaceBetween: 15,
          },
          1150: {
            slidesPerView: a  ,
            spaceBetween: 10,
          },


        }}
      >
       
        {props.datas?.map((slide, index) => {
        
         const  URL='/DescriptionCreche?name='+slide.nomCreche;
          return (

            <SwiperSlide key={index} className=" overflow-hidden h-100   ld:mx-auto xs:w-full    flex border-4 border-[rgb(250,100,100)]  my-4 bg-white shadow-[0px_4.39131px_17.5652px_rgba(158,158,158,0.25)] rounded-[12px]  " >
    
              <img className=" mx-auto mt-2 w-[80%] " src={CrecheSliderdata[0].image[0]} alt="" />
              <div className="flex text-left text-blue-950 justify-center text-xl sm:text-2xl font-bold py-2  ">{slide.nomCreche}</div>
              <div className="flex text-left text-blue-950 justify-center  font-bold ">{slide.commune} , {slide.wilaya}</div>
              <div className="flex text-left mt-3 justify-center font-semibold text-lg ld:text-xl text-[#f84c4c] ">{slide.tarifs} DA/Mois</div>
              <div className="mt-5 flex justify-center text-lg ld:text-2xl"><Evaluation numStars={slide.NoteEvaluationTotal}></Evaluation>  </div>
              <a href={URL} >
              <div className="flex  justify-center">
                <button className="bg-[#FB9B90] w-[60%] rounded-md font-bold my-6  py-2 ld:py-3 text-[#191A43] ring  ring-rose-900 hover:scale-110 duration-300"> Voir plus </button>
              </div>

              </a>

            </SwiperSlide>



          );
        })}

        

      </Swiper>

      <div className="hidden xs:block md:mr-1 ld:mr-5 z-50" >
          <button onClick={() => sliderRef.current?.slideNext()} className="  flex  justify-center items-center xxs:w-10 xxs:h-10 w-5 h-5 rounded-full bg-[#FB9B90] ring  ring-rose-900  shadow focus:outline-none hover:bg-white hover:ring-blue-900 hover:scale-125 duration-300">
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

    </div>
  );

};

export default CrecheSlider;