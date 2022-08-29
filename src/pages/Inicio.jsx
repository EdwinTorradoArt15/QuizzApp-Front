import React from 'react'
import { dataCard } from '../data/datos'
import imgperfil from '../img/imgperfil.jpeg'

const Inicio = () => {
  return (
    <div className="mt-10">
        <div className="flex flex-wrap justify-center gap-5 items-center">
          {dataCard.map((item) => (
            <div
              key={item.title}
              className="card"
            >
              <div className="py-2 px-2 flex items-center">
                <img className="img-profile" src={item.imgperfil} alt="foto-perfil" />
                <div className="px-1">
                  <p className="font-bold text-lg lg:text-base">{item.nombCuest}</p>
                  <p className="text-very-gray text-base lg:text-sm">{item.usuario}</p>
                </div>
              </div>

              <div className="p-2 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="date">{item.fecha}</span>
                  <span className="status">{item.estado}</span>
                </div>
                <h2 className="description-card">{item.descripcion}</h2>
                <div className="mt-3">
                  <div className="flex gap-1">
                    <button className="button-card">{item.boton1}</button>
                    <button className="button-card">{item.boton2}</button>
                    <button className="button-card">{item.boton3}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Inicio