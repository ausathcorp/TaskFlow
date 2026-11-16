import AdornmentInput from './AdornmentInput'
import Tooltip from '@mui/material/Tooltip'
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneOutlined'

export default function ContactField(props){
    return (
        <AdornmentInput
            autoComplete="tel"
            {...props}
            startAdornment={
                <Tooltip title="Contact" placement="top">
                    <LocalPhoneIcon />
                </Tooltip>
            }
            type="tel"
        />
    )
}