import validateRequest from '../shared/utils/validate-request.js'
import { body } from 'express-validator'

export default validateRequest([
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
        .normalizeEmail()
]);