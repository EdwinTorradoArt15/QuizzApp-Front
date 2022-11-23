import React from "react";
import { AiFillHome, AiFillProfile, AiFillSetting } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

export const dataSidebar = [
  {
    path: "inicio",
    titulo: 'Inicio',
    icon: <AiFillHome />,
  },
  {
    path: "cuestionarios",
    titulo: 'Cuestionarios',
    icon: <AiFillProfile />,
  },
  {
    path: "completados",
    titulo: 'Completados',
    icon: <BiCheckDouble />,
  },
  {
    path: 'perfil',
    titulo: 'Perfil',
    icon: <BsFillPersonFill />,
  },
  {
    path: 'administrar',
    titulo: 'Administrar',
    icon: <AiFillSetting />,
  }
];