import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

export default function App(){
    return(
        <Box
            sx={{
                p: 2, 
                bgcolor: '#F1F1F1'
            }}>
            <title>TaskFlow Home</title>
            <Paper sx={{
                p: 2,
                gap: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center'
                }}>
                <Typography variant="h3">
                    Welcome to TaskFlow
                </Typography>
                <Stack spacing={1}>
                    <Link to='/register'>Open register</Link>
                    <Link to='/login'>Open login</Link>
                </Stack>
            </Paper>
        </Box>
    )
}