import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from './ThemeHooks'

const iconSx = ({
  width: {xs: 16, md: 18},
  height: {xs: 16, md: 18}
});

export function ThemeToggle({ ...props }){
  const { mode, setMode } = useThemeMode();
  const handleToggleMode = () =>
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  return(
    <Tooltip 
      placement="top"
      title="Theme"
      >
      <IconButton
        aria-label="Toggle App Theme"
        onClick={handleToggleMode}>
        {(mode === 'light') ?
          <LightModeIcon sx={iconSx} /> :
          <DarkModeIcon sx={iconSx} />
        }
      </IconButton>
    </Tooltip>
  )
}