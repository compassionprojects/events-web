import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  authenticating: false,
  signOut: function () {
    return null;
  },
});
