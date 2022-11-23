
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
            <div className="p-3 dark:bg-[#191919]/90">
                <div className="card-header">
                    <h3 className="font-medium text-base movilM:text-lg dark:text-white">{nombre}</h3>
                    <span className="text-xs movilM:text-sm dark:text-white">{usuario}</span>
                </div>
                <p className="text-sm movilM:text-base text-white rounded-md px-3 py-1 border-2 border-light-yellow dark:border-[#423F3E] bg-light-yellow font-medium dark:bg-[#423F3E] w-max">
                    {categoria}
                </p>
                <div className="flex gap-2.5 py-2">
                    <button className="btn-cuestionario movilM:text-base font-medium px-3 py-1 text-sm rounded-lg">
                        Modificar
                    </button>
                    <button className=" btn-cuestionario movilM:text-base font-medium px-3 py-1 text-sm rounded-lg">
                        Estadisticas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCuestionarios;
