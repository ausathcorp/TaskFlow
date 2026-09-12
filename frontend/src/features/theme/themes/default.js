import { useTheme } from '@mui/material/styles'
import { colors } from './colors'
export function useDefaultTheme(){
    const theme = useTheme();
    return {
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        padding: theme.spacing(2)
                    }
                }
            }
        }
    }
}