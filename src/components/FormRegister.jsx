// import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  
  // const [formularioEnviado, setFormularioEnviado] = useState(false);
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

      {/* <Formik
        initialValues={{
          usuario: "",
          nombre: "",
          correo: "",
          contraseña: "",
          contraseña2: "",
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion usuario
          if (!valores.usuario) {
            errores.usuario = "Por favor ingresa tu nombre de usuario";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.usuario)) {
            errores.usuario = "El usuario solo puede contener letras";
          }

          // Validacion nombre
          if (!valores.nombre) {
            errores.nombre = "Por favor ingresa tu nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre solo puede contener letras";
          }

          // Validacion correo
          if (!valores.correo) {
            errores.correo = "Por favor ingresa un correo electronico";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
              "El correo no puede contener caracteres especiales";
          }
          // Validacion contrasenia
          if (!valores.contraseña) {
            errores.contraseña = "Por favor ingresa una contraseña";
          } else if (
            !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
              valores.contraseña
            )
          ) {
            errores.contraseña = "La contraseña muy corta";
          }
          //Validar repetir contrasenia
          if (valores.contraseña.length > 0) {
            if (valores.contraseña !== valores.contraseña2) {
              errores.contraseña2 = "Las contraseñas no coinciden";
            }
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log(valores);
          setFormularioEnviado(true);
          setTimeout(() => setFormularioEnviado(false), 5000);
        }}
      >
        {({ errors }) => (
          <Form className="mt-6">
            <div>
              <label htmlFor="nombre" className="block text-gray-700 text-lg md:text-base">
                Usuario
              </label>
              <Field
                type="text"
                name="usuario"
                placeholder="Usuario"
                id="usuario"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="usuario"
                component={() => (
                    <p className=" error-message">{errors.usuario}</p>
                )}
              />
            </div>
            <div>
              <label htmlFor="nombre" className="block text-gray-700 text-lg md:text-base">
                Nombre
              </label>
              <Field
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                id="nombre"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                    <p className=" error-message">{errors.nombre}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="correo" className="block text-gray-700 text-lg md:text-base">
                Correo electronico
              </label>
              <Field
                type="email"
                name="correo"
                id="correo"
                placeholder="Correo electronico"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="correo"
                component={() => (
                  <p className="error-message">{errors.correo}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="contraseña" className="block text-gray-700 text-lg md:text-base">
                Contraseña
              </label>
              <Field
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                id="contraseña"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue
                  focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="contraseña"
                component={() => (
                  <p className="error-message">{errors.contraseña}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="contraseña2" className="block text-gray-700 text-lg md:text-base">
                Confirmar contraseña
              </label>
              <Field
                type="password"
                name="contraseña2"
                placeholder="confirmar Contraseña"
                id="contraseña2"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue
                  focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="contraseña2"
                component={() => (
                  <p className="error-message">{errors.contraseña2}</p>
                )}
              />
            </div>

            <button
              type="submit"
              className="w-full block text-center btn-cuestionario font-semibold text-14 2xl:text-lg md:text-base px-3 py-2 mt-6"
            >
              <p>Crear cuenta</p>
            </button>
              {formularioEnviado && <p className="confirm-message">Su registro se completo exitosamente</p>}
          </Form>
        )}
      </Formik> */}

      <p className="text-xs text-gray-500 mt-2">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormRegister;
