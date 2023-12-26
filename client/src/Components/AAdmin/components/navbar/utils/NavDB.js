import { AiOutlineFundView, AiOutlineHome, AiOutlineTeam, AiOutlineMessage, AiOutlineSmile } from "react-icons/ai";


export const navLinks = [
  {
    id: 0,
    title: "Statistiques",
    icon: <AiOutlineFundView className="h-6 w-6 nav-icon text-[#191A43]" />,
    path: "/HomeAdmin",
  },
  {
    id: 1,
    title: "Gestion des crèches",
    icon: <AiOutlineHome className="h-6 w-6 nav-icon text-[#191A43]" />,
    path: "/StatsCreches",
  },
  {
    id: 2,
    title: "Gestion des utillisateurs",
    icon: <AiOutlineTeam className="h-6 w-6 nav-icon text-[#191A43]" />,
    path: "/StatsUser",
  },
  {
    id: 3,
    title: "Gestion des avis et commentaires",
    icon: <AiOutlineMessage className=" h-6 w-6 nav-icon text-[#191A43]" />,
    path: "/StatsComments",
  },

 
];
