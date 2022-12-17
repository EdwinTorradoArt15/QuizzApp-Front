import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Privadas, Publicas } from './routes';
import { HOME, LOGIN, REGISTRO, DASHBOARD } from './routes/paths'
import { Login, Register, Dashboard } from './pages';
import { useStateContext } from './context/ContextProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { setCurrentMode, currentMode } = useStateContext()

  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode)
    }
  }, [])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <ToastContainer />
      <Routes>
        <Route path={HOME} exact element={<Publicas> <Login /> </Publicas>} />
        <Route exact path={LOGIN} element={<Publicas> <Login /> </Publicas>} />
        <Route path={REGISTRO} element={<Publicas> <Register /> </Publicas>} />
        <Route path={DASHBOARD} element={<Privadas> <Dashboard /> </Privadas>} />
      </Routes>


    </div>
  );
}

export default App;
