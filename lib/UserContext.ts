import { createContext } from 'react';
import logout from './logout';

export const UserContext = createContext({
  user: null,
  authenticating: false,
  error: null,
  signOut: logout,
});
