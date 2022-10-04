import SearchBar from '../components/SearchBar'
import { masPopulares } from '../data/datos'
import { categorias } from '../data/datos'

const Inicio = () => {
  return (
    <div className="w-full p-3">

      {/* Barra de busqueda */}
        <SearchBar/>
        <h1 className='mt-7 font-bold text-2xl'>Categorias mas populares</h1>
        <div className="flex flex-wrap my-7 justify-center gap-10 items-center">
          {masPopulares.map((item) => (
            <div
              key={item.id}
              style={{backgroundImage:`url(${item.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}
              className='card'
            >
              <div>
                <button className='border-2 rounded-md px-3 py-2 text-white font-extrabold hover:bg-white hover:text-black'>
                  {item.nombreCat}
                </button>
              </div>
            </div>
          ))}
        </div>

        <h1 className='my-7 font-bold text-2xl'>Elige una categoria</h1>
        <div className='flex flex-wrap my-7 justify-center gap-10 items-center'>
        {categorias.map((item) => (
            <div
              key={item.id}
              style={{backgroundImage: `url(${item.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}
              className='card'
            >
              <div>
                <button className='border-2 rounded-md px-3 py-2 text-white font-extrabold hover:bg-white hover:text-black'>
                  {item.nombreCat}
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Inicio