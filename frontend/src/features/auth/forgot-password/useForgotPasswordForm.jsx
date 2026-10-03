import { useForgotPasswordMutation } from '../shared/services/api'
import { useForm } from 'react-hook-form'
import { useSnackbar } from '@/features/snackbar'

const defaultValues = { email: '' }

export default function useForgotPasswordForm(){
    const showSnackbar = useSnackbar();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ defaultValues });
    const email = watch('email');
    
    const onSubmit = async(data) => {
        try {
            let { success, message } = await forgotPassword(data).unwrap();
            if(success){
                showSnackbar({
                    message,
                    severity: 'success',
                    variant: 'filled'
                })
            }
        }
        catch (err) {
            if(!err.status || typeof err.status !== 'number'){
                return showSnackbar({
                    message: 'Network error, please again',
                    severity: 'error',
                    variant: 'filled'
                })
            }
            return showSnackbar({
                message: err.data?.message,
                severity: 'error',
                variant: 'filled'
            })
        }
    }
    
    return {
        isLoading,
        handleSubmit,
        errors,
        register,
        email,
        onSubmit
    }
}