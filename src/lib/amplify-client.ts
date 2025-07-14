// src/lib/amplify-config.ts
import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'

Amplify.configure(awsExports)
