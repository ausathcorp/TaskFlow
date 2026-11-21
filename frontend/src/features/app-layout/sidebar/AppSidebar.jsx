import Stack from '@mui/material/Stack'
import Drawer from '@mui/material/Drawer'
import useDeviceType from '@/shared/hooks/useDeviceType'
import { useAppContext } from '@/shared/hooks/useAppContext'

import SidebarHeader from './SidebarHeader'
import SidebarNavs from './SidebarNavs'
import SidebarFooter from './SidebarFooter'

export default function AppSidebar(){
  const { isDesktop } = useDeviceType();
  const { sidebarOpened, closeSidebar } = useAppContext()
  return(
    <Drawer
      variant={ isDesktop ? 'permanent' : 'temporary' }
      open={!isDesktop ? sidebarOpened : true}
      onClose={closeSidebar}
      slotProps={{
        paper: {
          component: Stack,
          sx: {
            p: 0,
            width: {
              xs: 220,
              md: 220,
              lg: 250,
              xl: 290
            }
          }
        }
      }}
      sx={{
        gridArea: 'sidebar',
        maxWidth: 290
      }}>
        <SidebarHeader />
        <SidebarNavs />
        <SidebarFooter />
    </Drawer>
  )
}