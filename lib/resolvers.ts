import logout from './logout';

export const initialState = {
  user: {
    __typename: 'User',
  },
};

export default {
  Query: {},
  Mutation: {
    signOut() {
      logout();
    },
  },
};
