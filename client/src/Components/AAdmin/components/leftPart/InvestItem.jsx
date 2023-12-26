import React from "react";

function InvestItem({ item }) {
  const { title, desc, icon, upOrDown, percent, price } = item; //destructioring
  return (
    <div className="w-full py-2 px-2 items-cener justify-between flex">
      {/* icon + text */}
      <div className="flex items-center justify-center space-x-4 w-full  ">
        <div className="bg-[#ffb1b1] rounded-full py-2 px-2 hover:scale-110 duration-300">
          <span>{icon}</span>
        </div>
        <div className="w-full space-y-1">
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm">{desc}</p>
        </div>
      </div>
      {/* price + percent */}
      <div className="w-full items-end justify-end flex flex-col ">
        <h1 className="ld:text-xl text-blue-950 hover:scale-110 duration-300">{price}</h1>
        <p
          className={`${upOrDown === "up" ? "text-green-400" : "text-red-400"}`}
        >
          {percent}
        </p>
      </div>
    </div>
  );
}

export default InvestItem;
