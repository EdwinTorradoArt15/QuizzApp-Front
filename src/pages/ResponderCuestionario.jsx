import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../api/api";
import OpcionesPregunta from "../components/OpcionesPregunta";

const ResponderCuestionario = () => {
  const [load, setLoad] = useState(true);
  const [preguntas, setPreguntas] = useState([]);
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

  const getPreguntas = async () => {
    try {
      const response = await instance.post(`/preguntas`, {
        idCuestionario: Number(id),
      });

      const respuesta = response.data;
      setPreguntas(respuesta.preguntas);
    } catch (err) {
      setLoad(true);
      console.error(err);
    }
  };

  // Discount time of the questionarie with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (infoCuestionario.tiempoTotal > 0) {
        setInfoCuestionario({
          ...infoCuestionario,
          tiempoTotal: infoCuestionario.tiempoTotal - 1,
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [infoCuestionario.tiempoTotal]);

  useEffect(() => {
    getCuestionario();
    getPreguntas();
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
              {infoCuestionario.tiempoTotal} segundos
            </span>
          </div>
          <hr className="mt-5" />

          <div className="flex flex-col">
            {[...preguntas].map((pregunta, index) => (
              <div className="m-3" key={index}>
                <div className="flex items-center gap-2">
                  <p className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                    {index + 1}
                  </p>
                  <p className="font-medium">{pregunta.pregunta_descripcion}</p>
                </div>
                <div className="flex justify-center">
                  <OpcionesPregunta
                    idPregunta={pregunta.id_pregunta}
                    idCuestionario={pregunta.id_cuestionario}
                  ></OpcionesPregunta>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ResponderCuestionario;
