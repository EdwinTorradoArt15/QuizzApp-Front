import { Navigate } from 'react-router-dom'

const PublicRouts = ({children}) => {

    if(localStorage.getItem('token')){
        return <Navigate to="/dashboard/inicio" />
    }

  return (
    <>{children}</>
  )
}

export default PublicRouts