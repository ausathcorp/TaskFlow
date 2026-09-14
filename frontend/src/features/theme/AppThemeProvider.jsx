import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { ThemeContext } from './ThemeContexts'
import { 
    useDefaultTheme, 
    useLightTheme, 
    useDarkTheme } from './themes'

export function AppThemeProvider({ children }){
    const [mode, setMode] = useState('light');
    const themes = ['light', 'dark'];
    
    let defaultTheme = useDefaultTheme();
    let lightTheme = useLightTheme();
    let darkTheme = useDarkTheme();
    
    let themesMap = {
        light: lightTheme,
        dark: darkTheme
    }
    
    const appTheme = createTheme({
        ...defaultTheme,
        ...themesMap[mode]
    });
    
    return(
        <ThemeProvider theme={appTheme}>
            <ThemeContext.Provider value={{ themes, mode, setMode }}>
                <CssBaseline />
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}