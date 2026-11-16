import { param, body } from 'express-validator'
import validateRequest from '../shared/utils/validate-request.js'

export default validateRequest([
  param('token')
    .exists()
    .withMessage('Token is required')
    .bail()
    .isString().trim().notEmpty()
    .withMessage('Token must be a non-empty string')
    .bail(),
  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString().trim().notEmpty()
    .withMessage('Password must be a non-empty string')
    .bail()
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must be between 8 and 32 characters long')
    .bail()
    .matches(/^[\w\W]+$/)
    .withMessage('Password must contains atleast one capital and small letters, one number and one special symbol')
    .bail(),
  body('confirm_password')
    .exists()
    .withMessage('Confirm password is required')
    .bail()
    .custom((value, { req }) => {
      if(value !== req.body?.password)
        throw new Error('Password not matches');
      return true;
    })
])