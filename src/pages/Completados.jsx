import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { catMusica, catPaises } from "../data/datos";
import '../css/pages/cuestionarios.css'

const Completados = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="w-full p-3">
      {/* Barra busqueda */}
      <form className="mt-5">
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-3 py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-bright-blue/20 focus-within:border-bright-blue  focus:outline-none"
            />
            <div className="inline-flex">
              <button className="btn-cuestionario px-3 rounded-r-lg">
                <BiSearchAlt size={20} />
              </button>
            </div>
          </div>
          <div>
            <select className="bg-transparent font-medium focus:outline-none p-3 border-2 border-bright-blue/20 focus-within:border-bright-blue rounded-lg">
              <option value="categorias">Categorias</option>
              <option value="animales">Animales</option>
              <option value="matematicas">Matematicas</option>
              <option value="paises">Paises</option>
              <option value="juegos">Juegos</option>
            </select>
          </div>
        </div>
      </form>

      {/* Categoria paises */}
      <div className='mt-7'>
        <h1 className="font-bold text-2xl">Paises</h1>
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {catPaises.map((item) => (
            <div key={item.id} className="cardCuestionarios">
              <div className="container-img">
                <img
                  src={item.imagen}
                  alt="Imagen carta"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h1 className="font-semibold text-base 2xl:text-lg md:text-lg">{item.titulo}</h1>
                  <span className="font-semibold text-14 2xl:text-base md:text-base text-black/50">
                    {item.nombreUser}
                  </span>
                </div>
                <div className="px-1.5 pb-2">
                  <p className="text-14 2xl:text-lg md:text-base text-white rounded-md px-5 py-1 border-2 border-light-yellow bg-light-yellow font-semibold w-max">
                    {item.categoria}
                  </p>

                  <div className="flex gap-2.5 py-2">
                    <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                      Jugar otra vez
                    </button>
                    <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                      Estadisticas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fin categoria paises */}

      {/* Categoria musica */}
      <div className='mt-7 '>
        <h1 className="font-bold text-2xl">Musica</h1>
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {catMusica.map((item) => (
            <div key={item.id} className="cardCuestionarios">
              <div key={item.id} className="cardCuestionarios">
                <div className="container-img">
                  <img
                    src={item.imagen}
                    alt="Imagen carta"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="card-body">
                  <div className="card-header">
                    <h1 className="font-semibold text-base 2xl:text-lg">{item.titulo}</h1>
                    <span className="font-semibold text-14 2xl:text-base text-black/50">
                      {item.nombreUser}
                    </span>
                  </div>
                  <div className="px-1.5 pb-2">
                    <p className="text-14 2xl:text-lg text-white rounded-md py-1 px-9 border-2 border-lime-green bg-lime-green font-semibold w-max">
                      {item.categoria}
                    </p>

                    <div className="flex gap-2.5 py-2">
                      <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg">
                        Modificar
                      </button>
                      <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg">
                        Estadisticas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fin categoria musica */}
    </div>
  )
}

export default Completados