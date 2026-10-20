import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Activity } from "react";

let fullPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
let smallPattern = /(?=.*[a-z])/;
let capitalPattern = /(?=.*[A-Z])/;
let numberPattern = /(?=.*[0-9])/;
let symbolPattern = /(?=.*[\W_])/;
let passwordLength = /^.{8,}$/;

export default function PasswordHelper({ password, isFocused }) {
  const handleOpen = (password) => {
    if (!password) return false;
    return !fullPattern.test(password);
  };
  return (
    <Activity mode={isFocused ? "visible" : "hidden"}>
      <Box
        sx={{
          p: 1,
          border: 1,
          borderRadius: 5,
          borderColor: "divider",
        }}
      >
        <HelperCheckBox matched={smallPattern.test(password)} label="contains atleast one small letter" />
        <HelperCheckBox matched={capitalPattern.test(password)} label="contain atleast one capital letter" />
        <HelperCheckBox matched={numberPattern.test(password)} label="contain atleast one number character" />
        <HelperCheckBox matched={symbolPattern.test(password)} label="contain atleast one special character" />
        <HelperCheckBox matched={passwordLength.test(password)} label="contain atleast 8 or more characters" />
        <PasswordStrength {...{password}} />
      </Box>
    </Activity>
  );
}

function HelperCheckBox({ matched, label }) {
  return (
    <>
      <Checkbox
        sx={{p: 0.2}}
        size="small"
        indeterminate
        color={matched ? "success" : "primary"}
      />
      <Typography variant="caption">{label}</Typography>
      <br />
    </>
  );
}

function PasswordStrength({ password }){
  let isNormalPassword = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password);
  let isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/.test(password);
  let isVeryStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/.test(password);
  return(
    <Stack 
      direction="row" 
      sx={{alignItems: 'center'}}>
      <Typography variant='subtitle1'>Password strength: {' '}</Typography>
      <Typography
        variant='subtitle2'
        color={
          isVeryStrongPassword ? 'success' :
          isStrongPassword ? 'secondary' : 
          isNormalPassword ? 'primary' : 'error'
        }>
          {
            isVeryStrongPassword ? 'Very Strong' : 
            isStrongPassword ? 'Strong' : 
            isNormalPassword ? 'Normal' : 'Weak'
          }
      </Typography>
    </Stack>
  )
}