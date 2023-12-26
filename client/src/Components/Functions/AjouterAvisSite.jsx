import React from 'react'
import { useState } from 'react'

const AjouterAvisSite = () => {
  
  return (
    <>
      <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200n bg-gray-800n border-gray-700">
            <label for="comment" class="sr-only">Votre commentaire sur le site</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-nonen  placeholder-gray-400 "
                placeholder="Ecrire un commentaire..." required></textarea>
        </div>
        <a href='/AddCommentSuccess'><button type="submit"
            class="inline-flex items-center py-2.5 px-4 text-sm hover:scale-105 duration-300 font-medium text-center text-blue-950 hover:text-[#b32f2f] bg-primary-700 rounded-lg  hover:bg-primary-800">
           Poster 
        </button> </a>
    </form>
    </>
  )
}

export default AjouterAvisSite