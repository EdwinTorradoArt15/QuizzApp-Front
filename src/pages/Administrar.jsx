import { useState, useEffect } from "react";
import { ModalAdministrar, Categoria } from "../components";
import { instance } from "../api/api";
import { FiInfo } from "react-icons/fi";

const Administrar = () => {
  const [load, setLoad] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

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
      console.error(true)
      setCategorias([]);
      setLoad(true);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="mt-3">
        <button
          aria-controls="modal-add"
          className={`btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg ${
            modalAdd && "bg-slate-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setModalAdd(true);
          }}
        >
          Añadir categoria
        </button>
      </div>
      {load ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
      ) : categorias.length === 0 ? (
        <div className="bg-blue-200 w-full rounded p-3 flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          <p className="text-blue-600 font-medium">
            No se ha creado ninguna categoria.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
          {categorias.map((categoria) => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
              getCategorias={getCategories}
            />
          ))}
        </div>
      )}

      {/* Modal administrar */}
      <ModalAdministrar
        id="modal-add"
        modalOpen={modalAdd}
        setModalOpen={setModalAdd}
        getCategorias={getCategories}
      />
    </div>
  );
};

export default Administrar;
