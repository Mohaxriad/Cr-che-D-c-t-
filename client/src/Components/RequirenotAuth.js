import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useState, useEffect } from "react";

const RequirenotAuth = () => {


    let login = 0;



    let [storeUser, setStoreUser] = useState(JSON.parse(localStorage.getItem("user")));

    if (storeUser != null) { login = 1 }


    const location = useLocation();



    return (
        login
            ? <Navigate to="/" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default RequirenotAuth;