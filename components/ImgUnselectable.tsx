import styled from 'styled-components';

// Preventing an image from being draggable or selectable without using JS
// https://stackoverflow.com/a/12906840/232619
const ImgUnselectable = styled.img`
  pointer-events: none;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export default ImgUnselectable;
