import { useState } from "react";
import { DropDownCat } from "../components";

const Categoria = ({ categoria, getCategorias }) => {
  const [display, setDisplay] = useState(false);
  return (
    <div className="flex flex-col items-end">
      
      <DropDownCat
        id={categoria.id}
        getCategorias={getCategorias}
        display={display}
        setDisplay={setDisplay}
      />
      <div
        style={{
          backgroundImage: `url(${categoria.urlImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="card"
      >
        <div className="cursor-default">
          <span className="btn btn-categoria font-extrabold text-lg px-3 py-2">
            {categoria.nombre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Categoria;
