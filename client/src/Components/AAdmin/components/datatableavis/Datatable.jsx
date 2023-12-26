import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";

const AvisTable = () => {
    const [data, setData] = useState([]); // Initial data state is empty array
    const refreshToken = useRefreshToken();

    const fetchData = async () => {
        try {
            const newAccessToken = await refreshToken();
            const response = await axios.get("./admin/avis", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
            console.log(response.data);
            const avis = response.data.map((item) => ({
                id: item.id,
                username: item.username,
                creche: item.creche,
                note: item.note,
                comment: item.comment,
            }));
            setData(avis);
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
            await axios.delete(`./admin/avis/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
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

    const avisColumns = [
        { field: "id", headerName: "ID avis", width: 110 },
        { field: "username", headerName: "utilisateur", width: 110 },
        { field: "creche", headerName: "crèche", width: 110 },
        { field: "note", headerName: "Evaluation (/5)", width: 110 },
        { field: "comment", headerName: "Commentaire", width: 500 },
    ];

    return (
        <div className="h-[600px] p-[20px]">
            <div className="w-full text-[24px] flex justify-between items-center text-[#F55D4C] mb-[10px]">
                <h2 className="font-bold text-xl xl:text-2xl pb-2">Gestion des avis :</h2>
                {/* Add avis creation link/button here */}
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={avisColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default AvisTable;
