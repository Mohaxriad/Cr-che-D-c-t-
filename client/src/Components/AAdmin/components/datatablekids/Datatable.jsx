import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../sourcedata/datatablesourceenf";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "../../../../api/axios.js";
import useRefreshToken from "../../../../hooks/useRefreshToken.js";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
              className="text-white text-sm   rounded  ring ring-[#420404] bg-[#be1212] px-2 py-1   hover:scale-105 duration-300 hover:bg-[#ff1e1e] hover:text-white cursor-pointer"
              onClick={() => handleDelete(params.row.id)}
            >
              Supprimer
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="h-[600px] p-[20px]">
      <div className="w-full text-[24px] flex justify-between items-center text-[#F55D4C] mb-[10px]">
        <h2 className="font-bold text-xl xl:text-2xl pb-2 "> Gestion des enfants : </h2>
        <a href="/AjoutEnfant" className="text-[#0f0f37] text-base ld:text-lg font-semibold rounded  ring ring-[#ff6666] bg-[#ff9d9d] px-3 py-1 ld:px-6 ld:py-2 hover:scale-105 duration-300 hover:bg-[#49061f] hover:text-white">
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
