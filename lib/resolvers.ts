import removeAuthToken from './removeAuthToken';

export const initialState = {
  user: {
    __typename: 'User',
  },
};

export default {
  Query: {},
  Mutation: {
    async signOut() {
      removeAuthToken();
      return true;
    },
  },
};
