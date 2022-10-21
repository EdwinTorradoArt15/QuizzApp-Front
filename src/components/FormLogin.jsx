import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {instance} from '../api/api'
import Loader from "./Loader";

const CheckBox = ({ value, onChange }) => {
  return <input type="checkbox" checked={value} onChange={onChange} />;
};

const FormLogin = () => {

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");  
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await instance.post('/login',{
        correo: correo,
        clave: contraseña,
      })
        localStorage.setItem('token', res.data.refreshToken)
        navigate("/dashboard/inicio")
    }catch(err){
      if(err.response){
        setMsg(err.response.data.msg)
      }
    }
  }

  return (
    <div className="w-full h-100">
      <h1 className="text-xl font-bold">Login Quick Test</h1>
      <h1 className="text-xl md:text-xl 2xl:text-2xl font-bold mt-12">
        Ingresa tu cuenta
      </h1>

      <form className="mt-6" onSubmit={Login}>
        <div>
          <label className="block text-gray-700 text-lg md:text-base">Correo electronico</label>
          <input
            type="text"
            placeholder="Correo electronico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            autoFocus
            autoComplete=""
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg md:text-base">Contraseña</label>
          <input
            type="password"
            placeholder="************"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between px-3 pt-3">
          <div className="flex items-center gap-2">
            <CheckBox/>
            <p className="text-sm 2xl:text-lg md:text-xs font-semibold text-gray-700 ">
              Recordar contraseña
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-lg md:text-xs font-semibold text-gray-700 hover:text-bright-blue focus:text-bright-blue cursor-pointer">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center btn-cuestionario font-semibold text-14 2xl:text-lg md:text-base px-3 py-2 mt-6"
        >
          Iniciar sesion
        {loading && <Loader/>}
        </button>
        <p className="text-red-600 text-center">{msg}</p>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      <button
        type="button"
        className="w-full block btn-cuestionario font-semibold text-14 2xl:text-lg px-3 py-2"
      >
        <div className="flex items-center justify-center ">
          <AiFillGoogleCircle className="text-lg md:text-base" />
          <span className="ml-4 text-14 2xl:text-lg md:text-base"> Inicia sesion con Google</span>
        </div>
      </button>
      <p className="mt-8">
        Necesitas una cuenta?
        <Link
          to={"/registro"}
          className="text-blue-500 mx-1 text-14 2xl:text-lg md:text-base hover:text-blue-700 font-semibold"
        >
          Create una cuenta
        </Link>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormLogin;
