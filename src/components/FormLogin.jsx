import React from 'react'
import { Link,} from 'react-router-dom'
import { AiFillGoogleCircle } from "react-icons/ai";

const FormLogin = () => {
  return (
    <div className="w-full h-100">
          <h1 className="text-xl font-bold">Login Quick Test</h1>
          <h1 className="text-xl md:text-2xl font-bold leading-tighy mt-12">
            Ingresa tu cuenta
          </h1>

          <form className="mt-6">
            <div>
              <label className="block text-gray-700">Correo electronico</label>
              <input
                type="email"
                placeholder="Correo electronico"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
                autoFocus
                autoComplete=""
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue
                  focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <p className="text-sm font-semibold text-gray-700 hover:text-bright-blue focus:text-bright-blue">
                Olvidaste tu contraseña
              </p>
            </div>
            <Link
              to={"/dashboard/inicio"}
              className="w-full block text-center bg-bright-blue hover:bg-white hover:text-bright-blue hover:border hover:border-bright-blue text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Iniciar sesion
            </Link>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <button
            type="button"
            className="w-full block bg-bright-blue hover:bg-white hover:text-bright-blue text-white font-semibold rounded-lg px-4 py-3 hover:border hover:border-bright-blue"
          >
            <div className="flex items-center justify-center ">
              <AiFillGoogleCircle className="text-lg" />
              <span className="ml-4"> Inicia sesion con Google</span>
            </div>
          </button>
          <p className="mt-8">
            Necesitas una cuenta?
            <Link
              to={"/registro"}
              className="text-blue-500 mx-1 hover:text-blue-700 font-semibold"
            >
              Create una cuenta
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            &copy; 2022 Art Developers - Derechos totalmente reservados.
          </p>
        </div>
  )
}

export default FormLogin