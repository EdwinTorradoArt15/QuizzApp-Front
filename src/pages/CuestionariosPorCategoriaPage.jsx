import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../api/api";

function CuestionariosPorCategoriaPage() {
  const [load, setLoad] = useState(true);
  const [cuestionario, setCuestionario] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getCuestionaries();
  }, []);

  const getCuestionaries = async () => {
    try {
      const response = await instance.get(`/cuestionaries/categoria/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCuestionario(response.data.cuestionarios);
      setLoad(false);
    } catch (err) {
      setLoad(true);
      console.error(err);
    }
  };

  console.log("Cuestionario ->", cuestionario);

  return (
    <div className="mt-7">
      {load ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {cuestionario.map((cuest) => (
            <div className="cardCuestionarios" key={cuest.id}>
              <div className="container-img">
                <img
                  src="https://picsum.photos/1000/700"
                  alt="Imagen cuestionario"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-3 dark:bg-[#191919]/90">
                <div className="card-header">
                  <h3 className="font-medium text-base movilM:text-lg dark:text-white">
                    {cuest.nomCuest}
                  </h3>
                  <span className="text-xs movilM:text-sm dark:text-white">
                    {cuest.usuarioCreador}
                  </span>
                </div>
                <p className="text-sm movilM:text-base text-white rounded-md px-3 py-1 border-2 border-light-yellow dark:border-[#423F3E] bg-light-yellow font-medium dark:bg-[#423F3E] w-max">
                  {cuest.nombreCategoria}
                </p>
                <div className="flex gap-2.5 py-2">
                  <Link
                    to={`/dashboard/cuestionarios/responder/${cuest.id}`}
                    className="btn-cuestionario movilM:text-base font-medium px-3 py-1 text-sm rounded-lg"
                  >
                    Responder
                  </Link>
                  <button className=" btn-cuestionario movilM:text-base font-medium px-3 py-1 text-sm rounded-lg">
                    Estadisticas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CuestionariosPorCategoriaPage;
