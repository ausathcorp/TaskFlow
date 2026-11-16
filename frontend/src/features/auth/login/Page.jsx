import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoginIcon from '@mui/icons-material/Login'

import { useNavigate, Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import useLoginForm from './useLoginForm'

import EmailField from '../shared/components/EmailField'
import PasswordField from '../shared/components/PasswordField'

export default function LoginPage(){
    const {
        isLoading,
        control,
        handleSubmit,
        onSubmit,
        register,
        errors
    } = useLoginForm();
    
    return(
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3
            }}>
            <Stack spacing={2}>
            
                <Typography 
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 500,
                        fontFamily: 'roboto, sans-serif'
                    }}>
                    Welcome back!
                </Typography>
                
                <EmailField 
                    label="Email ID"
                    {...register('email', {
                        required: "Email is required", 
                        pattern: {
                            value: /^[^\s@]+[@][^\s@]+[.][^\s@]+$/, 
                            message: 'Invalid email format'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                
                <PasswordField 
                    label="Password"
                    autoComplete="current-password"
                    {...register('password', {
                        required: "Password is required",
                    })}
                    error={!!errors.password} 
                    helperText={errors.password?.message}
                />
                
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            label="Remember me"
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={event => field.onChange(event.target.checked)}
                                />
                            }
                        />
                    )}
                />
                
                <Stack 
                    direction="row"
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <MuiLink
                        component={Link}
                        to='/forgot-password'>
                        Forgot password
                    </MuiLink>
                    <Button
                        loading={isLoading}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                        color="primary"
                        endIcon={<LoginIcon />}>
                        Sign in
                    </Button>
                </Stack>
                
                <Typography 
                    variant="subtitle2" 
                    sx={{textAlign: 'center', lineHeight: 2}}>
                    Don't have an account? <br />
                    <MuiLink
                        component={Link}
                        to='/register'>
                        Create one
                    </MuiLink>
                </Typography>
                
            </Stack>
        </Paper>
    )
}