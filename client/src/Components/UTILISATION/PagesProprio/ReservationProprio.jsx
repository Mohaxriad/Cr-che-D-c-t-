import React from "react";
import Navbar from "../../Navigation/Navbar";
import Footer from "../../HomePage/Footer";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PopUp from "../../Functions/PopUp";
import { useRef, useState } from "react";
import { CrecheUserx } from "../../../data";
import { Accordion } from "flowbite-react";
import axios from "../../../api/axios";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { useEffect } from "react";

const ReservationProprio = () => {


  const refresh = useRefreshToken()
  /*const User = {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    Tel: "0563748202",
  };*/

  const User = JSON.parse(localStorage.getItem('user'))

  const[parentRes,setParentRes]=useState([])

  useEffect(() => {
    async function getData(){
       const newAccessToken = await refresh();
       const response = await axios.get('../reservation/proprio',
       {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        },
        withCredentials: true,
      })
      
        console.log(response.data)
        setParentRes(response.data)
      }
      getData();
  }, []);

  const UserProprio = {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    Tel: "0563748202",

    CrechesProprio: [
      {
        nameCreche: "Les Anges",
        Client: [
          {
            name: "Cerine Benghanemr",
            email: "Cerine.Benghanem@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Kader Taibi",
            email: "Kader.Taibi@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Taibi",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "13/07/2023",
              },

              {
                nom: "Taibi",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "13/07/2023",
              },
            ],
          },
          {
            name: "Rayane Remadna",
            email: "Rayane.Remadna@example.com",
            Tel: "0563748202",
            Jour: "22/05/2023",

            Enfants: [
              {
                nom: "Remadna",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "22/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "22/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "22/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "22/05/2023",
              },
            ],
          },
        ],
      },
      {
        nameCreche: "Mini World",
        Client: [
          {
            name: "Cerine Benghanemr",
            email: "Cerine.Benghanem@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Benghanem",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Jamal Bouchendouka",
            email: "Jamal.Bouchendouka@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Bouchendouka",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
        ],
      },
      {
        nameCreche: "Le jardin des merveilles",
        Client: [
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
              {
                nom: "Remadna",
                prenom: "Wassim",
                Sexe: "Garcon",
                Age: "5",
                Jour: "12/05/2023",
              },
              {
                nom: "Bouchendouka",
                prenom: "yacine",
                Sexe: "Gracon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
        ],
      },
      {
        nameCreche: " EL Tofoula",
        Client: [
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
          {
            name: "Leslie Alexander",
            email: "leslie.alexander@example.com",
            Tel: "0563748202",

            Enfants: [
              {
                nom: "Benghanem",
                prenom: "Ines",
                Sexe: "Fille",
                Age: "4",
                Jour: "12/05/2023",
              },
              {
                nom: "Taibi",
                prenom: "Riyad",
                Sexe: "Garcon",
                Age: "3",
                Jour: "12/05/2023",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <h2 className="my-5 text-center text-3xl font-bold text-rose-900 ">
        Nouvelles reservations
      </h2>
      <ul role="list" className="mx-[2%] sm:mx-[10%] ld:mx-[20%]">
       {parentRes?.map((Creche) => (
          <li
            key={User.user.email}
            className=" mt-5 pt-10  pb-8 px-10 ring ring-[#ff7171] rounded-lg bg-[#ffc6c6] "
          >
            <div className="flex justify-between -mx-2">
              <div className="flex gap-x-4">
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={User.imageUrl} alt="" /> */}
                <UserCircleIcon
                  className="h-12 w-12 text-[#000000] "
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-auto">
                  <h2 className="text-lg text-rose-900 font-semibold">
                    Vos Informations
                  </h2>
                  <p className="text-sm font-semibold leading-6 text-blue-950">
                    {User.user.nom}
                  </p>
                  <p className="mt-1 font-semibold  truncate text-sm leading-6 text-blue-950">
                    {User.user.email}
                  </p>
                  <p className="mt-1 font-semibold  truncate text-sm leading-8 text-blue-950">
                    {User.user.telephone}
                  </p>
                </div>
              </div>
              {/* {Creche.Enfant.map((Creche) => ( */}
              <div className="hidden sm:flex sm:flex-col ">
                <p className="text-lg font-semibold  leading-6 text-blue-950">
                  {/* {CrechesProprio.nom} */}
                </p>

                <p className="mt-1 text-lg font-semibold  leading-6 text-blue-950">
                  {/* {CrechesProprio.prenom} */}
                </p>
                <p className="mt-1 text-lg font-semibold  leading-6 text-blue-950">
                  {/* {CrechesProprio.Age} */}
                </p>
                <p className="mt-1 text-lg font-semibold  leading-6 text-blue-950">
                  {/* {CrechesProprio.Sexe} */}
                </p>
                {/* <p className="text-lg mt-5 leading-6 font-bold text-[#ff4242]">
                        <span className="text-blue-950 font-semibold">Creche : </span>
                        {Creche.nameCreche}
                      </p> */}
              </div>
              {/* ))} */},
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-lg  font-bold text-[#ff4242]">
                  <span className="text-blue-950 font-semibold">Creche : </span>
                  {Creche.creche.nomCreche}
                </p>
              </div>
            </div>

            <Accordion flush={true} alwaysOpen={false}>
              <Accordion.Panel>
                <Accordion.Title>
                  <h2 className="text-lg font-semibold  text-[#e83775]">
                    {" "}
                    Les reservations{" "}
                  </h2>
                </Accordion.Title>
                <Accordion.Content>
                 
                    <>
                      <div className=" mt-5 pb-5 -mx-7">
                        <div className="flex gap-x-4">
                          {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={User.imageUrl} alt="" /> */}
                          {/* <UserCircleIcon
        className="h-12 w-12 text-[#000000] "
        aria-hidden="true"
      /> */}
                          <div className="min-w-0 ld:flex-row flex-col">
                            <h2 className="text-lg text-rose-900 font-semibold">
                              Informations du client
                            </h2>
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {Creche.parent.nom}
                            </p>

                            <p className="mt-1 font-semibold  truncate text-sm leading-8 text-blue-950">
                              {Creche.parent.telephone}
                            </p>
                            <p className="mt-1 font-semibold truncate text-sm leading-6 text-blue-950">
                              {Creche.parent.email}
                            </p>
                          </div>
                        </div>
                        <Accordion flush={true} alwaysOpen={false}>
                          <Accordion.Panel>
                            <Accordion.Title>
                              <h2 className="text-lg font-semibold text-[#e83775] ">
                                {" "}
                                Les enfants du client
                              </h2>
                            </Accordion.Title>
                            <Accordion.Content>
                              
                                <>
                                  <div className="mt-5 pb-5 -mx-5">
                                    <div className="flex flex-col md:flex-row md:gap-x-4">
                                      <div className="min-w-0 flex-auto">
                                        <h2 className="text-lg text-[#ff4242] font-semibold">
                                          Informations de l'enfant
                                        </h2>
                                        <div className="ld:grid-cols-2 ld:grid">
                                          <div>
                                            <p className="mt-1 text-sm font-semibold leading-6 text-blue-950">
                                              <span className="text-gray-900">
                                                {" "}
                                                Nom :{" "}
                                              </span>
                                              {Creche.enfant.nom}
                                            </p>
                                            <p className="mt-1 font-semibold  truncate text-sm leading-6 text-blue-950">
                                              <span className="text-gray-900">
                                                {" "}
                                                Prenom :{" "}
                                              </span>
                                              {Creche.enfant.prenom}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="mt-1 font-semibold  truncate text-sm leading-6 text-blue-950">
                                              <span className="text-gray-900">
                                                {" "}
                                                Age :{" "}
                                              </span>
                                              {Creche.enfant.age}
                                            </p>
                                            <p className="mt-1 font-semibold  truncate text-sm leading-6 text-blue-950">
                                              <span className="text-gray-900">
                                                {" "}
                                                Sexe :{" "}
                                              </span>
                                              {Creche.enfant.sexe}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className=" flex mt-5 md:mt-0 flex-col items-end">
                                        <p className="text-lg  font-bold text-[#ff4242]">
                                          <span className="text-blue-950 text-md font-bold">
                                            Date de reservation :{" "}
                                          </span>
                                          {new Date(Creche.dateDebut).toISOString().substr(0, 10)}
                                        </p>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                          <button
                                            type="submit"
                                            className="text-sm rounded-md ring-2 ring-[#091098] px-4 py-1.5 bg-[#d81b1b] font-semibold leading-6 text-white hover:bg-[red] hover:scale-105 duration-100 "
                                          >
                                            <a>Refuser</a>
                                          </button>
                                          <button
                                            type="submit"
                                            className="rounded-md bg-[#1aea1a] px-3 py-2 text-sm font-semibold text-blue-950 shadow-sm hover:bg-[#28ff28] hover:scale-105 duration-100 ring-2 ring-[#091098] "
                                          >
                                            <a>Accepter</a>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                             
                            </Accordion.Content>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </>
               
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </li>
        ))}
      </ul>
     
    </>
  );
};

export default ReservationProprio;
