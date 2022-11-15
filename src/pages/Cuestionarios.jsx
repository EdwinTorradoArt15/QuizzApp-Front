import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../api/api";
import jwt_decode from "jwt-decode";
import { BiSearchAlt } from "react-icons/bi";
import "../css/pages/cuestionarios.css";

const Cuestionarios = () => {
  const [search, setSearch] = useState("");
  const [cuestionario, setCuestionario] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const getCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategorias(response.data.categorias);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
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
      if(search === ''){
        return cuest;
      }else if(cuest.nomCuest.toLowerCase().includes(search.toLowerCase())){
        return cuest;
      }
    })
  }

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
          {
            filterData().length === 0 ? (
              <div className="text-center">
                <h1 className="text-xl font-medium">No hay cuestionarios</h1>
              </div>
            ):(
              filterData().map((categoria) => (
                <div key={categoria.id} className="cardCuestionarios">
                <div className="container-img">
                  <img src="https://picsum.photos/1000/700" alt="Imagen cuestionario" className="w-full h-48 object-cover"/>
                </div>
                <div className="p-3">
                  <div className="card-header">
                    <h3 className="font-medium text-base">{categoria.nomCuest}</h3>
                    <span className="text-sm">{categoria.usuarioCreador}</span>
                  </div>
                  <p className="text-base text-white rounded-md px-3 py-1 border-2 border-light-yellow bg-light-yellow font-medium w-max">
                    {categoria.nombreCategoria}
                  </p>
                  <div className="flex gap-2.5 py-2">
                    <button className="btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                      Modificar
                    </button>
                    <button className=" btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                      Estadisticas
                    </button>
                  </div>
                </div>
              </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cuestionarios;
