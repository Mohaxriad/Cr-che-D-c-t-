import NavBar from './navbar/NavBar';
import * as React from 'react';
import Table from './listcreches/List';



function Stat() {
    return (
        <div className=" min-h-screen min-w-screen App bg-[#FBEDEC] divide-x grid grid-cols-[auto,1fr] ">
          <div className="col-span-1">
            <NavBar />
          </div>
          <div className="col-span-1 min-h-screen min-w-screen  bg-[#FBEDEC] ">
            <Table />
          </div>
        </div>
      );
    
  }
  
  export default Stat;