import { Navigate } from 'react-router-dom'

const PrivateRouts = ({children}) => {

    if(!localStorage.getItem('token')){
        return <Navigate to="/" />
    }

  return (
    <>{children}</>
  )
}

export default PrivateRouts