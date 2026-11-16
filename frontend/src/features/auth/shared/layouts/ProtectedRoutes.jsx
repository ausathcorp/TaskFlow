import { Navigate, Outlet } from 'react-router-dom';
import { useGetMeQuery } from '../services/api'
import LoadingPage from '@/shared/components/LoadingPage'

export default function ProtectedRoutes(){
  const {
    isFetching,
    isSuccess,
    isError,
  } = useGetMeQuery();
  if(isFetching)
    return <LoadingPage />
  if(isError)
    return(
      <Navigate 
        to='/login'
        replace
        state={{ reason: 'Session_Expired' }}
      />
    )
  return <Outlet />
}