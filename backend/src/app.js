import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import CookieParser from 'cookie-parser'
import morgan from 'morgan'
import { authRouter, googleRouter } from './features/routers.js'

const app = express();

app.use(cors({
    origin: [
    'http://localhost:3000',
    'http://localhost:4173'
    ], 
    credentials: true}));
    
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(CookieParser());

//Auth Api Routes
app.use('/api/auth', authRouter);
app.use('/api/google', googleRouter);


//global app error handler
app.use((err, req, res, next) => {
    console.log('App Error: \n', err);
    if(err.name === 'MongoServerSelectionError')
        return res.status(500).json({
            success: false,
            message: 'Server connection error! Try again later'
        })
        
    return res.status(500).json({
        success: false,
        message: 'Unexpected server error! Try again later'
    });
});

export default app;