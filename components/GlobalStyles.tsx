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
    font-weight: 500;
    &:hover {
      text-decoration: none;
      border-bottom-width: 1px;
    }
  }
  strong {
    padding: .2em;
    background-color: #fcf8e3;
    font-weight: 500;
  }
  p.lead {
    color: #e0e0e0;
  }
`;
