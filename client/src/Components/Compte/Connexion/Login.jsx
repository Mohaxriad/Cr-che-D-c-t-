import {React , useEffect , useRef , useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../Assets/Logo1.svg";
import Navbar from "../../Navigation/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LogoFloatingImage from "../../Functions/LogoFloatingImage";
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import LoginSuccess from "../../Functions/Success/LoginSuccess";
const LOGIN_URL = '/auth';


const Login = () => {
   
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword1, setShowPassword1] = useState(false);
  const togglePassword1Visibility = () => setShowPassword1(!showPassword1);

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');


useEffect(() => {
    emailRef.current.focus();
}, [])

useEffect(() => {
  setErrMsg('');
}, [email, password])


const [success, setSuccess] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const response = await axios.post (LOGIN_URL ,
  JSON.stringify({email,password}),
  {
    headers: {'Content-Type':'application/json'},
    withCredentials:true 
  }    
    );
    //console.log(JSON.stringify(response?.data) );
    
 
    
   
    const {accessToken} = response?.data;
    const {user} = response?.data;
   
    setAuth({user,accessToken})
    localStorage.setItem('user', JSON.stringify({ user }));
   setSuccess(true)
    setEmail('');
    setPassword('');
    
    
  }catch (err){
    if (!err?.response) {
      setErrMsg('No Server Response');
  } else if (err.response?.status === 400) {
      setErrMsg('Missing E-mail or Password');
  } else if (err.response?.status === 401) {
      setErrMsg('Unauthorized');
  } else if (err.response?.status===409) { 
     setErrMsg('Email taken');
  } else {
      setErrMsg('Login Failed');
  }
  errRef.current.focus();
}

  }


  return (
    <>  
    {success ? (
      <section>
        <LoginSuccess/>
      </section>
    ) : ( 
      <section>
      <div className=" max-w-[1240px] md:mt-[-60px] md:mx-auto  grid md:grid-cols-2 md:items-center md:justify-center ">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 md:w-[80%]  md:h-screen w-full lg:py-0">
            <div className="w-full bg-[#F5D5D5] rounded-xl ring ring-[#ff5b5b] shadow z-50  md:mt-0 md:max-w-md xl:p-0 hover:scale-105 duration-300">
              <div className="p-6 space-y-4 md:space-y-6 md:p-8">
                <h1 className=" welcome text-xl font-normal  leading-tight tracking-tight text-gray-900 sm:text-2xl ">
                  BIENVENUE !
                </h1>
                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                  <div>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-semibold text-[#0B0C38] "
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 ring ring-[#f67261] shadow-[-4.09869px_3.27895px_3px_rgba(0,0,0,0.25)]  sm:text-sm  rounded-xl block w-full p-2.5"
                      placeholder="nom@company.com"
                      required
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email}
                      ref={emailRef}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-semibold text-[#0B0C38]"
                    >
                      Mot de passe
                    </label>
                    <div className="mt-2 relative">
                    <input
                       type={showPassword1 ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 ring ring-[#f67261] shadow-[-4.09869px_3.27895px_3px_rgba(0,0,0,0.25)]  sm:text-sm  rounded-xl block w-full p-2.5 "
                      required
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password}
                      
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
                  <div className="flex items-center justify-center">
                   
                    <a
                      href="/ForgotPassword"
                      className="ld:text-sm text-xs font-semibold text-[#191A43] hover:underline "
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-[#191A42] bg-[#FD8C7D] ring ring-[#900606] font-semibold rounded-xl text-sm px-5 py-2.5 text-center  hover:scale-105 duration-300"
                  >
                    Se connecter
                  </button>
                  <p className="text-sm text-center font-medium  text-[#152071]">
                    Vous n'avez pas de compte ?{" "}
                    <a
                      href="/SignUp"
                      class="font-medium text-[#F16951] hover:underline "
                    >
                      Inscrivez-vous
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden    md:flex md:flex-col md:items-end   ">
          <LogoFloatingImage />
        </div>
      </div>
      </section>)}
    </>
  );
};

export default Login;
