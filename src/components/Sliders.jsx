import { useRef, useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import slider1 from "../img/slider1.jpg";
import slider2 from "../img/slider2.jpg";
import slider3 from "../img/slider3.jpg";

const imgsLogin = [slider1, slider2, slider3];

let count = 0;
let slideInterval;

const Sliders = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

    //Remover animacion
  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  // Hook que agarra el time de cada diapo y la animacion de transicion
  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    // Pausar la animacion cuando sobreponga el mouse
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    // Empezar animacion cuando quite el mouse
    slideRef.current.addEventListener("mouseleave", startSlider);
    startSlider()

    return () => {
        pauseSlider()
    }
  }, []);

  // Hacemos el time de las diapositivas
  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 4000);
  };

    //Pausar animacion
  const pauseSlider = () => {
    clearInterval(slideInterval)
  }

  // Funcion para pasar la diapositiva
  const handleOnNextClick = () => {
    count = (count + 1) % imgsLogin.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  // Funcion para devolver la diapositiva
  const handleOnPrevClick = () => {
    const imgsLoginLength = imgsLogin.length;
    count = (currentIndex + imgsLoginLength - 1) % imgsLoginLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <div ref={slideRef} className="w-full select-none relative">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imgsLogin[currentIndex]}
          alt="Imagen 1"
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          onClick={handleOnPrevClick}
          className="text-bright-blue text-opacity-50 hover:text-opacity-100 transition"
        >
          {" "}
          <BsFillArrowLeftCircleFill size={30} />{" "}
        </button>
        <button
          onClick={handleOnNextClick}
          className="text-bright-blue text-opacity-50 hover:text-opacity-100 transition"
        >
          {" "}
          <BsFillArrowRightCircleFill size={30} />{" "}
        </button>
      </div>
    </div>
  );
};

export default Sliders;
