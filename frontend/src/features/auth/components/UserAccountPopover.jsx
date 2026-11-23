import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useCurrentUser } from '../shared/hooks/useCurrentUser'
import { UserAvatar } from './UserAvatar'
import { UserInfo } from './UserInfo'


export function UserAccountPopover({ open, anchorEl, handleClose }){
  const { user } = useCurrentUser();
  return(
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      sx={{maxWidth: 320}}
      slotProps={{
        paper: {
          elevation: 0,
          sx:{
            p: 2,
            borderRadius: 2,
            boxShadow: '0 0 8px -4px black',
            width: {
              xs: 250,
              md: 300,
              lg: 320
            }
          }
        }
      }}>
      <Stack
        spacing={0.5}
        sx={{alignItems: 'center'}}>
        <UserAvatar size={80} />
        <UserInfo />
        <Typography sx={{fontSize: 14}}>{user.email}</Typography>
      </Stack>
    </Popover>
  )
}