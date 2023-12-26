import React from "react";

import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import axios from "../../../../api/axios";

export default function MonProfilModif() {
  const [login, SetLogin] = useState(false);
  const [email, SetEmail] = useState("");
  const [username, SetUsername] = useState("");
  const [nom, SetNom] = useState("");
  const [prenom, SetPrenom] = useState("");
  const [telephone, SetTelephone] = useState("");
  const [adresse, SetAdresse] = useState("");
  const [codePostal, SetCodePostal] = useState("");
  const [commune, SetCommune] = useState("");
  const [wilaya, SetWilaya] = useState("");
  const [sexe, SetSexe] = useState("");
  const errRef = useRef();

  const [validTelephone, setValidTelephone] = useState(false);
  const [telephoneFocus, setTelephoneFocus] = useState(false);

  const [validCodePostal, setValidCodePostal] = useState(false);
  const [codePostalFocus, setCodePostalFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  let storeUser;
  useEffect(() => {
    storeUser = JSON.parse(localStorage.getItem("user"));

    if (storeUser != null) {
      SetLogin(true);
      SetAdresse(storeUser.user.adresse);
      SetCommune(storeUser.user.commune);
      SetCodePostal(storeUser.user.codePostal);
      SetNom(storeUser.user.nom);
      SetPrenom(storeUser.user.prenom);
      SetWilaya(storeUser.user.wilaya);
      SetTelephone(storeUser.user.telephone);
      SetEmail(storeUser.user.email);
      SetUsername(storeUser.user.username);
      SetSexe(storeUser.user.sexe);
    }
  }, []);

  const NUMVALID = /^0\d{9}$/;
  const CODEPOSTVALID = /^\d{5}$/;

  useEffect(() => {
    setValidTelephone(NUMVALID.test(telephone));
  }, [telephone]);

  useEffect(() => {
    setValidCodePostal(CODEPOSTVALID.test(codePostal));
  }, [codePostal]);

  useEffect(() => {
    setErrMsg("");
  }, [telephone, codePostal]);

  const refresh = useRefreshToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack

    const v4 = CODEPOSTVALID.test(codePostal);
    const v5 = NUMVALID.test(telephone);
    if (!v4 || !v5) {
      setErrMsg("Entrée invalide");
      return;
    }

    try {
      const newAccessToken = await refresh();

      const response = await axios.put(
        "auth/update",
        JSON.stringify({
          username,
          email,
          nom,
          prenom,
          adresse,
          telephone,
          wilaya,
          commune,
          codePostal,
          sexe,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );

      setSuccess(true);
      const user2 = response?.data.user2;

      //update user in loacal storage
      let storeUser = JSON.parse(localStorage.getItem("user"));

      storeUser.user.username = user2.username;
      storeUser.user.email = user2.email;
      storeUser.user.nom = user2.nom;
      storeUser.user.prenom = user2.prenom;
      storeUser.user.codePostal = user2.codePostal;
      storeUser.user.sexe = user2.sexe;
      storeUser.user.adresse = user2.adresse;
      storeUser.user.wilaya = user2.wilaya;
      storeUser.user.commune = user2.commune;
      storeUser.user.telephone = user2.telephone;
      storeUser.user.confirmationToken = user2.confirmationToken;

      let user = storeUser.user;
      localStorage.setItem("user", JSON.stringify({ user }));
      //relaod page
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="mx-[5%]">
        <form
          className="FormInscription  px-[10px] ld:p-[40px]"
          onSubmit={handleSubmit}
        >
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Nom
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => SetNom(e.target.value)}
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Prenom
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => SetPrenom(e.target.value)}
                  value={prenom}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Votre addresse de residence complete
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => SetAdresse(e.target.value)}
                  value={adresse}
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Code postal
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => SetCodePostal(e.target.value)}
                  value={codePostal}
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  aria-invalid={validCodePostal ? "false" : "true"}
                  aria-describedby="codepostnote"
                  onFocus={() => setCodePostalFocus(true)}
                  onBlur={() => setCodePostalFocus(false)}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p
                  id="codepostnote"
                  className={
                    codePostalFocus && codePostal && !validCodePostal
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  Code postal doit etre compose de 5 chiffres
                </p>
              </div>
            </div>

            <div className="sm:col-span-2 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Numero de telephone
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => SetTelephone(e.target.value)}
                  value={telephone}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="number"
                  aria-invalid={validTelephone ? "false" : "true"}
                  aria-describedby="telnote"
                  onFocus={() => setTelephoneFocus(true)}
                  onBlur={() => setTelephoneFocus(false)}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p
                  id="telnote"
                  className={
                    telephoneFocus && telephone && !validTelephone
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  Telephone non valide
                </p>
              </div>
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pseudo
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={(e) => SetUsername(e.target.value)}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="number"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end  pb-5 flex-col ld:flex-row  gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold pb-5 ld:pb-0 leading-6 text-blue-950 hover:text-red-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sauvgarder
            </button>
            <p
              ref={errRef}
              className={errMsg ? "errmsg mt-6" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
