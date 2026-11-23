import { Outlet } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import AbsoluteContainer from '@/shared/components/AbsoluteContainer'

import { AppHeader, AppSidebar, AppMain } from '@/features/app-layout'

import { AppContextProvider } from '@/shared/providers/AppContextProvider'

export default function AppLayout(){
  return(
    <AbsoluteContainer
      sx={(theme) => ({
        display: 'grid',
        gap: 0.1,
        gridTemplateAreas: `
          "header"
          "main"`,
        gridTemplateColumns: '1fr',
        gridTemplateRows: '58px 1fr',
        [theme.breakpoints.up('md')]: {
          gridTemplateAreas: `
            "sidebar header"
            "sidebar main"`,
          gridTemplateColumns: {
            md: '220px 1fr',
            lg: '250px 1fr',
            xl: '290px 1fr'
          },
          gridTemplateRows: '58px 1fr'
        }
      })}>
      <AppContextProvider>
        <AppHeader />
        <AppSidebar />
        <AppMain />
      </AppContextProvider>
    </AbsoluteContainer>
  )
}