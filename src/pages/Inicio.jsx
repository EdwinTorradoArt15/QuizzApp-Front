import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { instance } from "../api/api";
import { Link } from "react-router-dom";
import "../css/pages/Inicio.css";

const Inicio = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
    getCategories();
  }, []);

  // Obtenemos todas las categorias
  const getCategories = async () => {
    try {
      const response = await instance.get("/categories");
      return setData(response.data.categorias);
    } catch (err) {
      setData([]);
    }
  };

  const filterData = () => {
      return data.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
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
        {data.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <div>
              <Link
                to="/"
                className="btn btn-categoria font-extrabold text-lg px-3 py-2"
              >
                {item.nombre}
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
                className="card"
              >
                <div>
                  <Link
                    to=""
                    className="btn btn-categoria font-extrabold text-lg px-3 py-2"
                  >
                    {item.nombre}
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Inicio;
