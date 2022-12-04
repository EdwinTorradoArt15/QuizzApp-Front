import { useState, useEffect } from "react";
import {  CardCategoria } from "../components";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { instance } from "../api/api";

const Inicio = () => {
  const [noOfElement, setNoOfElement] = useState(5);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const sliceCategorie = data.slice(0, noOfElement);

  const loadMore = () => {
    setNoOfElement((prev) => prev + 5);
  };

  const loadLess = () => {
    setNoOfElement((prev) => prev - 5);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
    return sliceCategorie.filter((val) => {
      if (search === "") {
        return val;
      } else if (val.nombre.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
      return false;
    });
  };

  return (
    <div className="w-full min-h-screen 2xl:h-screen portatil:h-full ">
      {/* Barra de busqueda */}
      <form className="mt-3">
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={handleSearch}
              className="px-2 py-1 movilM:px-2.5 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-gray-300 focus:border-bright-blue focus:ring-bright-blue dark:border-black/20 focus:outline-none"
            />
            <div className="inline-flex">
              <button className="btn-cuestionario px-2 movilM:px-2.5 rounded-r-lg">
                <BiSearchAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      </form>

      <h1 className="my-7 dark:text-white font-bold text-xl">Elige una categoria</h1>
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {filterData().length === 0
          ? <p className="dark:text-white">Categoria inexistente</p>
          : filterData().map((item) => (
              <CardCategoria
                key={item.id}
                id={item.id}
                imagen={item.urlImage}
                nombreCategoria={item.nombre}
              />
            ))}
      </div>
      {noOfElement < data.length ? (
        <IoIosArrowDown
          onClick={loadMore}
          size={20}
          className="btn-cuestionario rounded-full"
        />
      ) : (
        <IoIosArrowUp
          onClick={loadLess}
          size={20}
          className="btn-cuestionario rounded-full"
        />
      )}
    </div>
  );
};

export default Inicio;
