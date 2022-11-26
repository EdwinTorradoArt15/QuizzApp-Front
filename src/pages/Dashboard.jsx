import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar, Sidebar } from "../components";
import {
    Inicio,
    Cuestionarios,
    CrearCuestionario,
    Completados,
    Perfil,
    Administrar,
} from ".";
import {
    INDEX,
    INICIO,
    CUESTIONARIOS,
    CREAR_CUESTIONARIO,
    COMPLETADOS,
    PERFIL,
    ADMINISTRAR,
} from "../routes/paths";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden dark:bg-[#191919]/95">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Navbar */}
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <Routes>
                            <Route path={INDEX} element={<Inicio />} />
                            <Route path={INICIO} element={<Inicio />} />
                            <Route path={CUESTIONARIOS} element={<Cuestionarios />} />
                            <Route
                                path={CREAR_CUESTIONARIO}
                                element={<CrearCuestionario />}
                            ></Route>
                            <Route path={COMPLETADOS} element={<Completados />} />
                            <Route path={PERFIL} element={<Perfil />} />
                            <Route path={ADMINISTRAR} element={<Administrar />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
