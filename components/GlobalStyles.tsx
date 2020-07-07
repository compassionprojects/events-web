import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  blockquote {
    padding-left: 1rem;
    border-left: 6px solid #eee;
  }
  p a {
    text-decoration: none;
    border-bottom: 3px solid #34F6F2;
    padding-bottom: 2px;
    &:hover {
      text-decoration: none;
      border-bottom-width: 1px;
    }
  }
`;
