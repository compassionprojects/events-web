import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function Meta({ title, description, image_url }) {
  const ogUrl =
    process.env.VIC_API_HOST || process.env.NEXT_PUBLIC_VIC_API_HOST;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image_url} />
      <meta property="og:url" content={ogUrl} />
      <meta name="twitter:card" content={image_url} />
    </Head>
  );
}

export default Meta;

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
};
