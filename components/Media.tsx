// these sizes are arbitrary and you can set them to whatever you wish
import { css } from 'styled-components';

export const sizes = {
  giant: 1440,
  large: 1200,
  desktop: 992,
  tablet: 768,
  phone: 576,
  mini: 365,
};

export const responsiveCarousel = {
  giant: {
    breakpoint: { max: sizes.giant * 10, min: sizes.large + 1 },
    items: 5,
  },
  large: {
    breakpoint: { max: sizes.large, min: sizes.desktop + 1 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: sizes.desktop, min: sizes.tablet + 1 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: sizes.tablet, min: sizes.phone + 1 },
    items: 2,
  },
  phone: {
    breakpoint: { max: sizes.phone, min: 0 },
    items: 1,
  },
  mini: {
    breakpoint: { max: sizes.mini, min: 0 },
    items: 1,
  },
};

// iterate through the sizes and create a media template
const media = (minmax) =>
  Object.keys(sizes).reduce((accumulator, label) => {
    // use rem in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args) => css`
    @media (${minmax}-width: ${emSize}rem) {
      ${css(...args)};
    }
  `;
    return accumulator;
  }, {});

export default {
  up: media('min'),
  down: media('max'),
};
