declare module '../aws-exports' {
    const awsmobile: {
      Auth: {
        region: string
        userPoolId: string
        userPoolWebClientId: string
        identityPoolId: string
        mandatorySignIn: boolean
      }
      oauth: object
      aws_cognito_username_attributes: string[]
      aws_cognito_social_providers: string[]
      aws_cognito_signup_attributes: string[]
      aws_cognito_mfa_configuration: string
      aws_cognito_mfa_types: string[]
      aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: number
        passwordPolicyCharacters: string[]
      }
      aws_cognito_verification_mechanisms: string[]
    }
    export default awsmobile
  }
  