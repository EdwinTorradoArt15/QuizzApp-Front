import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { instance } from "../api/api";

function OpcionesPregunta(props) {
  const [opciones, setOpciones] = useState([]);

  const cargarOpcionesPregunta = async () => {
    try {
      const response = await instance.post(`/preguntas/opciones`, {
        idCuestionario: props.idCuestionario,
        idPregunta: props.idPregunta,
      });

      const respuesta = response.data;
      setOpciones(respuesta.opciones);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarOpcionesPregunta();
  }, []);
  return (
    <div>
      <ul className="container-checkbox grid grid-cols-2 gap-4">
        {opciones.map((opcion, index) => (
          <li key={index}>
            <input id={"pregunta" + index} type={"checkbox"} />
            <label htmlFor={"pregunta" + index}>{opcion.descripcion}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OpcionesPregunta;
