import { validationResult } from 'express-validator'

export default function validateRequest(validationChains){
    return [
        ...validationChains,
        (req, res, next) => {
            const errors = validationResult(req).formatWith( error => ({
                value: error.value,
                message: error.msg
            })).mapped();
            
            if(Object.keys(errors).length <= 0)
                return next();
            return res.status(400).json({
                success: false,
                message: 'Invalid request format',
                errors
            })
        }
    ]
}