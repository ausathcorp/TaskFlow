import Typography from "@mui/material/Typography";
import { useAppContext } from '@/shared/hooks/useAppContext'

export default function HeaderTitle(){
  const { headerTitle } = useAppContext();
  return(
    <Typography 
      sx={{
        flexGrow: { xs: 1, sm: 2 },
        fontSize: { xs: 14, sm: 18 },
        fontWeight: 600,
        fontFamily: 'serif, roboto, sans-serif'
      }}>
      {headerTitle}
    </Typography>
  )
};
