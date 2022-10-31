import banner from "../img/banner.avif";
import { useForm, useFieldArray } from "react-hook-form";

const CrearCuestionario = () => {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "preguntas",
  });

  return (
    <div className="w-full p-3">
      {/* Header */}
      <form
        className="flex gap-5 items-center"
        onSubmit={handleSubmit(console.log)}
      >
        <label>Nombre del cuestionario</label>
        <input type="text" placeholder="Nombre" className="border" />

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
      <form className="mt-6" onSubmit={handleSubmit(data => console.log(data))}>
        {fields.map(({ id, nombre, r1,r2,r3,r4 }, index) => {
          return (
            <div key={id}>
              <div className="flex items-center gap-2">
                <label className="text-bright-blue font-bold text-xl">1.</label>
                <input
                  {...register(`preguntas.${index}.nombre`)}
                  defaultValue={nombre}
                  placeholder="Pregunta"
                  className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                />
              </div>
              <div className="flex justify-center items-center my-4">
                  <div className="grid items-center grid-cols-2 gap-5">
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r1} {...register(`preguntas.${index}.r1`)} type="checkbox"/>
                        <input defaultValue={r1} {...register(`preguntas.${index}.r1`)} placeholder="Respuesta 1" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r2} {...register(`preguntas.${index}.r2`)} type="checkbox"/>
                        <input defaultValue={r2} {...register(`preguntas.${index}.r2`)} placeholder="Respuesta 2" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r3} {...register(`preguntas.${index}.r3`)} type="checkbox"/>
                        <input defaultValue={r3} {...register(`preguntas.${index}.r3`)} placeholder="Respuesta 3" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r4} {...register(`preguntas.${index}.r4`)} type="checkbox"/>
                        <input defaultValue={r4} {...register(`preguntas.${index}.r4`)} placeholder="Respuesta 4" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                  </div>
              </div>
              {/* <select
                {...register(`preguntas.${index}.type`)}
                defaultValue={type}
                className="border-2 border-black"
              >
                <option value="">Select</option>
                <option value="10">ItemA</option>
                <option value="20">ItemB</option>
              </select> */}
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col w-max gap-7">
          <button
            className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2"
            type="button"
            onClick={() => append({})}
          >
            Agregar
          </button>
          <input  className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2" type="submit" />
        </div>
      </form>
      
    </div>
  );
};

export default CrearCuestionario;
