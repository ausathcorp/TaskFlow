import authApi, { useLogoutMutation } from '../shared/services/api'
import { useSnackbar } from '@/features/snackbar'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../shared/hooks/useCurrentUser'

export function useLogoutService(){
  const user = useCurrentUser();
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async() => {
    try{
      let response = await logout(user._id).unwrap();
      if(response.success){
        snackbar({
          message: response?.message || 'Logout succeed',
          sevrity: 'success',
          variant: 'filled'
        });
        authApi.util.invalidateTags(['Auth']);
        navigate('/login', { replace: true, state: { reason: 'User_Logout' }});
      }
    } catch(err) {
      snackbar({
        message: err?.message || 'Logout Failed',
        severity: 'error',
        variant: 'filled'
      })
    }
  }
  return { isLoading, handleLogout };
}