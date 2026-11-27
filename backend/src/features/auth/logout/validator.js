import { body } from 'express-validator'
import validateRequest from '../shared/utils/validate-request.js'

export const logoutValidator = validateRequest([
  body('userId')
  .exists()
  .withMessage('User ID is required').bail()
  .isString()
  .trim()
  .notEmpty()
  .withMessage('User ID must be non-empty string').bail()
  .custom(( userId, { req }) => {
    if(userId !== req.user._id.toString())
      throw new Error('Ivalid user ID');
    return true;
  })
])