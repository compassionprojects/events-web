import React from 'react';
import scrollTo from 'scroll-to-element';
import Icon from './Icon';
import data from '../data';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-5 border-top">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a
              href="/#"
              className="nav-link text-muted"
              onClick={() => scrollTo('#header')}>
              <Icon shape="arrow-up" className="p-1" />
              Back to top
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#about"
              onClick={() => scrollTo('#about')}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#course"
              onClick={() => scrollTo('#course')}>
              Course
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#faq"
              onClick={() => scrollTo('#faq')}>
              FAQ&apos;s
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#trainers"
              onClick={() => scrollTo('#trainers')}>
              Trainers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`mailto:${data.contact_email}`}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
