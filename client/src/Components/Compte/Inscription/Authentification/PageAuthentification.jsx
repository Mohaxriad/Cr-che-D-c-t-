import React from "react";
import Navbar from "../../../Navigation/Navbar";

import Authentification from "./Authentification";

const PageAuthentification = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div>
        <Authentification />
        <div className="flex justify-center">
          <a href="/SignUpSuccess">
            {" "}
            <button
              type="submit"
              className="mt-10 rounded-lg bg-red-400 ld:px-12 ld:py-4  py-2 px-6  text-base ld:text-xl ring-2 ring-red-500  font-semibold text-white shadow-sm hover:bg-rose-900  hover:scale-105 duration-300"
            >
              Suivant
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default PageAuthentification;
