import Button from '@mui/material/Button'
import { useLogoutService } from './useLogoutService'
import LogoutIcon from '@mui/icons-material/Logout'

export function LogoutButton({ label='Logout', ...props }){
  const { isLoading, handleLogout } = useLogoutService();
  return(
    <Button
      startIcon={<LogoutIcon />}
      variant="contained"
      loading={isLoading}
      loadingPosition="start"
      onClick={handleLogout}
      color="error"
      sx={{ width: 1 }}
      {...props}
      >
      {label}
    </Button>
  )
}