import React from "react";
import Chart2 from "./chart2/chart2";



function RightPart() {
  return (
    <div className="col-span-3 items-start justify-start flex flex-col w-full pt-12 pb-6">
      {/* top section */}

      <div className="border-t border-gray-200 w-full my-4" />
      {/* bottom part */}
      <div className="w-full items-start justify-start flex flex-col  ld:px-12 py-2 ">
        <h2 className="text-xl text-blue-950 font-bold xl:text-3xl py-4 "> Les crèches mieux notés </h2>
        <Chart2/>
      </div>
    </div>
  );
}

export default RightPart;
