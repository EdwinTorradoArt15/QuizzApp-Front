import { useState, useEffect } from "react";
import { preguntas } from "../data/datos";

const ResponderPreguntas = () => {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntuacion, setPuntuacion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(10);
    const [areDisabled, setAreDisabled] = useState(false);
    const [answersShown, setAnswersShown] = useState(false);

    const handleAnswerSubmit = (isCorrect, e) => {
        // añadimos puntuaciones
        if (isCorrect) setPuntuacion(puntuacion + 1);
        // añadimos estilos de preguntas correctas e incorrectas
        e.target.classList.add(isCorrect ? "bg-green-500" : "bg-red-500");
        // cambiar a la siguiente pregunta
        setTimeout(() => {
            if (preguntaActual === preguntas.length - 1) {
                setIsFinished(true);
            } else {
                setPreguntaActual(preguntaActual + 1);
                setTiempoRestante(10);
            }
        }, 1500);
    };

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
            if (tiempoRestante === 0) setAreDisabled(true);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [tiempoRestante]);

    if (isFinished)
        return (
            <main className="flex flex-col items-center text-center">
                    <span className="dark:text-white text-base movilM:text-lg mb-3">
                        Obtuviste{" "}
                        <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                            {puntuacion}
                        </span>{" "}
                        de{" "}
                        <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                            {preguntas.length}
                        </span>{" "}
                    </span>
                    <div className="flex justify-center items-center gap-3">
                        <button
                            className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                            onClick={() => (window.location.href = "/")}
                        >
                            Volver a jugar
                        </button>
                        <button
                            className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                            onClick={() => {
                                setIsFinished(false);
                                setAnswersShown(true);
                                setPreguntaActual(0);
                            }}
                        >
                            Ver respuestas
                        </button>
                    </div>
            </main>
        );

    if (answersShown)
        return (
            <main className="flex flex-col items-center text-center">
                    <div className="">
                        <span className="dark:text-white text-base movilM:text-lg">
                            {" "}
                            Pregunta{" "}
                            <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                                {preguntaActual + 1}
                            </span>{" "}
                            de
                        </span>{" "}
                        <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                            {preguntas.length}
                        </span>
                    </div>
                    <div className="dark:text-white text-base movilM:text-lg">
                        {preguntas[preguntaActual].titulo}
                    </div>
                    <div className="my-3">
                        <span className="border-2 border-bright-blue/20 placeholder:text-xs movilM:placeholder:text-sm focus:within:border-bright-blue focus:outline-none border-gray-300 rounded-md p-2 w-64 movilM:w-80 tableta:w-96">
                            {
                                preguntas[preguntaActual].opciones.filter(
                                    (opcion) => opcion.isCorrect
                                )[0].textoRespuesta
                            }
                        </span>
                    </div>
                    <button
                        className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                        onClick={() => {
                            if (preguntaActual === preguntas.length - 1) {
                                window.location.href = "/completados";
                            } else {
                                setPreguntaActual(preguntaActual + 1);
                            }
                        }}
                    >
                        {preguntaActual === preguntas.length - 1
                            ? "Ver completados"
                            : "Siguiente"}
                    </button>
            </main>
        );

    return (
        <main className="flex flex-col items-center">
            <div className="">
                <span className="dark:text-white text-base movilM:text-lg">
                    Pregunta{" "}
                    <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                        {preguntaActual + 1}
                    </span>{" "}
                    de
                </span>{" "}
                <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                    {preguntas.length}{" "}
                </span>
            </div>
            <div className="flex justify-between gap-7">
                <p className="dark:text-white text-base movilM:text-lg">
                    {preguntas[preguntaActual].titulo}
                </p>
                {!areDisabled && (
                    <span className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                        Tiempo restante: {tiempoRestante} segundos
                    </span>
                )}
            </div>
            <div className="grid items-center grid-cols-2 gap-5 my-3">
                {preguntas[preguntaActual].opciones.map((respuesta) => (
                    <button
                        className="border-2 border-bright-blue/20 placeholder:text-xs movilM:placeholder:text-sm focus:within:border-bright-blue focus:outline-none border-gray-300 rounded-md p-2 w-64 movilM:w-80 tableta:w-96"
                        disabled={areDisabled}
                        key={respuesta.textoRespuesta}
                        onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
                    >
                        {respuesta.textoRespuesta}
                    </button>
                ))}
            </div>
            {areDisabled && (
                <button
                    className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                    onClick={() => {
                        setTiempoRestante(10);
                        setAreDisabled(false);
                        if (preguntaActual === preguntas.length - 1) {
                            setIsFinished(true);
                        } else {
                            setPreguntaActual(preguntaActual + 1);
                        }
                    }}
                >
                    Continuar
                </button>
            )}
        </main>
    );
};

export default ResponderPreguntas;
