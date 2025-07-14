'use client'

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <div>
      <h1>Bienvenue, {user?.username}</h1>
      <button onClick={signOut}>Se déconnecter</button>
    </div>
  )
}

export default withAuthenticator(Home)
