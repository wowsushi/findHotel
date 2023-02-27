import { User } from '../../users/user.entity'

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      currentUser?: User
    }
  }
}
