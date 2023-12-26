
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useState,useEffect } from "react";

const RequireAuth = ( {allowedRoles} ) => {
    
    
 let  login=0;
let allowed=0;

 
 let [storeUser, setStoreUser] = useState(JSON.parse(localStorage.getItem("user")));
 
if (storeUser!=null) {  login=1   
if( allowedRoles.includes(storeUser.user.roles) ) { allowed=1 }

}
   

    const location = useLocation();



    return (
         allowed
            ? <Outlet />
            : login 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;