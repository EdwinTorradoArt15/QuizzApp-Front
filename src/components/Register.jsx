import React from 'react'
import FormRegister from './FormRegister'
import Sliders from './Sliders'

const Register = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-slate-100 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen border-r-2">
        <Sliders/>
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
      >
        <FormRegister/>
      </div>
    </div>
  )
}

export default Register