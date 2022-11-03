import React from "react";
import { AiFillHome, AiFillProfile, AiFillSetting } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import musica from '../img/imgEdit/musica.jpg';
import colombia from '../img/colombia.avif'
import banderas from '../img/banderas.avif'
import paises3 from '../img/paises3.avif'

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
  },
  {
    path: 'configuracion',
    titulo: 'Configuracion',
    icon: <AiFillSetting />,
  }
];

export const catPaises = [
  {
    id: 1,
    imagen: colombia,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Paises'
  },
  {
    id: 2,
    imagen: banderas,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Paises'
  },
  {
    id: 3,
    imagen: paises3,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Paises'
  },
  {
    id: 4,
    imagen: paises3,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Paises'
  }
]

export const catMusica = [
  {
    id:1,
    imagen: musica,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Musica'
  },
  {
    id:2,
    imagen: musica,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Musica'
  },
  {
    id:3,
    imagen: musica,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Musica'
  },
  {
    id:4,
    imagen: musica,
    titulo: 'Nombre cuestionario',
    nombreUser: 'Nombre usuario',
    categoria: 'Musica'
  }
]