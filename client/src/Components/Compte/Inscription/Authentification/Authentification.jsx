import React from "react";

import { Link } from "react-router-dom";

function Authentification() {
  return (
    <>
      <div className="titre">
        <h2 className=" text-2xl ld:text-4xl font-bold">Authentification</h2>
      </div>

      <div className="auth">
        <div className="mt-5 titre">
          <h2 className="text-center ld:text-xl text-base font-semibold">
            Verifiez votre boite mail avec un numero qui vous a etait envoyee
            par mail
          </h2>
        </div>
        <div className="code mt-5 flex justify-center">
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            type="text"
            name="Number"
            id="ConfirmationCode"
            autoComplete="number"
            className=" rounded-xl border-0 mt-5  text-gray-900 shadow-sm ring-2 ring-inset ring-red-400  focus:ring-2  text-center  py-3 ld:py-5   md:px-10 "
          ></input>
     
        </div>
        <div className="footerAuth  ">
          <button
            type="submit"
            className=" mt-4 font-semibold ld:text-xl text-lg text-blue-950 hover:text-rose-900"
          >
            Renvoyer le code
          </button>

        </div>
      </div>
    </>
  );
}

export default Authentification;
