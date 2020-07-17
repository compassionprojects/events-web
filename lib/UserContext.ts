import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  authenticating: false,
  error: null,
  signOut: function () {
    return null;
  },
});
