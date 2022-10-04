import React from "react";
import { AiFillHome, AiFillProfile, AiFillSetting } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import animales from '../img/animales.avif'
import matematicas from '../img/matematicas.avif'
import paises from '../img/paises.avif';
import juegos from '../img/juegos.avif';
import historia from '../img/historia.avif';
import deportes from '../img/deportes.avif';
import musica from '../img/musica.avif';
import tecnologia from '../img/tecnologia.avif'
import colombia from '../img/colombia.avif'
import banderas from '../img/banderas.avif'
import paises3 from '../img/paises3.avif'

export const dataSidebar = [
  {
    name: "inicio",
    titulo: 'Inicio',
    icon: <AiFillHome />,
  },
  {
    name: "cuestionarios",
    titulo: 'Cuestionarios',
    icon: <AiFillProfile />,
  },
  {
    name: "completados",
    titulo: 'Completados',
    icon: <BiCheckDouble />,
  },
  {
    name: 'perfil',
    titulo: 'Perfil',
    icon: <BsFillPersonFill />,
  },
  {
    name: 'configuracion',
    titulo: 'Configuracion',
    icon: <AiFillSetting />,
  },
];

export const masPopulares = [
  {
    id: 1,
    nombreCat: 'Animales',
    imagen: animales,
  },
  {
    id: 2,
    nombreCat: 'Matematicas',
    imagen: matematicas
  },
  {
    id: 3,
    nombreCat: 'Paises',
    imagen: paises
  },
  {
    id: 4,
    nombreCat: 'Juegos',
    imagen: juegos
  }
];

export const categorias = [
  {
    id: 1,
    nombreCat: 'Historia',
    imagen: historia,
  },
  {
    id: 2,
    nombreCat: 'Deportes',
    imagen: deportes
  },
  {
    id: 3,
    nombreCat: 'Musica',
    imagen: musica
  },
  {
    id: 4,
    nombreCat: 'Tecnologia',
    imagen: tecnologia
  },
  {
    id: 5,
    nombreCat: 'Animales',
    imagen: animales,
  },
  {
    id: 6,
    nombreCat: 'Matematicas',
    imagen: matematicas
  },
  {
    id: 7,
    nombreCat: 'Paises',
    imagen: paises
  },
  {
    id: 8,
    nombreCat: 'Juegos',
    imagen: juegos
  }
]

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