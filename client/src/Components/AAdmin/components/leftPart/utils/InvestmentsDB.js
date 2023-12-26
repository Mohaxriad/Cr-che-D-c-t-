import {HiOutlineUserGroup} from "react-icons/hi";
import {TbMoodKid} from "react-icons/tb";
import {BsChatLeftText} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import axios from "../../../../../api/axios.js";
import useRefreshToken from "../../../../../hooks/useRefreshToken.js";

async function fetchData(accessToken) {
  const response = await axios.get("./admin", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.data;
}

function InvestmentsDB() {
  const refresh = useRefreshToken();
  const [nbParents, setNbParents] = useState(0);
  const [nbProprietaires, setNbProprietaires] = useState(0);
  const [nbEnfants, setNbEnfants] = useState(0);
  const [nbCommentaires, setNbCommentaires] = useState(0);
  const [nbCreches, setNbCreches] = useState(0);
  const [nbUsers, setNbUsers] = useState(1);
  const [TopCreches, setTopCreches] = useState([]);

  useEffect(() => {
      async function fetchDataAndUpdateState() {
      const newAccessToken = await refresh();
      const data = await fetchData(newAccessToken);
      setNbParents(data.nbParents);
      setNbProprietaires(data.nbProprietaires);
      setNbEnfants(data.nbEnfants);
      setNbCommentaires(data.nbCommentaires);
      setNbCreches(data.nbCreches);
      setNbUsers(data.nbUsers);
      setTopCreches(data.TopCreches);

    }

    fetchDataAndUpdateState();
  }, []);

  const InvestDB = [
    {
      id: 0,
      title: "Nombre des parents",
      desc: "  ",
      price: nbParents,
      upOrDown: "up",
      percent: "",
      icon: <HiOutlineUserGroup className="h-5 w-5 invest-icon" />,
    },
    {
      id: 1,
      title: "Nombre des propriétaires",
      desc: "",
      price: nbProprietaires,
      upOrDown: "down",
      percent: "",
      icon: <HiOutlineUserGroup className="h-5 w-5 invest-icon" />,
    },
    {
      id: 2,
      title: "Nombre des enfants",
      desc: "",
      price: nbEnfants,
      upOrDown: "up",
      percent: "",
      icon: <TbMoodKid className=" h-5 w-5 invest-icon" />,
    },
    {
      id: 3,
      title: "Nombre des commentaires",
      desc: "",
      price: nbCommentaires,
      upOrDown: "down",
      percent: "",
      icon: <BsChatLeftText className="h-5 w-5 invest-icon" />,
    },
  ];

  return { InvestDB, TopCreches, nbUsers, nbCreches };
}

export default InvestmentsDB;
