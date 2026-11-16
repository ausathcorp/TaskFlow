import AdornmentInput from './AdornmentInput'
import Tooltip from '@mui/material/Tooltip'
import EmailIcon from '@mui/icons-material/EmailOutlined'

export default function EmailField(props){
    return(
        <AdornmentInput
            autoComplete="email"
            {...props}
            startAdornment={
                <Tooltip title="Email" placement="top">
                    <EmailIcon />
                </Tooltip>
            }
            type='email'
        />
    )
}
