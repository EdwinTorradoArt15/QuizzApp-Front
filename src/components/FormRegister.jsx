import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState } from "react";

const FormRegister = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  return (
    <div className="w-full h-100">
      <h1 className="text-xl font-bold">Logo Quick Test</h1>
      <h1 className="text-xl md:text-2xl font-bold leading-tighy mt-12">
        Registrate con nosotros
      </h1>
      <Formik
        initialValues={{
          nombre: "",
          correo: "",
          contraseña: "",
          contraseña2: "",
        }}
        validate={(valores) => {
          let errores = {};

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
              <label htmlFor="nombre" className="block text-gray-700">
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
              <label htmlFor="correo" className="block text-gray-700">
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
              <label htmlFor="contraseña" className="block text-gray-700">
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
              <label htmlFor="contraseña2" className="block text-gray-700">
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
              className="w-full block bg-bright-blue hover:bg-white hover:text-bright-blue text-white font-semibold rounded-lg px-4 py-3 mt-4 hover:border hover:border-bright-blue"
            >
              <p>Crear cuenta</p>
            </button>
              {formularioEnviado && <p className="confirm-message">Su registro se completo exitosamente</p>}
          </Form>
        )}
      </Formik>

      <p className="text-xs text-gray-500 mt-2">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormRegister;
