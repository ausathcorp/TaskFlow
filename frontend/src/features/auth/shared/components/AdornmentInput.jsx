import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export default function AdornmentInput({
    startAdornment,
    endAdornment,
    sx=[],
    ...props}){
    return (
        <TextField
            fullWidth
            sx={[
                {
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 1000px transparent inset',
                        WebkitTextFillColor: 'inherit',
                        transition: 'background-color 9999s ease-in-out 0s',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
            slotProps={{
                input: {
                    startAdornment: (startAdornment &&
                        <InputAdornment 
                            position="start">
                            {startAdornment}
                        </InputAdornment>
                    ),
                    endAdornment: (endAdornment &&
                         <InputAdornment
                            position="end">
                            {endAdornment}
                        </InputAdornment>
                    )
                }
            }}
            {...props}
        />
    )
}