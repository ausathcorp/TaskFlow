import { useTheme } from '@mui/material/styles'
import { colors } from './colors'

export function useLightTheme(){
    const theme = useTheme()
    return {
        palette: {
            mode: 'light',
            
            primary: {
                main: colors.blue[600],
                light: colors.blue[100],
                dark: colors.blue[800],
                subtle: colors.blue[100],
                contrastText: '#fff'
            },
            
            secondary: {
                main: colors.teal[600],
                light: colors.teal[100],
                dark: colors.teal[800],
                subtle: colors.teal[100],
                contrastText: '#fff'
            },
            
            success: {
                main: colors.green[600],
                light: colors.green[100],
                dark: colors.green[800],
                subtle: colors.green[100],
                contrastText: '#fff'
            },
            
            warning: {
                main: colors.amber[600],
                light: colors.amber[100],
                dark: colors.amber[800],
                subtle: colors.amber[100],
                contrastText: '#fff'
            },
            
            info: {
                main: colors.cyan[600],
                light: colors.cyan[100],
                dark: colors.cyan[800],
                subtle: colors.cyan[100],
                contrastText: '#fff'
            },
            
            error: {
                main: colors.red[600],
                light: colors.red[100],
                dark: colors.red[800],
                subtle: colors.red[100],
                contrastText: '#fff'
            },
                
            background: {
                default: colors.neutral[100],
                paper: '#fff',
                drawer: '#fff'
            },
            
            text: {
                primary: '#000',
                secondary: colors.gray[700],
                disabled: colors.gray[400],
            },
            
            divider: colors.neutral[300]
        }
    }
}