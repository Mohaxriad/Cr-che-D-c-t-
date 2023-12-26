import React from "react";
import { useState } from "react";

const AjouterAvisCreche = () => {
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
            const fill =
              starValue <= rating ? "text-yellow-300 " : "text-gray-400";
            return (
              <button
                key={i}
                type="button"
                className={`text-3xl text-gray-400 ${fill}`}
                onClick={() => handleClick(starValue)}
              >
                ★
              </button>
            );
          })}
        </div>
      </form>
    );
  };
  return (
    <>
      <form class="mb-6">
        <div className="flex flex-row my-3">
          <h2 className="ld:text-xl text-lg font-semibold text-blue-950">
            Evaluer:{" "}
          </h2>
          <div className="ml-5 -mt-2">
            <StarRating />
          </div>
        </div>
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200n bg-gray-800n border-gray-700">
          <label for="comment" class="sr-only">
            Votre commentaire sur le site
          </label>
          <textarea
            id="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-nonen  placeholder-gray-400 "
            placeholder="Ecrire un commentaire..."
            required
          ></textarea>
        </div>
        <a href="/AddCommentCrecheSuccess">
          {/* <button type="submit"
          class="inline-flex items-center py-2.5 px-4 text-sm hover:scale-105 duration-300 font-medium text-center text-blue-950 hover:text-[#b32f2f] bg-primary-700 rounded-lg  hover:bg-primary-800">
         Poster 
      </button> */}
          <button type="button">Poster</button>
        </a>
      </form>
    </>
  );
};

export default AjouterAvisCreche;
