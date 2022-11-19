
const CardCuestionarios = ({ nombre, usuario, categoria }) => {
    return (
        <div className="cardCuestionarios">
            <div className="container-img">
                <img
                    src="https://picsum.photos/1000/700"
                    alt="Imagen cuestionario"
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-3">
                <div className="card-header">
                    <h3 className="font-medium text-base">{nombre}</h3>
                    <span className="text-sm">{usuario}</span>
                </div>
                <p className="text-base text-white rounded-md px-3 py-1 border-2 border-light-yellow bg-light-yellow font-medium w-max">
                    {categoria}
                </p>
                <div className="flex gap-2.5 py-2">
                    <button className="btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                        Modificar
                    </button>
                    <button className=" btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                        Estadisticas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCuestionarios;
