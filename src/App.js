import { Route, Routes } from 'react-router-dom';
import { Privadas, Publicas } from './routes';
import {HOME, LOGIN, REGISTRO, DASHBOARD} from './routes/paths'
import { Login, Register, Dashboard } from './pages';
import "./App.css";

function App() {
  return (
    <div>

      <Routes>
        <Route path={HOME} exact element={ <Publicas> <Login/> </Publicas>}/>
        <Route exact path={LOGIN} element={<Publicas> <Login/> </Publicas>}/>
        <Route path={REGISTRO} element={ <Publicas> <Register/> </Publicas>}/>
        <Route path={DASHBOARD} element={<Privadas> <Dashboard/> </Privadas>}/>
      </Routes>


    </div>
  );
}

export default App;
