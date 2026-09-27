import {
    Box,
    Paper,
    Collapse,
    Container } from '@mui/material'
import AppLogo from '../components/Applogo'
import { Outlet } from 'react-router-dom'

export default function FormLayout(){
    return(
        <Box
            component="section"
            sx={{
                p: {
                    xs: 2,
                    xl: 4
                },
                minHeight: '100vh',
                width: 1,
                bgcolor: 'background.default'
            }}>
            
            <Box 
                sx={{
                    width: {
                        xs: 120,
                        sm: 160,
                        md: 200,
                        lg: 230,
                        xl: 280
                    },
                    height: 'auto'
                }}>
                <AppLogo />
            </Box>
            
            <Container
                maxWidth='sm'
                sx={{
                    width: {
                        xs: 1,
                        sm: 0.9,
                        md: 0.7,
                        lg: 0.6,
                        xl: 0.5
                    },
                    mb: 1,
                    p: {
                        xs: 0,
                        md: 2
                    },
                    height: 1,
                    bgcolor: 'transparent'
                }}>
                <Collapse in
                    appear
                    mountOnEnter
                    timeout={2000}>
                    <Outlet />
                </Collapse>
            </Container>
        </Box>
    )
}