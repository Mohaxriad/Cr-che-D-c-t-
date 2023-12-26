import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AjoutCommentaireCrecheSuccess = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="  mx-auto max-w-[300px] ld:max-w-[500px]">
        <div className="">
          <div className="bg-[#0d0d7bdc] flex flex-col mx-[5%]  ring-4  rounded-lg p-10 mt-[50px]">
            <h2 className="ld:text-xl text-base text-white text-center font-semibold">
              Commentaire ajoutèe avec succès
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center gap-x-6">
              <div className=" text-[#2b8a24] text-3xl mb-5 ring-[#1dea31] ring rounded-full">
                {" "}
                <BsCheckCircleFill />
              </div>
              <button
                type="button"
                className="rounded-md bg-[#0f0080] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-[#16c327] "
                onClick={() => navigate(-1)}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AjoutCommentaireCrecheSuccess;
