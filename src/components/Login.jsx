import { Route, Routes } from "react-router-dom";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import Sliders from "./Sliders";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-slate-100 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen border-r-2">
        <Sliders/>
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
      >
        <FormLogin/>
        <Routes>
          <Route path="/registro" element={<FormRegister/>}></Route>
        </Routes>
      </div>
    </div>
  );
};
export default Login;

