import AdornmentInput from './AdornmentInput'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import PersonIcon from '@mui/icons-material/PersonOutlined'

export default function UsernameField(props){
    return (
        <AdornmentInput
            autoComplete="username"
            {...props}
            startAdornment={
                <Tooltip title="User" placement="top">
                    <IconButton sx={{ml: -1, gap: -0.5}}>
                        <PersonIcon />
                    </IconButton>
                </Tooltip>
            }
            type="text"
        />
    )
}