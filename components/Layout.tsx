import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header />
      <main role="main">
        <div className="container">
          <div {...props} />
        </div>
      </main>
      <Footer />
    </>
  );
}
