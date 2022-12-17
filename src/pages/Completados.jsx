import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Completados = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="w-full min-h-screen">
      {/* Barra busqueda */}
      <form className="mt-3">
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="text"
              placeholder="Busqueda"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
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
    </div>
  )
}

export default Completados