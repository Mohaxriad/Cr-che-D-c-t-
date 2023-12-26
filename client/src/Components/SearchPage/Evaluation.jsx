import React from 'react'

import { useState } from 'react';
import { Star } from 'react-feather';
import { Rating } from 'flowbite-react';

const Evaluation = ({ numStars }) => {


  
      const stars = [];
    
      for (let i = 0; i < numStars; i++) {
        stars.push(<Rating.Star key={i} />);
      }
    
      return <div className=' mt-1 text-[#b5b32e]  '>{stars}</div>;
    };
    
    Rating.Star = ({ filled = true }) => (
      <span>{filled ? '⭐' : '☆'}</span>
    );
    


export default Evaluation