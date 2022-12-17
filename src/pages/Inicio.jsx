import { useState, useEffect } from "react";
import { CardCategoria } from "../components";
import { FiSearch, FiChevronDown, FiChevronUp, FiInfo } from "react-icons/fi";
import { instance } from "../api/api";

let showCats = 4;

const Inicio = () => {
  const [load, setLoad] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [noOfElement, setNoOfElement] = useState(showCats);
  const [search, setSearch] = useState("");

  const sliceCategorie = categorias.slice(0, noOfElement);

  const loadMoreCats = () => {
    if (noOfElement < categorias.length) {
      setNoOfElement((prev) => prev + showCats);
    } else {
      setNoOfElement((prev) => prev - showCats);
    }
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
      setCategorias(response.data.categorias);
      setLoad(false);
    } catch (err) {
      console.error(err)
      setCategorias([]);
      setLoad(true);
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
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </form>

      <h1 className="my-7 dark:text-white font-bold text-xl">
        Elige una categoria
      </h1>
      {load ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
      ) : categorias.length === 0 ? (
        <div className="bg-blue-200 w-full rounded p-3 flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          <p className="text-blue-600 font-medium">No existen categorias.</p>
        </div>
      ) : (
        <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
          {filterData().length === 0 ? (
            <div className="bg-blue-200 w-full rounded p-3 flex items-center gap-2">
              <FiInfo className="text-blue-600" />
              <p className="text-blue-600 font-medium">
                Categoria inexistente.
              </p>
            </div>
          ) : (
            filterData().map((item) => (
              <CardCategoria
                key={item.id}
                id={item.id}
                imagen={item.urlImage}
                nombreCategoria={item.nombre}
              />
            ))
          )}
        </div>
      )}

      {categorias.length <= showCats ? null : noOfElement <=
        categorias.length ? (
        <FiChevronDown
          onClick={loadMoreCats}
          size={20}
          className="btn-cuestionario rounded-full"
        />
      ) : (
        <FiChevronUp
          onClick={loadMoreCats}
          size={20}
          className="btn-cuestionario rounded-full"
        />
      )}
    </div>
  );
};

export default Inicio;
