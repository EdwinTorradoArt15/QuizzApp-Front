import { useState } from "react";
import { masPopulares } from "../data/datos";
import { categorias } from "../data/datos";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../css/pages/Inicio.css";

const Inicio = () => {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState(categorias);

  const filterData = () => {
      return categoria.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombreCat.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
      return false
    });
  };

  return (
    <div className="w-full h-screen p-3">
      {/* Barra de busqueda */}
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

      <h1 className="mt-7 font-bold text-2xl">Categorias mas populares</h1>
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {masPopulares.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundImage: `url(${item.imagen})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="card"
          >
            <div>
              <Link
                to="/"
                className="btn btn-categoria font-extrabold text-lg px-3 py-2"
              >
                {item.nombreCat}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h1 className="my-7 font-bold text-2xl">Elige una categoria</h1>
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {filterData().length === 0
          ? "No se encontraron resultados"
          : filterData().map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundImage: `url(${item.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card"
              >
                <div>
                  <Link
                    to=""
                    className="btn btn-categoria font-extrabold text-lg px-3 py-2"
                  >
                    {item.nombreCat}
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Inicio;
