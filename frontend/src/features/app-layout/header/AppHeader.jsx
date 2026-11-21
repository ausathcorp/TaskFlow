import AppBar from "@/shared/components/AppPaper";
import Toolbar from "@mui/material/Toolbar";
import useDeviceType from "@/shared/hooks/useDeviceType";

import Applogo from '@/shared/components/Applogo'
import SidebarToggle from '../sidebar/SidebarToggle'
import HeaderTitle from './HeaderTitle'
import HeaderIcons from './HeaderIcons'

export default function AppHeader() {
  const { isDesktop } = useDeviceType();
  return (
    <AppBar
      raised={0}
      elevation={0}
      position={isDesktop ? "relative" : "fixed"}
      sx={{
        p: 0,
        gridArea: "header",
      }}
    >
      <Toolbar 
        disableGutters 
        sx={{ 
          alignItems: 'center',
          px: 1,
          color: 'text.primary',
        }}>
        {!isDesktop && <SidebarToggle />}
        {!isDesktop && <Applogo width={32} />}
        <HeaderTitle />
        <HeaderIcons />
      </Toolbar>
    </AppBar>
  );
}