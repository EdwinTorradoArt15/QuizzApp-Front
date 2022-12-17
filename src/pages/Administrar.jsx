import { useState, useEffect } from "react";
import { ModalAdministrar, Categoria } from "../components";
import { instance } from "../api/api";

const Administrar = () => {
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
    } catch (err) {
      setCategorias([]);
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
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} getCategorias={getCategories}/>
        ))}
      </div>
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
