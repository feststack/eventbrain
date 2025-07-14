import { Amplify } from 'aws-amplify'
import awsExportsRaw from '../../aws-exports'

const awsExports = {
  Auth: {
    region: awsExportsRaw.aws_cognito_region,
    userPoolId: awsExportsRaw.aws_user_pools_id,
    userPoolWebClientId: awsExportsRaw.aws_user_pools_web_client_id,
    identityPoolId: awsExportsRaw.aws_cognito_identity_pool_id,
    mandatorySignIn: true,
  },
  oauth: awsExportsRaw.oauth || {},
}

Amplify.configure(awsExports as any)
