import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'hooks/useTranslation';

export default function Loading({ color }) {
  const { t } = useTranslation();
  return (
    <>
      <span
        className={`spinner-border spinner-border-sm text-${color}`}
        role="status"
        aria-hidden="true"
      />
      <span className="sr-only">{t('LOADING')}...</span>
    </>
  );
}

Loading.propTypes = {
  color: PropTypes.oneOf(['light', 'primary']),
};

Loading.defaultProps = {
  color: 'light',
};
