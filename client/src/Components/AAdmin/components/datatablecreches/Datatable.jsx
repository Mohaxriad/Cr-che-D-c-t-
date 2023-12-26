import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";
const Datatable = () => {
    const [data, setData] = useState([]);
    const refreshToken = useRefreshToken();

    const fetchData = async () => {
        try {
            const newAccessToken = await refreshToken();
            const response = await axios.get("./admin/creches", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                }
            });
            const creches = response.data.map((item) => ({
                id: item.id,
                nurseryname: item.nurseryname,
                id2: item.idProprietaire,
                email: item.email,
                ownername: item.ownername,
            }));
            setData(creches);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (params) => {
        const { id } = params.row;
        try {
            const newAccessToken = await refreshToken();
            await axios.delete(`./admin/creches/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                }
            }
            );
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting the item:", error);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="flex items-center">
                        <div
                            className="text-white text-sm rounded ring ring-[#420404] bg-[#be1212] px-2 py-1 hover:scale-105 duration-300 hover:bg-[#ff1e1e] hover:text-white cursor-pointer"
                            onClick={() => handleDelete(params)}
                        >
                            Supprimer
                        </div>
                    </div>
                );
            },
        },
    ];

    const userColumns = [
        { field: "id", headerName: "ID crèche", width: 100 },
        { field: "nurseryname", headerName: "Nom de la crèche", width: 150 },
        { field: "id2", headerName: "ID propriétaire", width: 110 },
        { field: "email", headerName: "E-mail propriétaire", width: 220 },
        { field: "ownername", headerName: "Nom du propriétaire", width: 170 },
    ];

    return (
        <div className="h-[600px] p-[20px]">
            <div className="w-full text-[24px] flex justify-between items-center text-[#F55D4C] mb-[10px]">
                <h2 className="font-bold text-xl xl:text-2xl pb-2">Gestion des crèches :</h2>
                <a
                    href="/AjoutCreche"
                    className="text-[#0f0f37] text-base ld:text-lg font-semibold rounded ring ring-[#ff6666] bg-[#ff9d9d] px-3 py-1 ld:px-6 ld:py-2 hover:scale-105 duration-300 hover:bg-[#49061f] hover:text-white cursor-pointer"
                >
                    Ajouter
                </a>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
