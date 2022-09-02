import React from "react";
import imglogin from "../img/imglogin.jpg";
import { FcGoogle } from "react-icons/fc";
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div className="relatrive w-full h-screen bg-zinc-900/90">
      <img
        src={imglogin}
        alt="Imagen del login"
        className="absolute w-full h-full object-cover"
      />

      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8 z-10 rounded-lg">
          <h2 className="text-4xl font-bold text-center py-4">
            Inicio de sesion
          </h2>
          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 ">Correo electronico</label>
            <input
              type="email"
              placeholder="Ingrese su correo electronico"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autoFocus
              autoComplete=""
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 ">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <Link
            to={'/dashboard/inicio'}
            className="w-full block text-center bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
          >
            Iniciar sesion
          </Link>
          <div className='text-right mt-2'>
            <p className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Recuerdame</p>
          </div>

          <hr className="my-6 border-gray-300" />

          <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
            <div className="flex items-center gap-1 justify-center">
              <FcGoogle/>
              <span>Inicia sesion con Google</span>
            </div>
          </button>
          <p className="mt-4">
            Necesitas una cuenta?
            <Link to={'/formulario_registro'} className="text-blue-500 hover:text-blue-700 font-semibold">Create una cuenta</Link>
          </p>
          <p className="text-xs text-gray-500 my-3">&copy; 2022 Art Developers - Todos los derechos reservados.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;

