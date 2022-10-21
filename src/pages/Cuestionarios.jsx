import { Link } from "react-router-dom";
import { catMusica, catPaises } from "../data/datos";
import SearchBar from "../components/SearchBar";
import '../css/pages/cuestionarios.css';
const Cuestionarios = () => {

  return (
    <div className="w-full p-3">
      <SearchBar />

    <div className="mt-7">
      <Link to={'/dashboard/cuestionarios/crear_cuestionarios'} className="btn-cuestionario font-semibold px-3 py-2 text-xl">
          Crear cuestionario
      </Link>
    </div>

      {/* Categoria paises */}
      <div className="mt-7">
        <h1 className="font-bold text-2xl">Paises</h1>
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {catPaises.map((item) => (
            <div key={item.id} className="cardCuestionarios">
              <div className="container-img">
                <img
                  src={item.imagen}
                  alt="Imagen carta"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="card-body">
                <div className="card-header">
                  <h1 className="font-semibold text-base 2xl:text-lg md:text-lg">{item.titulo}</h1>
                  <span className="font-semibold text-14 2xl:text-base md:text-base text-black/50">
                    {item.nombreUser}
                  </span>
                </div>
                <div className="px-1.5 pb-2">
                  <p className="text-14 2xl:text-lg md:text-base text-white rounded-md px-5 py-1 border-2 border-light-yellow bg-light-yellow font-semibold w-max">
                    {item.categoria}
                  </p>

                  <div className="flex gap-2.5 py-2">
                    <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                      Modificar
                    </button>
                    <button className="btn-cuestionario font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                      Estadisticas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fin categoria paises */}

      {/* Categoria musica */}
      <div className="mt-7 ">
        <h1 className="font-bold text-2xl">Musica</h1>
        <div className="flex flex-wrap my-7 justify-center gap-6 items-center">
          {catMusica.map((item) => (
            <div key={item.id} className="cardCuestionarios">
              <div key={item.id} className="cardCuestionarios">
                <div className="container-img">
                  <img
                    src={item.imagen}
                    alt="Imagen carta"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="card-body">
                  <div className="card-header">
                    <h1 className="font-semibold text-base 2xl:text-lg md:text-lg">{item.titulo}</h1>
                    <span className="font-semibold text-14 2xl:text-base md:text-base text-black/50">
                      {item.nombreUser}
                    </span>
                  </div>
                  <div className="px-1.5 pb-2">
                    <p className="text-14 2xl:text-lg md:text-base text-white rounded-md px-5 py-1 border-2 border-lime-green bg-lime-green font-semibold w-max">
                      {item.categoria}
                    </p>

                    <div className="flex gap-2.5 py-2">
                      <button className="btn-cuestionario btn-cuestionarios font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                        Modificar
                      </button>
                      <button className="btn-cuestionario btn-cuestionarios font-semibold px-2 py-1 text-14 2xl:text-lg md:text-base">
                        Estadisticas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fin categoria musica */}

    </div>
  );
};

export default Cuestionarios;
