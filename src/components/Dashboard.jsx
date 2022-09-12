import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {
  Inicio,
  Cuestionarios,
  Completados,
  Perfil,
  Configuracion,
} from "../pages";
import { useStateContext } from "../context/ContextProvider";

const Dashboard = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-72 fixed ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "min-h-screen md:ml-72 w-full  "
              : "w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg w-full">
            <Navbar />
          </div>
          <div>
            <Routes>
              <Route path="/dashboard/inicio" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/cuestionarios" element={<Cuestionarios />} />
              <Route path="/completados" element={<Completados />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
