import React, { useRef, useState } from 'react';
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import { UserAvatar } from './UserAvatar'
import { UserInfo } from './UserInfo'
import { UserAccountPopover } from './UserAccountPopover'
import useDeviceType from '@/shared/hooks/useDeviceType'

export function UserProfile(){
  const { isDesktop } = useDeviceType();
  const [open, setOpen] = useState(false);
  const stackRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
    <>
      <Stack
        ref={stackRef}
        direction='row'
        spacing={0.5}
        sx={{alignItems: 'center'}}>
        <IconButton onClick={handleOpen}>
          <UserAvatar size={32} />
        </IconButton>
        {isDesktop && <UserInfo />}
      </Stack>
      <UserAccountPopover 
        open={open}
        anchorEl={stackRef.current}
        handleClose={handleClose}
      />
    </>
  )
}