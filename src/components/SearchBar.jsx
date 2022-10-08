import { BsSearch } from "react-icons/bs";

const SearchBar = () => {

  return (
    <div className="flex justify-between py-3">
      <form action="">
        <div className="relative flex items-center text-gray-400 focus-within:text-bright-blue border-2 bg-white rounded-lg border-bright-blue/60 focus-within:border-bright-blue">
          <input
            type="search"
            placeholder="Busqueda"
            className="px-3 py-2 placeholder-gray-500 text-black rounded-sm border-none focus:outline-none"
          />
          <div className="border-none rounded-r-md  bg-bright-blue/60 focus-within:bg-bright-blue">
            <select name="" id="" className="bg-transparent font-semibold focus:outline-none text-white p-3">
              <option value="All" className="text-black">Categorias</option>
              <option value="Africa" className="text-black">Animales</option>
              <option value="Americas" className="text-black">Matematicas</option>
              <option value="Asia" className="text-black">Paises</option>
              <option value="Europe" className="text-black">Juegos</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
