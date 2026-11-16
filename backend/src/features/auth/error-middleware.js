export default function authRouteErrorHandler(err, req, res, next){
    if(err.name !== 'AuthError')
        return next(err);
        
    const statusCode = err.statusCode;
    const message = err.message;
    return res.status(statusCode).json({
        success: false,
        message
    });
}