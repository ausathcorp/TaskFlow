import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function UserInfo(){
  return(
    <Stack spacing={0}>
      <Typography 
        variant="subtitle2"
        sx={{
          lineHeight: 0.8,
          fontFamily: 'serif roboto sans-serif sans'
        }}>
        Aliyu Farouq
      </Typography>
      <Typography variant="caption">super admin</Typography>
    </Stack>
  )
}