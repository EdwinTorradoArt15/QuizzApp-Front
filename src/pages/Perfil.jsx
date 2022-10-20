import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { FaPen, FaPlus } from "react-icons/fa";
import banner from "../img/banner.avif";
import { catPaises } from "../data/datos";
import imgperfil from "../img/imgperfil.jpeg";

const Perfil = () => {
  return (
    <div className="w-full p-3">

      {/* Banner */}
      <div className="banner">
        <img
          src={banner}
          alt="Imagen banner"
          className="w-full h-48 rounded-md object-cover"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative bottom-20">
          <img
            src={imgperfil}
            alt="Imagen perfil"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-48 h-48 border-4 border-black/20 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mt-32">
        <span className="bg-lime-green text-white px-2 rounded-md font-medium">
          5.0
        </span>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            style={{ color: "#FFEA00" }}
          />
        </Stack>
      </div>

      {/* Info usuario */}
      <div className="mt-1 flex flex-col items-center">
        <p className="font-bold text-xl">Edwin Torrado</p>
        <p className="font-medium text-base text-black/50">UX/UI - Front-End</p>
        <div className="flex justify-center pt-2">
          <button className="flex items-center gap-2 btn-cuestionario font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">
            Editar perfil <FaPen size={13} />
          </button>
        </div>
      </div>

      {/* Botones informacion */}
      <div className="flex gap-3 justify-center mt-5">
        <button className="flex items-center gap-2 btn-cuestionario font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">
          Seguir <FaPlus size={13} />{" "}
        </button>
        <button className="bg-white drop-shadow-lg border rounded-md font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">
          160K seguidores
        </button>
        <button className="bg-white drop-shadow-lg border rounded-md font-semibold px-3 py-2 text-14 2xl:text-lg md:text-base">
          200K seguidos
        </button>
      </div>

      {/* Creados recientemente */}
      <div className="mt-7">
        <h1 className="font-bold text-2xl ">Creados recientemente</h1>
        <div className="flex flex-wrap mt-7 justify-center gap-6 items-center">
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
    </div>
  );
};

export default Perfil;
