import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useAppContext } from '@/shared/hooks/useAppContext'

export default function SidebarToggle(){
  const { sidebarOpened, toggleSidebar } = useAppContext();
  return(
    <IconButton
      sx={{p: 0.5}}
      onClick={toggleSidebar}>
      {!sidebarOpened ?
        <MenuIcon /> :
        <CloseIcon />
      }
    </IconButton>
  )
};

