import { useState, useEffect } from "react";
import { CardCuestionarios } from "../components";
import { BiSearchAlt } from "react-icons/bi";
import { instance } from "../api/api";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/pages/cuestionarios.css";

const Cuestionarios = () => {
  const [search, setSearch] = useState("");
  const [cuestionario, setCuestionario] = useState([]);

  useEffect(() => {
    getCuestionaries();
  }, []);

  const getCuestionaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.post("/cuestionaries/usuario", {
        idUsuarioCreador: decoded.userId,
      });

      setCuestionario(response.data.cuestionarios);
    } catch (err) {
      console.log(err);
    }
  };

  const filterData = () => {
    return cuestionario.filter((cuest) => {
      if (search === "") {
        return cuest;
      } else if (cuest.nomCuest.toLowerCase().includes(search.toLowerCase())) {
        return cuest;
      }
      return false;
    });
  };

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
        </div>
      </form>

      <div className="mt-7">
        <Link
          to={"/dashboard/cuestionarios/crear_cuestionarios"}
          className="btn-cuestionario font-medium px-3 py-2 text-base rounded-lg"
        >
          Crear cuestionario
        </Link>
      </div>
      <div className="mt-7">
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {filterData().length === 0 ? (
            <div className="text-center">
              <h1 className="text-xl font-medium">No hay cuestionarios</h1>
            </div>
          ) : (
            filterData().map((categoria) => (
              <CardCuestionarios
                key={categoria.id}
                nombre={categoria.nomCuest}
                usuario={categoria.usuarioCreador}
                categoria={categoria.nombreCategoria}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cuestionarios;
