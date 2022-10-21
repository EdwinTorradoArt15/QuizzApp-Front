import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  Inicio,
  Cuestionarios,
  Completados,
  Perfil,
  Configuracion,
} from "../pages";
import { useStateContext } from "../context/ContextProvider";
import CrearCuestionario from "../pages/CrearCuestionario";
import "../css/components/dashboard.css";

const Dashboard = () => {
  const { activeMenu } = useStateContext();

  return (
    <main className={activeMenu ? "space-toggle" : null}>
      <Navbar />
      <aside className={`sidebar ${activeMenu ? "show" : null}`}>
        <Sidebar />
      </aside>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/cuestionarios" element={<Cuestionarios />} />
        <Route
          path={"/cuestionarios/crear_cuestionarios"}
          element={<CrearCuestionario />}
        ></Route>
        <Route path="/completados" element={<Completados />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
