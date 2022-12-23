import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { instance } from "../api/api";
import { preguntas } from "../data/datos";
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
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.post(`/preguntas`, {
        idCuestionario: Number(id),
      });

      const respuesta = response.data;
      console.log("Recibo esta respuestsa:", respuesta);
      setPreguntas(respuesta.preguntas);
    } catch (err) {
      setLoad(true);
      console.error(err);
    }
  };
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
              {infoCuestionario.tiempoTotal}
            </span>
          </div>
          <hr className="mt-5" />
          <h1 className="font-bold">Informacion cuestionario</h1>

          <div className="flex flex-col">
            {[...preguntas].map((pregunta, index) => (
              <div className="m-3" key={index}>
                {
                  console.log("Objeto pregunta soy:",pregunta)
                }
                <p className="text-[red]">{pregunta.pregunta_descripcion}</p>
                <OpcionesPregunta
                  idPregunta={pregunta.id_pregunta}
                  idCuestionario={pregunta.id_cuestionario}
                ></OpcionesPregunta>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ResponderCuestionario;
