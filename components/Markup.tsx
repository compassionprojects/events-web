import React from 'react';
import PropTypes from 'prop-types';

// It's nicer to avoid writing `dangerouslySetInnerHTML` all the time
// when you want to display markup content.
// <Markup>{content}</Markup> is much nicer

function Markup({ children, ...rest }) {
  const html = children;
  return React.createElement('div', {
    ...rest,
    dangerouslySetInnerHTML: { __html: html },
  });
}

Markup.propTypes = {
  children: PropTypes.node,
};

export default Markup;
