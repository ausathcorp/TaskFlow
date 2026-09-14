import { ThemeContext } from './ThemeContexts'
import { useContext } from 'react'

export const useThemeMode = () => {
    let context = useContext(ThemeContext);
    if(!context)
        throw new Error('useThemeMode hook must be called within AppThemeProvider');
    return context;
}