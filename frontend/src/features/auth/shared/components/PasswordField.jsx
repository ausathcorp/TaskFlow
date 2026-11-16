import { useState } from 'react'

import AdornmentInput from './AdornmentInput'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined'
import LockIcon from '@mui/icons-material/LockOutlined'

export default function PasswordField(props){
    const [showPassword, setShowPassword] = useState(false);
    return(
        <AdornmentInput
            autoComplete="new-password"
            {...props}
            startAdornment={
                <Tooltip title="Password" placement="top">
                    <LockIcon />
                </Tooltip>
            }
            endAdornment={
                <Tooltip title={showPassword ? 'Hide':'Show'} placement="top">
                    <IconButton 
                        aria-label={showPassword ? 'Hide Password button' : 'Show Password button'}
                        onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Tooltip>
            }
            type={showPassword ? 'text' : 'password'}
        />
    )
}
