import validateTokens from './validate-tokens.js'
import verifyTokens from './verify-tokens.js'
import issueAccessToken from './issue-access-token.js'
import revokeRefreshToken from './revoke-refresh-token.js'
import attachUserData from './attach-user-data.js'

export default function authenticate(customOptions=undefined){
  let options = ({
    useSliding: true,
    validate: {
      access_token: true,
      refresh_token: true
    }
  });
  if(customOptions) Object.assign(options, customOptions);

  return [
    ...validateTokens(options.validate),
    verifyTokens(),
    revokeRefreshToken( options.useSliding ),
    issueAccessToken(),
    attachUserData()
  ]
};