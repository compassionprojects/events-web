import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function Meta({ title, description, image_url }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image_url} />
      <meta property="og:url" content="https://vic.peacefactory.fr" />
      <meta name="twitter:card" content={image_url} />

      {/* Hotjar Tracking Code for https://vic.peacefactory.fr */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1922767,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
        }}
      />
    </Head>
  );
}

export default Meta;

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
};
