import { useState } from 'react';
import react from 'react';


const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`You rated this product ${rating} out of 5 stars.`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          const fill = starValue <= rating ? 'text-[#FFD700] ' : 'text-gray-400';
          return (
            <button
              key={i}
              className={`text-3xl text-gray-600 ${fill}`}
              onClick={() => handleClick(starValue)}
            >
                ★
            </button>
          );
        })}
      </div>
      <button type="submit">Poster</button>
    </form>
  );
};

export default StarRating;




