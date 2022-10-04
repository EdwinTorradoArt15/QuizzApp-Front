import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Fragment } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import banner from "../img/banner.avif";
import { catPaises } from "../data/datos";
import imgperfil from "../img/imgperfil.jpeg";

const Perfil = () => {
  return (
    <Fragment>
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
      <div className="mt-1 text-center">
        <p className="font-bold text-xl">Edwin Torrado</p>
        <p className="font-medium text-lg text-black/50">UX/UI - Front-End</p>
        <div className="flex justify-center">
          <button className="flex items-center gap-2 border-2 border-bright-blue bg-bright-blue p-2 text-white hover:bg-white hover:text-bright-blue font-semibold rounded-md text-lg ">
            Editar perfil <FaPen size={13} />
          </button>
        </div>
      </div>

      {/* Botones informacion */}
      <div className="flex gap-3 justify-center mt-5">
        <button className="flex items-center gap-2 border-2 border-bright-blue bg-bright-blue p-2 text-white hover:bg-white hover:text-bright-blue font-semibold rounded-md text-lg">
          Seguir <FaPlus size={13} />{" "}
        </button>
        <button className="bg-white drop-shadow-lg border p-3 rounded-md text-lg font-semibold">
          160K seguidores
        </button>
        <button className="bg-white drop-shadow-lg border p-3 rounded-md text-lg font-semibold">
          200K seguidos
        </button>
      </div>

      {/* Creados recientemente */}
      <div className="mt-7">
        <h1 className="mx-7 font-bold text-2xl ">Creados recientemente</h1>
        <div className="flex flex-wrap mt-7 justify-center gap-5 items-center">
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
                  <h1 className="font-semibold text-base">{item.titulo}</h1>
                  <span className="font-semibold text-14 text-black/50">
                    {item.nombreUser}
                  </span>
                </div>
                <div className="px-1.5 pb-2">
                  <button className="text-14 text-white rounded-md py-1 px-9 border-2 border-light-yellow bg-light-yellow font-semibold cursor-default">
                    {item.categoria}
                  </button>

                  <div className="flex gap-2.5 py-2">
                    <button className="buttonCardCuestionario">
                      Modificar
                    </button>
                    <button className="buttonCardCuestionario">
                      Estadisticas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Perfil;
