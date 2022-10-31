import { Route, Routes} from 'react-router-dom';

import { Login, Dashboard, Register} from './components';

import "./App.css";
import PublicRouts from './components/PublicRouts';
import PrivateRouts from './components/PrivateRouts';

function App() {

  return (
    <div>

      <Routes>
        <Route path='/*' exact element={ <PublicRouts> <Login/> </PublicRouts>}/>
        <Route exact path='/login/*' element={<PublicRouts> <Login/> </PublicRouts>}/>
        <Route path='/registro' element={ <PublicRouts> <Register/> </PublicRouts>}/>
        <Route path='/dashboard/*' element={<PrivateRouts> <Dashboard/> </PrivateRouts>}/>
      </Routes>


    </div>
  );
}

export default App;
