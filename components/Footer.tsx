import React from 'react';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-5 border-top">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Course
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              FAQ&apos;s
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Speakers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
