import Stack from "@mui/material/Stack";
import { ThemeToggle } from '@/features/theme'

export default function HeaderControls(){
  return(
    <Stack
      direction="row"
      spacing={0}
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'start',
      }}>
      <ThemeToggle />
    </Stack>
  )
};
