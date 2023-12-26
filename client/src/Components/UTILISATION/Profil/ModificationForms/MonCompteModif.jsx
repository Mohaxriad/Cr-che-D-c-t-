import { React, useState, useEffect, useRef } from "react";
import Navbar from "../../../Navigation/Navbar";
import PasswordInput from "../../../Functions/PasswordInput";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import useLogout from "../../../../hooks/useLogout";
const PASSWORDVALID = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const MonCompteModif = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const togglePassword1Visibility = () => setShowPassword1(!showPassword1);

  const [showPassword2, setShowPassword2] = useState(false);
  const togglePassword2Visibility = () => setShowPassword2(!showPassword2);

  const [showPassword3, setShowPassword3] = useState(false);
  const togglePassword3Visibility = () => setShowPassword3(!showPassword3);

  const errRef = useRef();

  const [oldpassword, setOldPassword] = useState("");

  const [newpassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [newpasswordFocus, setNewPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const logout = useLogout();

  useEffect(() => {
    setValidNewPassword(PASSWORDVALID.test(newpassword));
    setValidMatch(newpassword === matchPwd);
  }, [newpassword, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [newpassword, matchPwd]);

  const refresh = useRefreshToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = PASSWORDVALID.test(newpassword);
    const v2 = newpassword === matchPwd;

    if (!v1 || !v2) {
      setErrMsg("Entrée invalide");
      return;
    }

    try {
      const newAccessToken = await refresh();
      console.log(newAccessToken);
      const response = await axios.patch(
        "auth/changePassword",
        JSON.stringify({ oldPassword: oldpassword, newPassword: newpassword }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          logout();
          // clear the local storage and cookies
          localStorage.clear();
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Wrong password");
        console.log(err);
      }
      //   errRef.current.focus();
    }
  };

  return (
    <>
      <div className=" mx-[1%] ld:mx-[5%]">
        <form className="FormInscription  px-[10px] ld:p-[40px]">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-5">
              <label
                htmlFor="old-pswd"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe Actuel
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    name="old-pswd"
                    id="old-pswd"
                    autoComplete="password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-700"
                      onClick={togglePassword1Visibility}
                    >
                      {showPassword1 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-5 ">
              <label
                htmlFor="new-pswd"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nouveau Mot de passe
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newpassword}
                    required
                    aria-invalid={validNewPassword ? "false" : "true"}
                    aria-describedby="new-pswd"
                    onFocus={() => setNewPasswordFocus(true)}
                    onBlur={() => setNewPasswordFocus(false)}
                    name="new-pswd"
                    id="new-pswd"
                    autoComplete="password"
                    type={showPassword2 ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-700"
                      onClick={togglePassword2Visibility}
                    >
                      {showPassword2 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
              <p
                id="new-pswd"
                className={
                  newpasswordFocus && newpassword && !validNewPassword
                    ? "instructions max-w-xs justify-self-center"
                    : "offscreen"
                }
              >
                Le mot de passe doit etre compose de 8 caracteres, une lettre
                majuscule, une lettre miniscule et un chiffre.
              </p>
            </div>

            <div className="sm:col-span-5 ">
              <label
                htmlFor="newPswdConfirmation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirmez le nouveau mot de passe
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="newPswdConfirmation"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    name="newPswdConfirmation"
                    id="newPswdConfirmation"
                    autoComplete="password"
                    type={showPassword3 ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-700"
                      onClick={togglePassword3Visibility}
                    >
                      {showPassword3 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
              <p
                id="newPswdConfirmation"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                Le mot de passe n'est pas identique
              </p>
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
              onClick={handleSubmit}
              className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <a>Sauvgarder</a>
            </button>
          </div>
        </form>
      </div>
      {success && (
        <div className="popup">
          <p>Password changed successfully!</p>
        </div>
      )}
    </>
  );
};

export default MonCompteModif;
