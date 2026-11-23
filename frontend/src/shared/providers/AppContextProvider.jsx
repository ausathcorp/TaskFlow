import { AppContext } from '../contexts/AppContext'
import React, { useState } from 'react'

export function AppContextProvider({ children }){
  const [headerTitle, setHeaderTitle] = useState('Dashboard');
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);
  const toggleSidebar = () => setSidebarOpened(prev => !prev);
  
  return(
    <AppContext.Provider value={{
      headerTitle,
      setHeaderTitle,
      sidebarOpened,
      openSidebar,
      closeSidebar,
      toggleSidebar
    }}>
      {children}
    </AppContext.Provider>
  )
}