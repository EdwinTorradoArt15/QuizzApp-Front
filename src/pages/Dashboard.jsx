import { Route, Routes } from "react-router-dom";
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
import { useStateContext } from "../context/ContextProvider";
import "../css/components/dashboard.css";

const Dashboard = () => {
    const { activeMenu } = useStateContext();

    return (
        <div className="dark:bg-[#191919]/95">
            <main className={activeMenu ? "space-toggle" : null}>
                <Navbar />
                <aside className={`sidebar dark:bg-black ${activeMenu ? "show" : null}`}>
                    <Sidebar />
                </aside>
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
            </main>
        </div>
    );
};

export default Dashboard;
