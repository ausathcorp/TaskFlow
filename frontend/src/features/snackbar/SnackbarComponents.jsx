import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const ENTER_TRANSITION = 500;
const EXIT_TRANSITION = 200;

const OUTLINED = 'outlined';
const INHERIT = 'inherit';
const CENTER = 'center';
const DOWN = 'down';
const UP = 'up';
const TOP = 'top';

export function AppSnackbar({
    opened,
    snackbarOptions: { message, duration, origin, severity, variant, action, callback },
    handleClose,
    handleExited,
    createCallbackHandler }){
    const actionButton = (
        !action ? 
        <IconButton onClick={createCallbackHandler(callback)} color={INHERIT}><CloseIcon /></IconButton> :
        <Button onClick={createCallbackHandler(callback)}
            variant={OUTLINED}
            color={INHERIT}>
            {action}
        </Button>
    );
    return(
        <Snackbar
            open={opened}
            onClose={handleClose}
            autoHideDuration={duration}
            transitionDuration={{
                enter: ENTER_TRANSITION, 
                exit: EXIT_TRANSITION}}
            anchorOrigin={{horizontal: CENTER, vertical: origin}}
            slots={{transition: Slide}}
            slotProps={{transition: {
                onExited: handleExited,
                direction: origin === TOP ? DOWN : UP}}}
            sx={{
                '& .MuiAlert-root': {
                    borderRadius: 2,
                    border: 0.5,
                    borderColor: 'divider',
                    boxShadow: 2,
                    '& .MuiAlert-message': { fontSize: 14, fontWeight: 500, alignItems: 'center' },
                    '& .MuiAlert-action': { alignItems: 'center' }
                }
            }}>
            <Alert
                open={opened}
                onClose={handleClose}
                severity={severity}
                variant={variant}
                action={actionButton}>
                {message}
            </Alert>
        </Snackbar>
    )
}