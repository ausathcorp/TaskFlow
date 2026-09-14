import { AppSnackbar } from './SnackbarComponents'
import { SnackbarContext } from './SnackbarContexts'
import { useState, useRef, useMemo } from 'react'

const MAX_EXCLUSIVE_QUEUE = 3;
const DURATION_RATE_DIVIDER = 32;
const ENABLE_DURATION_OPTIMIZER = false;

const SEVERITY = 'info';
const VARIANT = 'standard';
const ORIGIN = 'top';
const DURATION = 3000;

const RUNNING = 'running';
const IDLE = 'idle';

const STRING = 'string';
const FUNCTION = 'function';

export function SnackbarProvider({
    children, 
    severity = SEVERITY,
    variant = VARIANT,
    origin = ORIGIN,
    duration = DURATION,
    enableDurationOptimizer = ENABLE_DURATION_OPTIMIZER }){
    const defaultOptions = useMemo(() => ({
        message: '',
        severity, variant, origin, duration,
        action: null,
        callback: null
    }), [severity, variant, origin, duration]);
    const status = useRef(IDLE);
    const snackbarQueue = useRef([]);
    const [currentOptions, setCurrentOptions] = useState(defaultOptions);
    const [opened, setOpened] = useState(false);
    
    function addSnackbar(options, severity=SEVERITY){
        if(typeof options == STRING)
            options = {...defaultOptions, severity, message: options}
        if(status.current === IDLE){
            status.current = RUNNING;
            openSnackbar(options);
            return;
        }
        snackbarQueue.current.push(options)
        return;
    }
    function openSnackbar(options){
        let duration = getDuration(options.duration || defaultOptions.duration);
        setCurrentOptions({...defaultOptions, ...options, duration});
        setOpened(true);
        return;
    }
    
    function closeSnackbar(){
        setOpened(false);
    }
    
    function getDuration(currentDuration){
        var queueLength = snackbarQueue.current.length;
        if(!enableDurationOptimizer || (queueLength <= MAX_EXCLUSIVE_QUEUE))
            return currentDuration;
        var inclusiveQueueLength = queueLength - MAX_EXCLUSIVE_QUEUE;
        var subractedDuration = ((currentDuration / DURATION_RATE_DIVIDER) * inclusiveQueueLength);
        return (currentDuration - subractedDuration)
    }
    
    const createCallbackHandler = (callback) => () => {
        if(typeof callback === FUNCTION)
            callback();
        closeSnackbar();
    }
    
    function handleSnackbarExited(){
        if(snackbarQueue.current.length <= 0){
            status.current = IDLE;
            setCurrentOptions({...defaultOptions});
            return;
        }
        var nextOptions = snackbarQueue.current.shift();
        openSnackbar(nextOptions);
        return;
    }
    
    return (
        <SnackbarContext.Provider value={addSnackbar}>
            {children}
            <AppSnackbar
                opened={opened}
                snackbarOptions={currentOptions}
                handleClose={closeSnackbar}
                handleExited={handleSnackbarExited}
                createCallbackHandler={createCallbackHandler}
            />
        </SnackbarContext.Provider>
    )
}