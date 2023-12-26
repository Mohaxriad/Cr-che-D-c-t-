import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";

const UserTable = () => {
    const [data, setData] = useState([]);
    const refreshToken = useRefreshToken();

    const fetchData = async () => {
        try {
            const newAccessToken = await refreshToken();
            const response = await axios.get("./admin/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
            const users = response.data.map((item) => ({
                id: item.id,
                username: item.username,
                email: item.email,
                role: item.role,
            }));
            setData(users);
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
            await axios.delete(`./admin/users/${id}`, {
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
    const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "username",
            headerName: "Nom d'utilisateur",
            width: 230,

        },
        {
            field: "email",
            headerName: "E-mail",
            width: 230,
        },

        {
            field: "role",
            headerName: "Role",
            width: 100,
        },

    ];
    return (
        <div className="h-[600px] p-[20px]">
            <div className="w-full text-[24px] flex justify-between items-center text-[#F55D4C] mb-[10px]">
                <h2 className="font-bold text-xl xl:text-2xl pb-2">Gestion des utilisateurs :</h2>
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

export default UserTable;

