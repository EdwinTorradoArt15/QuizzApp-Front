import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../api/api";

const ResponderCuestionario = () => {
  const [load, setLoad] = useState(true);
  const [infoCuestionario, setInfoCuestionario] = useState({});
  const { id } = useParams();

  const getCuestionario = async () => {
    try {
      const response = await instance.get(`/cuestionaries/${id}`);

      const respuesta = response.data;
      const dataCuestionario = respuesta.cuestionario;
      setInfoCuestionario(dataCuestionario);
      setLoad(false);
    } catch (err) {
      
      setLoad(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getCuestionario();
  }, []);

  return (
    <>
      {load ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="dark:text-white font-medium text-base movilM:text-lg">
              {infoCuestionario.nomCuest}
            </h1>
            <span className="bg-light-yellow px-6 py-2 rounded-md text-white font-semibold">
              {infoCuestionario.nombreCategoria}
            </span>
            <span className="bg-lime-green px-6 py-2 rounded-md text-white font-semibold">
              {infoCuestionario.tiempoTotal}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponderCuestionario;
