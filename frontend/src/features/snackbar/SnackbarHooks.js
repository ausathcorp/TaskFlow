import { useContext } from 'react'

import { SnackbarContext } from './SnackbarContexts'

export const useSnackbar = () => {
    var context = useContext(SnackbarContext);
    if(!context)
        throw new Error('useSnackbar must be called within snackbar provider');
    return context;
}