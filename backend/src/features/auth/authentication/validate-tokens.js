import validateRequest from '../shared/utils/validate-request.js'
import { cookie } from 'express-validator'

export default function validateTokens(customOptions=undefined){
  const options = ({
    access_token: true,
    refresh_token: true
  });
  
  if(customOptions)
    Object.assign(options, customOptions);
  
  const validators = [];
  
  if(options.access_token)
    validators.push(validateAccessToken);
  if(options.refresh_token)
    validators.push(validateRefreshToken);
  
  return validateRequest(validators);
}

const validateAccessToken = 
cookie('access_token')
  .optional()
  .isString().trim().notEmpty()
  .withMessage('Access token must be non-empty string')
  .bail();

const validateRefreshToken =
cookie('refresh_token')
  .optional()
  .isString().trim().notEmpty()
  .withMessage('Refresh token must be non-empty string')
  .bail();