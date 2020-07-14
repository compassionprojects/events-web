import React from 'react';

export default function Loading() {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm text-light"
        role="status"
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </>
  );
}
