import React from 'react';
import scrollTo from 'scroll-to-element';
import Icon from './Icon';
import Link from './Link';
import data from '../data/landing';
import { o } from './Header';
import Subscribe from './Subscribe';

const year = new Date().getFullYear();

export default function FooterLanding() {
  return (
    <>
      <footer className="footer mt-auto py-5 border-top bg-light">
        <div className="container mt-4">
          <div className="row">
            <ul className="my-3 list-unstyled col-md-3 col-sm-12">
              <li className="my-2">
                <Link href="/about" as="/about">
                  About us
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/#about"
                  as="/#about"
                  onClick={() => scrollTo('#about', o)}>
                  Course
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/#trainers"
                  as="/#trainers"
                  onClick={() => scrollTo('#trainers', o)}>
                  Trainers
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/#faq"
                  as="/#faq"
                  onClick={() => scrollTo('#faq', o)}>
                  FAQ&apos;s
                </Link>
              </li>
              <li className="my-2">
                <a href={`mailto:${data.contact_email}`}>Contact</a>
              </li>
              <li className="my-2">
                <Link href="/terms" as="/terms">
                  Terms
                </Link>
              </li>
            </ul>

            <ul className="my-3 list-unstyled col-md-3 col-sm-12">
              <li className="my-1">
                <a
                  href="https://www.facebook.com/Peace-Factory-563809806979098/"
                  target="_blank"
                  rel="noreferrer">
                  <Icon shape="facebook" className="py-1" /> Facebook
                </a>
              </li>
              <li className="my-1">
                <a
                  href="https://www.linkedin.com/company/peace-factory/"
                  target="_blank"
                  rel="noreferrer">
                  <Icon shape="linkedin" className="py-1" /> Linked In
                </a>
              </li>
            </ul>

            <div className="my-3 col-md-6 col-sm-12">
              <h5 className="font-weight-bold">Subscribe to our newsletter</h5>
              <p>
                There will be up to 6 newsletters per year, with many
                interesting articles and tips.
              </p>
              <Subscribe id="7315a21229" />
            </div>
          </div>
        </div>
        <div className="py-4 my-5 small text-muted text-center">
          &copy; {year} peacefactory.fr
        </div>
      </footer>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer mt-auto py-5 border-top bg-light">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/about" as="/about">
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-accent" href="/#about" as="/#about">
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
      <div className="py-4 text-center d-flex align-items-center justify-content-center">
        <a
          href="https://www.facebook.com/Peace-Factory-563809806979098/"
          target="_blank"
          rel="noreferrer">
          <Icon shape="facebook" className="py-1" /> Facebook
        </a>
        <a
          href="https://www.linkedin.com/company/peace-factory/"
          target="_blank"
          className="pl-5"
          rel="noreferrer">
          <Icon shape="linkedin" className="py-1" /> Linked In
        </a>
      </div>
      <div className="py-4 mt-3 small text-muted text-center">
        &copy; {year} peacefactory.fr
      </div>
    </footer>
  );
}
