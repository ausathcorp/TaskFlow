import Paper from '@mui/material/Paper'

export default function AppPaper({ children, sx=[], ...props }){
  return(
    <Paper
      elevation={0}
      sx={[
        {
          p: 2,
          color: 'text.secondary',
          borderRadius: 0
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...props}>
      {children}
    </Paper>
  )
}