import {
    Box,
    Typography,
    Button,
    Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { getAppState } from './appSlice'

export default function App(){
    const appState = useSelector(getAppState);
    return(
        <Box
            sx={{
                p: 2, 
                bgcolor: '#F1F1F1'
            }}>
            <Paper sx={{p: 2}} >
                <Typography sx={{mb: 2, textAlign: 'center'}} variant="h6">Welcome to Mui-Router-RTK Template</Typography>
                <Typography sx={{my: 2, textAlign: 'center', color: "success.main"}}>{appState}</Typography>
                <Button variant="contained">Mui Button</Button>
            </Paper>
        </Box>
    )
}