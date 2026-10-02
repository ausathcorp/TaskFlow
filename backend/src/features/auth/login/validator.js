import validateRequest from '../shared/utils/validate-request.js'
import { body } from 'express-validator'

export const loginValidator = validateRequest([
    body('email')
        .exists()
        .withMessage('Email is required').bail()
        .isString()
        .withMessage('Email must be a string').bail()
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty').bail()
        .isEmail()
        .withMessage('Invalid email format').bail()
        .normalizeEmail(),

        
    body('password')
        .exists()
        .withMessage('Password is required').bail()
        .isString()
        .withMessage('Password must be a string').bail()
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty').bail()
        .isLength({min: 8, max: 32})
        .withMessage('Password must be between 8 and 32 characters')
    ,
    body('rememberMe')
        .optional()
        .isBoolean()
        .withMessage('rememberMe must be a boolean (true / false)')
])