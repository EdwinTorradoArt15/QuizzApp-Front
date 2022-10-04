import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { catMusica, catPaises } from "../data/datos";
const Cuestionarios = () => {
  return (
    <div className="mt-5">
      <SearchBar />

      <Link to={'/dashboard/cuestionarios/crear_cuestionarios'} className="mt-7 rounded-md font-medium border-2 border-bright-blue hover:text-bright-blue hover:bg-white bg-bright-blue text-white py-2 px-2.5">
        Crear cuestionario
      </Link>

      {/* Categoria paises */}
      <div className="mt-7">
        <h1 className="font-bold text-2xl">Paises</h1>
        <div className="flex flex-wrap my-7 justify-center gap-5 items-center">
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
                  <h1 className="font-semibold text-base">{item.titulo}</h1>
                  <span className="font-semibold text-14 text-black/50">
                    {item.nombreUser}
                  </span>
                </div>
                <div className="px-1.5 pb-2">
                  <button className="text-14 text-white rounded-md py-1 px-9 border-2 border-light-yellow bg-light-yellow font-semibold cursor-default">
                    {item.categoria}
                  </button>

                  <div className="flex gap-2.5 py-2">
                    <button className="buttonCardCuestionario">
                      Modificar
                    </button>
                    <button className="buttonCardCuestionario">
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
      <div className="mt-7 ">
        <h1 className="font-bold text-2xl">Musica</h1>
        <div className="flex flex-wrap my-7 justify-center gap-5 items-center">
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
                    <h1 className="font-semibold text-base">{item.titulo}</h1>
                    <span className="font-semibold text-14 text-black/50">
                      {item.nombreUser}
                    </span>
                  </div>
                  <div className="px-1.5 pb-2">
                    <button className="text-14 text-white rounded-md py-1 px-9 border-2 border-lime-green bg-lime-green font-semibold cursor-default">
                      {item.categoria}
                    </button>

                    <div className="flex gap-2.5 py-2">
                      <button className="buttonCardCuestionario">
                        Modificar
                      </button>
                      <button className="buttonCardCuestionario">
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
  );
};

export default Cuestionarios;
