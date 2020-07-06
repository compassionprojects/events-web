import React from 'react';
import Footer from './Footer';
import Header from './Header';
import GlobalStyles from './GlobalStyles';

export default function Layout(props) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main role="main">
        <div {...props} />
      </main>
      <Footer />
    </>
  );
}
