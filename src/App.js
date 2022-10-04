import { Route, Routes} from 'react-router-dom';

import { Login, Dashboard, Register} from './components';

import "./App.css";

function App() {

  return (
    <div>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>


    </div>
  );
}

export default App;
