import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { instance } from "../api/api";

function OpcionesPregunta(props) {
  const [opciones, setOpciones] = useState([]);

  const cargarOpcionesPregunta = async () => {
    try {
        console.log("eSTAS SON LAS PROPS:",props)
      const response = await instance.post(`/preguntas/opciones`, {
        idCuestionario: props.idCuestionario,
        idPregunta: props.idPregunta,
      });

      const respuesta = response.data;
      setOpciones(respuesta.opciones)
      console.log("Recibo esta respuestsa:", respuesta);
    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {
    cargarOpcionesPregunta();
  }, []);
  return (
    <div>
      <ul>
{
    opciones.map((opcion,index)=>(
        <div key={index} >
            <label>{opcion.descripcion}</label>
            <input type={"checkbox"}></input>
            
        </div>
     
    ))
}

      </ul>
    </div>
  );
}

export default OpcionesPregunta;
