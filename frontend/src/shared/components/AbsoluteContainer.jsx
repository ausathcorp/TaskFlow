import Box from '@mui/material/Box'

export default function AbsoluteContainer({ children, sx=[], ...props }){
  return(
    <Box
      sx={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          color: 'text.secondary'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...props}>
      {children}
    </Box>
  )
}