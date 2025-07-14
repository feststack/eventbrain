'use client'

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../aws-exports'
import { Amplify } from 'aws-amplify'

Amplify.configure(awsExports)

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <div>
      <h1>Bienvenue, {user?.username}</h1>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}

const AuthenticatedHome = withAuthenticator(Home)
export default AuthenticatedHome
