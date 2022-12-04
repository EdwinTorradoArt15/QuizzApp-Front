import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CardCuestionarios } from "../components";
import jwt_decode from "jwt-decode";
import { instance } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function CuestionariosPorCategoriaPage() {
  const [cuestionario, setCuestionario] = useState([]);

  let { id } = useParams();
  useEffect(() => {
    getCuestionaries();
    console.log("xddd1:", id);
  }, []);

  const getCuestionaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.get(`/cuestionaries/categoria/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response . data", response);
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
