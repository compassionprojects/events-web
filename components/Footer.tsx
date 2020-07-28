import React from 'react';
import scrollTo from 'scroll-to-element';
import Icon from './Icon';
import data from '../data';
import { o } from './Header';

export default function FooterLanding() {
  return (
    <footer className="footer mt-auto py-5 border-top">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a
              href="/#"
              className="nav-link text-muted"
              onClick={() => scrollTo('#top', o)}>
              <Icon shape="arrow-up" className="p-1" />
              Back to top
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#about"
              onClick={() => scrollTo('#about', o)}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#course"
              onClick={() => scrollTo('#course', o)}>
              Course
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#trainers"
              onClick={() => scrollTo('#trainers', o)}>
              Trainers
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/#faq"
              onClick={() => scrollTo('#faq', o)}>
              FAQ&apos;s
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

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-5 border-top bg-light">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link" href="/#about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#course">
              Course
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#faq">
              FAQ&apos;s
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`mailto:${data.contact_email}`}>
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="py-4 mt-3 small text-muted text-center">
        &copy; {year} peacefactory.fr
      </div>
    </footer>
  );
}
