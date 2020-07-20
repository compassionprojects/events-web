import React from 'react';
import PropTypes from 'prop-types';

export default function Loading({ color }) {
  return (
    <>
      <span
        className={`spinner-border spinner-border-sm text-${color}`}
        role="status"
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </>
  );
}

Loading.propTypes = {
  color: PropTypes.oneOf(['light', 'primary']),
};

Loading.defaultProps = {
  color: 'light',
};
