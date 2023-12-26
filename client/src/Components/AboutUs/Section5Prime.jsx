import React from 'react'
import { Carousel } from "flowbite-react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {RiErrorWarningFill} from 'react-icons/ri'
import PopUp from '../Functions/PopUp';
const posts = [
    {
      nbAvis: 0,
  
      description:
        " Ce site est une véritable aubaine pour les parents qui cherchent une crèche pour leur enfant. Il est très facile à utiliser et propose une grande variété d'options de recherche pour trouver la crèche idéale",
      datetime: "2020-03-16",
      author: {
        name: "Michael Pitchar",
      },
    },
    {
      nbAvis: 1,
  
      description:
        " La plateforme est facile à naviguer et m'a permis de trouver rapidement une liste de crèches qui correspondaient à mes critères de recherche.",
      datetime: "2020-03-16",
  
      author: {
        name: "Rayane Remadna",
      },
    },
    {
      nbAvis: 2,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      datetime: "2020-03-16",
  
      author: {
        name: "Riad Brahimi",
      },
    },
    {
      nbAvis: 3,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      datetime: "2020-03-16",
  
      author: {
        name: "kader",
      },
    },
    {
      nbAvis: 4,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      datetime: "2020-03-16",
  
      author: {
        name: "raouf",
      },
    },
    {
      nbAvis: 5,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      datetime: "2020-03-16",
  
      author: {
        name: "wassim",
      },
    },
    {
      nbAvis: 6,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      datetime: "2020-03-16",
  
      author: {
        name: "Riad Brahimi",
      },
    },
    {
      nbAvis: 7,
  
      description:
        " Ce site est une véritable aubaine pour les parents qui cherchent une crèche pour leur enfant. Il est très facile à utiliser et propose une grande variété d'options de recherche pour trouver la crèche idéale",
      datetime: "2020-03-16",
      author: {
        name: "Michael Pitchar",
      },
    },
    {
      nbAvis: 8,
  
      description:
        " La plateforme est facile à naviguer et m'a permis de trouver rapidement une liste de crèches qui correspondaient à mes critères de recherche.",
      datetime: "2020-03-16",
  
      author: {
        name: "Rayane Remadna",
      },
    },
    // More posts...
  ];

const Section5Prime = () => {
    function Delete() {  
 
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
    
    <button type='button'
        onClick={() => { openPopup();   }}
          
      className='py-1 ld:py-2 ld:px-3 px-1 ld:mr-5 mr-3  bg-[#ab1a1a] text-white font-semibold rounded ring-2 ring-[red] hover:scale-105 duration-300 hover:bg-[red] '>
        Supprimer</button>
    
        )}
        </div>
            {showPopup && <PopUp content={<>
              <div className="  mx-auto max-w-[300px] ld:max-w-[500px]">
                <div className="">
                  <div className=" flex flex-col mx-[5%]  ring-4  rounded-lg p-10 mt-[50px]">
                    <h2 className="ld:text-xl text-base text-blue-950 text-center font-semibold">
                  Etes vous sur de vouloir supprimer cet item ?
                    </h2>
        
                    <div className="mt-6 flex flex-col items-center justify-center gap-x-6">
                     <div className=" text-[#8a2424] text-4xl mb-5 ring-[#ea1d1d] ring rounded-full"> <RiErrorWarningFill/></div>
                    <div className="flex flex-row ">
                     <button
                        type="submit"
                        className="rounded-md bg-[#0f0080] mr-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                      >
                        <a href="/Nous">Annuler</a>
                      </button>
                   
                      <button
                        type="submit"
                        className="rounded-md ml-3 bg-[#800000] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                      >
                        <a href="/AboutUs">Supprimer</a>
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
        <div className="bg-[#ffd2cf] py-24 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold font-[Inter] tracking-tight text-blue-950 sm:text-4xl">
                Vos retours sur notre site
              </h2>
              <p className="mt-2 text-lg leading-8 text-blue-950">
                Commentaires et avis
              </p>
            </div>
    
            <div className="   gap-4 h-[510px] ld:h-96 max-w-[1400px]  bg-[#fdbdbc]  rounded-xl ">
              <Carousel slideInterval={8000}>
              <div className="flex ld:flex-row flex-col mx-auto">
                  {posts.slice(8, 9).map((post) => (
                    <div className="ld:mx-16 my-10">
                      <article
                        key={post.nbAvis}
                        className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.datetime}
                          </time>
                        </div>
                        <div className="relative mt-3 flex items-center gap-x-4">
                          {/* <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    /> */}
                          <UserCircleIcon
                            className="h-11 w-11 text-gray-700 "
                            aria-hidden="true"
                          />
                          <div className="   leading-4">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-blue-950">{post.author.role}</p>
                          </div>
                        </div>
    
                        <div className="group relative">
                          <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                            {post.description}
                          </p>
                        </div>
                        
                      </article>
                      <div className='flex justify-end'>
                      <Delete/>
</div>                    
                    </div>
                  ))}
                </div>
                <div className="flex ld:flex-row flex-col mx-auto">
                  {posts.slice(0, 2).map((post) => (
                    <div className="ld:mx-16 my-10">
                      <article
                        key={post.nbAvis}
                        className="  flex max-w-[600px] text text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        <div className="flex items-center gap-x-4 ">
                          <time dateTime={post.datetime} className="text-gray-500">
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
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-blue-950">{post.author.role}</p>
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
                  
                  {posts.slice(2, 4).map((post) => (
                   post.nbAvis !== 0 ? (
                      <div className="ld:mx-16 my-10">
                      <article
                        key={post.nbAvis}
                        className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.datetime}
                          </time>
                        </div>
                        <div className="relative mt-3 flex items-center gap-x-4">
                          {/* <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    /> */}
                          <UserCircleIcon
                            className="h-11 w-11 text-gray-700 "
                            aria-hidden="true"
                          />
                          <div className="   leading-4">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-blue-950">{post.author.role}</p>
                          </div>
                        </div>
    
                        <div className="group relative">
                          <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                            {post.description}
                          </p>
                        </div>
                      </article>
                    </div> 
                   ) :  (<div>fin
                    </div>)
                    
                  ))}
                </div>
                <div className="flex ld:flex-row flex-col mx-auto">
                  {posts.slice(4, 6).map((post) => (
                    <div className="ld:mx-16 my-10">
                      <article
                        key={post.nbAvis}
                        className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.datetime}
                          </time>
                        </div>
                        <div className="relative mt-3 flex items-center gap-x-4">
                          {/* <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    /> */}
                          <UserCircleIcon
                            className="h-11 w-11 text-gray-700 "
                            aria-hidden="true"
                          />
                          <div className="   leading-4">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-blue-950">{post.author.role}</p>
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
                  {posts.slice(6, 8).map((post) => (
                    <div className="ld:mx-16 my-10">
                      <article
                        key={post.nbAvis}
                        className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.datetime}
                          </time>
                        </div>
                        <div className="relative mt-3 flex items-center gap-x-4">
                          {/* <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    /> */}
                          <UserCircleIcon
                            className="h-11 w-11 text-gray-700 "
                            aria-hidden="true"
                          />
                          <div className="   leading-4">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-blue-950">{post.author.role}</p>
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
              {/* <Carousel >
    
              
      </Carousel> */}
            </div>
          </div>
        </div>
      );
    }
export default Section5Prime