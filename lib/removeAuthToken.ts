import { serialize } from 'cookie';

const TOKEN_NAME = 'token';

export default function removeAuthToken() {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });
  document.cookie = cookie;
}
