import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const Completados = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="w-full min-h-screen p-3">
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
              className="px-2 py-1 movilM:px-2.5 movilM:py-2 placeholder-gray-500 text-black rounded-l-lg border-2 border-bright-blue/20 focus-within:border-bright-blue dark:focus-within:border-white focus:outline-none"
            />
            <div className="inline-flex">
              <button className="btn-cuestionario px-2 movilM:px-2.5 rounded-r-lg">
                <BiSearchAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Completados