import banner from "../img/banner.avif";
import { useState } from "react";
import {AiOutlineClose,AiOutlinePlus} from "react-icons/ai";

// Cambiar a react hooks forms
const CheckBox = ({value, onChange}) => {
  return(
      <input type="checkbox" checked={value} onChange={onChange}/>
  )
}

const CrearCuestionario = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  }

  const handleChange2 = () => {
    setChecked2(!checked2);
  }
  const handleChange3 = () => {
    setChecked3(!checked3);
  }
  const handleChange4 = () => {
    setChecked4(!checked4);
  }

  return (
    <div className="w-full p-3">
      {/* Header */}
      <form className="flex gap-5 items-center">
        <label htmlFor="">Nombre de la categoria</label>
        <input type="text" className="border"/>

        {/* Select categorias */}
        <select
          name=""
          id=""
          className="bg-bright-blue rounded-lg font-semibold focus:outline-none text-white p-3"
        >
          <option value="All" className="text-black bg-white">
            Categorias
          </option>
          <option value="Africa" className="text-black bg-white">
            Animales
          </option>
          <option value="Americas" className="text-black bg-white">
            Matematicas
          </option>
          <option value="Asia" className="text-black bg-white">
            Paises
          </option>
          <option value="Europe" className="text-black bg-white">
            Juegos
          </option>
        </select>

        {/* Select tiempo */}
        <select
          name=""
          id=""
          className="bg-bright-blue rounded-lg font-semibold focus:outline-none text-white p-3"
        >
          <option value="All" className="text-black bg-white">
            Tiempo
          </option>
          <option value="Africa" className="text-black bg-white">
            20 segundos
          </option>
          <option value="Americas" className="text-black bg-white">
            30 segundos
          </option>
          <option value="Asia" className="text-black bg-white">
            40 segundos
          </option>
          <option value="Europe" className="text-black bg-white">
            60 segundos
          </option>
        </select>
      </form>

      {/* Banner cuestionario */}
      <div className="w-full h-48 mt-6">
        <img
          src={banner}
          alt="Imagen banner"
          className="w-full h-48 rounded-md object-cover"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Preguntas */}
      <form className="mt-6">
        <label htmlFor="">Enunciado de la pregunta</label>
        <input type="text" className="border"/>
        {/* Repuestas preguntas */}
        <div className="flex justify-center mt-6">
          <div className="grid items-center grid-cols-2 gap-5">

            {/* Respuesta 1 */}
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center border drop-shadow-3xl rounded-lg px-3 py-3">
                <CheckBox value={checked} onChange={handleChange}/>
                <p>
                  <span className="text-bright-blue font-semibold">A.</span>{" "}
                  Respuesta 1
                </p>
              </div>
              <AiOutlineClose className="bg-slate-400 text-white hover:bg-rosa-rojo rounded-full text-lg p-1"/>
            </div>

            {/* Respuesta 2 */}
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center border drop-shadow-3xl rounded-lg px-3 py-3">
                <CheckBox value={checked2} onChange={handleChange2}/>
                <p>
                  <span className="text-bright-blue font-semibold">B.</span>{" "}
                  Respuesta 2
                </p>
              </div>
              <AiOutlineClose className="bg-slate-400 text-white hover:bg-rosa-rojo rounded-full text-lg p-1"/>
            </div>

            {/* Respuesta 3 */}
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center border drop-shadow-3xl rounded-lg px-3 py-3">
                <CheckBox value={checked3} onChange={handleChange3}/>
                <p>
                  <span className="text-bright-blue font-semibold">C.</span>{" "}
                  Respuesta 3
                </p>
              </div>
              <AiOutlineClose className="bg-slate-400 text-white hover:bg-rosa-rojo rounded-full text-lg p-1"/>
            </div>

            {/* Respuesta 4 */}
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 items-center border drop-shadow-3xl rounded-lg px-3 py-3">
                <CheckBox value={checked4} onChange={handleChange4}/>
                <p>
                  <span className="text-bright-blue font-semibold">D.</span>{" "}
                  Respuesta 4
                </p>
              </div>
              <AiOutlineClose className="bg-slate-400 text-white hover:bg-rosa-rojo rounded-full text-lg p-1"/>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button className="flex items-center gap-2 btn-cuestionario font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">Añadir respuesta <AiOutlinePlus className='text-lg '/> </button>
        </div>

        <div className='mt-8'>
          <button className="flex items-center gap-2 btn-cuestionario font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">Añadir pregunta <AiOutlinePlus className='text-lg '/> </button>
        </div>

        <div className="mt-5">
          <button className="flex items-center gap-2 btn-cuestionario font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">Crear</button>
        </div>
      </form>
    </div>
  );
};

export default CrearCuestionario;
