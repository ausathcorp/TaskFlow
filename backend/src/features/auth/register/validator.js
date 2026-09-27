import validateRequest from './utils/validate-request.js'
import { body } from 'express-validator'

const registerValidator = validateRequest([
    body('email')
        .exists()
        .withMessage('Email is required').bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email format'),

    body('username')
        .exists()
        .isString()
        .withMessage('Username must be string').bail()
        .trim()
        .notEmpty()
        .withMessage('Username is required').bail()
        .isString()
        .withMessage('Username must be alphanumeric').bail()
        .isLength({
            min: 6
        }).withMessage('Username must be at least 6 characters'),

    body('password')
        .exists()
        .withMessage('Password is required').bail()
        .matches(/^[\w\W]+$/)
        .withMessage('password must contains letters and numbers and must not contains white-spaces').bail()
        .isLength({
            min: 8,
            max: 32
        })
        .withMessage('Password must be 8 - 32 characters lenght').bail(),

    body('confirmPassword')
        .exists()
        .withMessage('Confirm Password is required').bail()
        .custom((value, { req }) => {
            if (value !== req.body?.password)
                throw new Error('Passwords not matches');
            return true;
        }),

    body('contact')
        .optional()
        .exists()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Contact must not be an empty string').bail()
        .isMobilePhone()
        .withMessage('Invalid contact format'),

    body('firstName')
        .exists()
        .isString()
        .withMessage('FirstName must be string').bail()
        .trim()
        .notEmpty()
        .withMessage('FirstName is required'),

    body('lastName')
        .exists()
        .isString()
        .withMessage('LastName must be string').bail()
        .trim()
        .notEmpty()
        .withMessage('LastName is required'),

    body('gender')
        .exists()
        .withMessage('Gender is required').bail()
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Gender must be a non-empty string').bail()
        .toLowerCase()
        .isIn(['male', 'female']).withMessage('Gender must be (male or female)'),

    body('isAgreed')
        .exists()
        .withMessage('Agreement is required').bail()
        .isBoolean()
        .withMessage('isAgreed must be boolean').bail()
        .custom(value => value === true)
        .withMessage('You must agree with our Terms of Services.'),
])

export default registerValidator;