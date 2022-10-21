import { useState } from "react";
import { masPopulares } from "../data/datos";
import { categorias } from "../data/datos";
import { Link } from "react-router-dom";
import "../css/pages/Inicio.css";

const Inicio = () => {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState(categorias);

  const filterData = () => {
    return categoria.filter((val) => {
      if(search === '') {
        return val
      }else if(
        val.nombreCat.toLowerCase().includes(search.toLowerCase())
      ){
        return val
      }
    })
  };

  return (
    <div className="w-full h-screen p-3">
      {/* Barra de busqueda */}
      <div className="flex justify-between py-3">
        <form action="">
          <div className="relative flex items-center text-gray-400 focus-within:text-bright-blue border-2 bg-white rounded-lg border-bright-blue/60 focus-within:border-bright-blue">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="px-3 py-2 placeholder-gray-500 text-black rounded-sm border-none focus:outline-none"
            />
            <div className="border-none rounded-r-md  bg-bright-blue/60 focus-within:bg-bright-blue">
              <select
                name='listCat'
                id="listCat"
                className="bg-transparent font-semibold focus:outline-none text-white p-3"
              >
                <option value="categorias" className="text-black">
                  Categorias
                </option>
                <option value="animales" className="text-black">
                  Animales
                </option>
                <option value="matematicas" className="text-black">
                  Matematicas
                </option>
                <option value="Asia" className="text-black">
                  Paises
                </option>
                <option value="Europe" className="text-black">
                  Juegos
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <h1 className="mt-7 font-bold text-2xl">Categorias mas populares</h1>
      <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
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
      <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
        {filterData().length === 0 ? 'No se encontraron resultados' : filterData().map((item) => (
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
