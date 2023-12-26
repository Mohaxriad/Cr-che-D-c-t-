import React from "react";

import profil from "../assets/profil.svg";
import enfant from "../assets/enfants (1).svg";
import Navbar from "../../Navigation/Navbar";
import { Link } from "react-router-dom";

const Menu2 = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div>
        <h2 className="my-5  text-blue-950 font-semibold text-4xl text-center  ">
          Menu d'utilisation
        </h2>
        <div className="Menu py-10 ">
          <a href="/MesEnfants">
            {" "}
            <img
              src={enfant}
              alt="/"
              className="ld:hover:scale-105 duration-300"
            ></img>
          </a>
          <a href="/MonProfil">
            <img
              src={profil}
              alt="/"
              className="ld:hover:scale-105 duration-300"
            ></img>
          </a>
        </div>
      </div>
    </>
  );
};

export default Menu2;
