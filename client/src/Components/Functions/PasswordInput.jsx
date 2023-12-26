import React from 'react'
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
    return (
     <div className='mt-2'>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
         <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <button
            type="button"
            className="text-gray-500 focus:outline-none focus:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        </div>
      </div>
    );
  }

export default  PasswordInput 