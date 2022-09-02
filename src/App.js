import { Route, Routes} from 'react-router-dom';

import { Login, FormularioRegistro, Dashboard} from './components';

import "./App.css";

function App() {

  return (
    <div>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/formulario_registro' element={<FormularioRegistro/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>


    </div>
  );
}

export default App;
