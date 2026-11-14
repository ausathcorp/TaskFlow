import { 
  Box,
  Stack,
  LinearProgress
} from '@mui/material'
import Applogo from './Applogo'

export default function LoadingPage(){
  return(
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        height: '100svh',
        bgcolor: 'background.paper'
      }}>
      <Stack
        spacing={-1}
        sx={{
          width: {
            xs: 120,
            md: 160,
            xl: 200
          }
        }}>
        <Applogo />
        <LinearProgress
          color="primary"
          sx={{
            borderRadius: 4,
            height: 2,
            width: 1,
            variant: 'indeterminate'
          }}
        />
      </Stack>
    </Box>
  )
}