import AppPaper from '@/shared/components/AppPaper';
import { Outlet } from 'react-router-dom';

export default function AppMain(){
  return(
    <AppPaper
      sx={{
        p: 0,
        gridArea: 'main',
        bgcolor: 'background.default'
      }}>
      <Outlet />
    </AppPaper>
  )
}