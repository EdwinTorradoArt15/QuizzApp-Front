import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CardCuestionarios } from "../components";
import { instance } from "../api/api";
import { useParams } from "react-router-dom";

function CuestionariosPorCategoriaPage() {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-7">
      <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
        {cuestionario.map((categoria) => (
          <CardCuestionarios
            key={categoria.id}
            nombre={categoria.nomCuest}
            usuario={categoria.usuarioCreador}
            categoria={categoria.nombreCategoria}
          />
        ))}
      </div>
    </div>
  );
}

export default CuestionariosPorCategoriaPage;
