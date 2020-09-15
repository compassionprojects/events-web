import React from 'react';
import scrollTo from 'scroll-to-element';
import Icon from './Icon';
import Link from './Link';
import data from '../data';
import { o } from './Header';

const year = new Date().getFullYear();

export default function FooterLanding() {
  return (
    <footer className="footer mt-auto py-5 border-top bg-light">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link
              href="/#"
              as="/#"
              className="nav-link text-muted"
              onClick={() => scrollTo('#top', o)}>
              <Icon shape="arrow-up" className="p-1" />
              Back to top
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-accent"
              href="/#about"
              as="/#about"
              onClick={() => scrollTo('#about', o)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-accent"
              href="/#course"
              as="/#course"
              onClick={() => scrollTo('#course', o)}>
              Course
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-accent"
              href="/#trainers"
              as="/#trainers"
              onClick={() => scrollTo('#trainers', o)}>
              Trainers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-accent"
              href="/#faq"
              as="/#faq"
              onClick={() => scrollTo('#faq', o)}>
              FAQ&apos;s
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-accent"
              href={`mailto:${data.contact_email}`}>
              Contact
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/terms" as="/terms">
              Terms
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-accent"
              href={data.facebook_event_url}
              target="_blank"
              rel="noreferrer">
              <Icon shape="facebook" height={18} width={18} />
              Facebook
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

export function Footer() {
  return (
    <footer className="footer mt-auto py-5 border-top bg-light">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/#about" as="/#about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-accent"
              href="/#course"
              as="/#course">
              Course
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/#faq" as="/#faq">
              FAQ&apos;s
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-accent"
              href={`mailto:${data.contact_email}`}>
              Help
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/terms" as="/terms">
              Terms
            </Link>
          </li>
        </ul>
      </div>
      <div className="py-4 mt-3 small text-muted text-center">
        &copy; {year} peacefactory.fr
      </div>
    </footer>
  );
}
