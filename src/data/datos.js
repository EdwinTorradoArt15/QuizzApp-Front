import React from "react";
import { AiFillHome, AiFillProfile, AiFillSetting } from "react-icons/ai";
import { BiCheckDouble } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import animales from '../img/imgEdit/animales.jpg'
import matematicas from '../img/imgEdit/matematicas.jpg'
import paises from '../img/imgEdit/paises.jpg';
import juegos from '../img/imgEdit/juegos.jpg';
import historia from '../img/imgEdit/historia.jpg';
import deportes from '../img/imgEdit/deportes.jpg';
import musica from '../img/imgEdit/musica.jpg';
import tecnologia from '../img/imgEdit/tecnologia.jpg'

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