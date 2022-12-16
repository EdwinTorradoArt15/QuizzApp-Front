import { useState } from "react";

import {CardCategoria, DropDownCat} from "../components";

const Categoria = ({categoria}) => {

    const [display, setDisplay] = useState(false)
  return (
    <div className="flex flex-col items-end">
            <DropDownCat id={categoria.id} display={display} setDisplay={setDisplay}/>
            <CardCategoria
              key={categoria.id}
              id={categoria.id}
              imagen={categoria.urlImage}
              nombreCategoria={categoria.nombre}
            />
          </div>
  )
}

export default Categoria