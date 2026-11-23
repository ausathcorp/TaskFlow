import Toolbar from '@mui/material/Toolbar'
import useDeviceType from '@/shared/hooks/useDeviceType'
import Applogo from '@/shared/components/Applogo'
import SidebarToggle from './SidebarToggle'

export default function SidebarHeader(){
  const { isDesktop } = useDeviceType();
  return(
    <Toolbar 
      sx={{
        justifyContent: {
          xs: 'space-between', 
          md: 'center'
        }
      }}>
      <Applogo width={isDesktop ? 0.8 : 36} />
      {!isDesktop && <SidebarToggle />}
    </Toolbar>
  )
}
