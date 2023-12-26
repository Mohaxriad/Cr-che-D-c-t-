import NavBar from './navbar/NavBar';
import LeftPart from './leftPart/LeftPart';
import RightPart from './rightPart/RightPart';
import AdminNavbar from '../../Navigation/Navbar';


function Stat() {
    return (
      <div className="App overflow-y-hidden bg-[#FBEDEC]">
       <AdminNavbar/>
       <div className='w-full min-h-[90vh] grid grid-cols-12'>
        
       <NavBar/>
       
       <div className='bg-[#FBEDEC] grid grid-cols-1 xl:grid-cols-5 col-span-10 w-full'>
        <LeftPart/>
        <RightPart/>
       </div>
       </div>
      </div>
    );
  }
  
  export default Stat;