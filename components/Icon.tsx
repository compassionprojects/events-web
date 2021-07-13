import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Icon({ shape, ...props }) {
  return (
    <Feather {...props} focusable="false">
      <use xlinkHref={`/images/feather-sprite.svg#${shape}`} />
    </Feather>
  );
}

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.oneOf([
    'chevron-down',
    'chevron-up',
    'chevron-right',
    'arrow-up',
    'arrow-right',
    'x',
    'send',
    'external-link',
    'image',
    'video',
    'file-text',
    'trash-2',
    'facebook',
    'paperclip',
  ]),
};

const Feather = styled.svg`
  width: ${(props) => props.width || 25}px;
  height: ${(props) => props.height || 25}px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 5px;
`;
