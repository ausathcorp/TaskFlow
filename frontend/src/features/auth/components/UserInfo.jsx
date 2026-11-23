import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useCurrentUser } from '../shared/hooks/useCurrentUser'

export function UserInfo(){
  const { user } = useCurrentUser();
  const fullname = [
    user?.profile.firstName,
    user?.profile.lastName
  ].join(' ');
  return(
    <Stack spacing={0}>
      <Typography 
        variant="subtitle2"
        sx={{
          lineHeight: 0.8,
          fontFamily: 'serif roboto sans-serif sans'
        }}>
        {fullname}
      </Typography>
      <Typography variant="caption">{user.role}</Typography>
    </Stack>
  )
}