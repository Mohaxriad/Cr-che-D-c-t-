
import React, { useState, useRef } from 'react';

const Toggle = () => {
    const [isOn, setIsOn] = useState(false);
    
      const handleToggle = () => {
        setIsOn(!isOn);
      };
  return (
    
    <>
             <div  >
         <label class="relative inline-flex items-center cursor-pointer">
       
            <input  type="checkbox" onChange={handleToggle} checked={isOn} value="" class="sr-only peer" />
            
          
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-rose-600"></div>
       
          </label>
 
        </div>
    </>
  )
}

export default Toggle
