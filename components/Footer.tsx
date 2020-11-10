import React from 'react';
import scrollTo from 'scroll-to-element';
import Link from './Link';
import data from '../data/landing';
import { o } from './Header';
import Subscribe from './Subscribe';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer mt-auto py-5 border-top bg-light">
      <div className="container mt-4">
        <div className="row">
          <ul className="my-3 list-unstyled col-md-3 col-sm-12 order-sm-1 order-md-0">
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
              <Link href="/#faq" as="/#faq" onClick={() => scrollTo('#faq', o)}>
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

          <div className="my-3 col-md-6 col-lg-5 col-sm-12 pb-4 pb-md-0 order-sm-0 order-md-1">
            <h5 className="text-muted">Subscribe to our newsletter</h5>
            <p>Keep me updated on Peace Factory news.</p>
            <Subscribe id="7315a21229" />
          </div>

          <ul className="my-3 list-inline col-md-3 col-sm-12 ml-auto order-2">
            <li className="list-inline-item">
              <a
                href="https://www.facebook.com/Peace-Factory-563809806979098/"
                target="_blank"
                rel="noreferrer">
                <img
                  alt="Follow us on Facebook"
                  src="/images/icon-facebook.svg"
                  height={30}
                  width={30}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://www.instagram.com/p/CHFzXGpKV0C/"
                target="_blank"
                rel="noreferrer">
                <img
                  alt="Follow us on Instagram"
                  src="/images/icon-instagram.svg"
                  height={30}
                  width={30}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://www.youtube.com/channel/UCtBY3xN-CtE_-x3rnHgTg_Q"
                target="_blank"
                rel="noreferrer">
                <img
                  alt="Follow us on Youtube"
                  src="/images/icon-youtube.svg"
                  height={30}
                  width={30}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://www.linkedin.com/company/peace-factory/"
                target="_blank"
                rel="noreferrer">
                <img
                  alt="Follow us on Linkedin"
                  src="/images/icon-linkedin.svg"
                  height={30}
                  width={30}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-4 my-5 small text-muted text-center">
        &copy; {year} peacefactory.fr
      </div>
    </footer>
  );
}
