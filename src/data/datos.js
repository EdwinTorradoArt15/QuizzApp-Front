import React from "react";
import { AiFillHome, AiFillProfile, AiFillSetting } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import imgperfil from "../img/imgperfil.jpeg";

export const dataSidebar = [
  {
    name: "Home",
    icon: <AiFillHome />,
  },
  {
    name: "Cuestionarios",
    icon: <AiFillProfile />,
  },
  {
    name: "Completados",
    icon: <BiCheckDouble />,
  },
  {
    name: "Perfil",
    icon: <BsFillPersonFill />,
  },
  {
    name: "Configuracion",
    icon: <AiFillSetting />,
  },
];

export const dataCard = [
  {
    imgperfil,
    nombCuest: "Nombre del cuestionario",
    usuario: "Edwin Torrado",
    fecha: "24/08/2022",
    estado: "Disponible",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, necessitatibus.",
    boton1: "Responder",
    boton2: "Compartir",
    boton3: "Estadisticas",
  },

  {
    imgperfil,
    nombCuest: "Nombre del cuestionario",
    usuario: "Edwin Torrado",
    fecha: "24/08/2022",
    estado: "Disponible",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, necessitatibus.",
    boton1: "Responder",
    boton2: "Compartir",
    boton3: "Estadisticas",
  },

  {
    imgperfil,
    nombCuest: "Nombre del cuestionario",
    usuario: "Edwin Torrado",
    fecha: "24/08/2022",
    estado: "Disponible",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, necessitatibus.",
    boton1: "Responder",
    boton2: "Compartir",
    boton3: "Estadisticas",
  },

  {
    imgperfil,
    nombCuest: "Nombre del cuestionario",
    usuario: "Edwin Torrado",
    fecha: "24/08/2022",
    estado: "Disponible",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, necessitatibus.",
    boton1: "Responder",
    boton2: "Compartir",
    boton3: "Estadisticas",
  },
];
