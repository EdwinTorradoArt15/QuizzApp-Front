import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// Acomodar con react hooks forms

const FormRegister = () => {

  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confContraseña, setConfContraseña] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Registrar = async (e) => {
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/users',{
        usuario: usuario,
        nombre: nombre,
        correo: correo,
        clave: contraseña,
        confClave: confContraseña
      })
        navigate("/")
    }catch(err){
      if(err.response){
        setMsg(err.response.data.msg)
      }
    }
  }

  return (
    <div className="w-full h-100">
      <h1 className="text-xl font-bold">Logo Quick Test</h1>
      <h1 className="text-xl md:text-xl 2xl:text-2xl font-bold mt-12">
        Registrate con nosotros
      </h1>
      <form className="mt-6" onSubmit={Registrar}>
        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Usuario
          </label>
          <input
            type="text"
            placeholder="Usuario"
            value= {usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            value= {nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Correo
          </label>
          <input
            type="text"
            placeholder="Correo electronico"
            value= {correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="*********"
            value= {contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Confirmar contraseña
          </label>
          <input
            type="password"
            placeholder="*********"
            value= {confContraseña}
            onChange={(e) => setConfContraseña(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>
        <p className="text-red-500 text-center">{msg}</p>
        <button
          type="submit"
          className="w-full block text-center btn-cuestionario font-semibold text-14 2xl:text-lg md:text-base px-3 py-2 mt-6"
        >
          Registrar
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-2">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormRegister;
