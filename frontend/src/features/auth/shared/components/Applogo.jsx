import brandLogo from '@/public/images/brand_logo.png'
import Box from '@mui/material/Box'

export default function AppLogo(){
    return(
        <Box
            component="img"
            src={brandLogo}
            alt="TaskFlow Brand Logo"
            sx={{width: 1, height: 'auto'}}
        />
    )
}