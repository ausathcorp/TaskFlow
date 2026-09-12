import { useTheme } from '@mui/material/styles'
import { colors } from './colors'

export function useDarkTheme(){
    const theme = useTheme()
    return {
        palette: {
            mode: 'dark',
            
            primary: {
                main: colors.blue[500],
                light: colors.blue[200],
                dark: colors.blue[800],
                subtle: colors.blue[900],
                contrastText: colors.blue[50]
            },
            
            secondary: {
                main: colors.teal[600],
                light: colors.teal[200],
                dark: colors.teal[800],
                subtle: colors.teal[900],
                contrastText: '#fff'
            },
            
            success: {
                main: colors.green[500],
                light: colors.green[200],
                dark: colors.green[800],
                subtle: colors.green[900],
                contrastText: colors.green[50]
            },
            
            warning: {
                main: colors.amber[500],
                light: colors.amber[200],
                dark: colors.amber[800],
                subtle: colors.amber[900],
                contrastText: colors.amber[50]
            },
            
            info: {
                main: colors.cyan[500],
                light: colors.cyan[200],
                dark: colors.cyan[800],
                subtle: colors.cyan[900],
                contrastText: colors.cyan[50]
            },
            
            error: {
                main: colors.red[500],
                light: colors.red[200],
                dark: colors.red[800],
                subtle: colors.red[900],
                contrastText: colors.red[50]
            },
            
            background: {
                default: '#090909',
                paper: '#1F1F1F',
                drawer: '#090909'
            },
            text: {
                primary: '#fff',
                secondary: colors.gray[300],
                disabled: colors.gray[500],
            },
            divider: colors.neutral[600]
        }
    }
}