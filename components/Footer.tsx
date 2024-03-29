import React from 'react';
import styled from 'styled-components';
import Link from './Link';
import data from 'data/landing';
import useTranslation from 'hooks/useTranslation';

const year = new Date().getFullYear();

export default function Footer() {
  const { t, locale } = useTranslation();
  return (
    <footer className="footer mt-auto border-top bg-light">
      <div className="pt-5">
        <div className="container mt-4">
          <div className="row justify-content-between">
            <ul className="my-3 list-inline col-md-6 col-sm-12 order-1 order-sm-1 order-md-0">
              <li className="mr-2 list-inline-item">
                <Link href="/[lang]/about" as={`/${locale}/about`}>
                  {t('ABOUT_US')}
                </Link>
              </li>
              <li className="mx-2 list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  {t('COMMUNITY')}
                </a>
              </li>
              <li className="mx-2 list-inline-item">
                <a href={`mailto:${data.contact_email}`}>{t('CONTACT')}</a>
              </li>
              <li className="mx-2 list-inline-item">
                <Link href="/[lang]/terms" as={`/${locale}/terms`}>
                  {t('TERMS')}
                </Link>
              </li>
            </ul>

            <ul className="my-3 list-inline col-md-4 col-sm-12 order-2 ml-auto">
              <li className="list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  <IconSocial
                    alt="Follow us on Facebook"
                    src="/images/icon-facebook.svg"
                    height={30}
                    width={30}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  <IconSocial
                    alt="Follow us on Instagram"
                    src="/images/icon-instagram.svg"
                    height={30}
                    width={30}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  <IconSocial
                    alt="Follow us on Youtube"
                    src="/images/icon-youtube.svg"
                    height={30}
                    width={30}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  <IconSocial
                    alt="Follow us on Linkedin"
                    src="/images/icon-linkedin.svg"
                    height={30}
                    width={30}
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer">
                  <IconSocial
                    alt="Visit our website"
                    src="/images/icon-website.svg"
                    height={30}
                    width={30}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pb-4 small text-muted">
        <div className="container"><Copyleft>&copy;</Copyleft> {year} compassion projects</div>
      </div>
      <div className="container pb-4 mb-5">
        Have questions about the platform?{' '}
        <a href="mailto:madhu@nomaddev.co">contact Madhu</a>
      </div>
    </footer>
  );
}

const IconSocial = styled.img`
  filter: grayscale(100%);
  opacity: 0.8;
`;

const Copyleft = styled.span`
  display:inline-block;
  transform: rotate(180deg);
`;
