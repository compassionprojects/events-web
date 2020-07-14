import React from 'react';

export default function SkipLinks() {
  const skipCls = 'sr-only sr-only-focusable';
  return (
    <>
      <a className={skipCls} href="#about">
        Skip to about
      </a>
      <a className={skipCls} href="#course">
        Skip to course
      </a>
      <a className={skipCls} href="#language">
        Skip to course language
      </a>
      <a className={skipCls} href="#what-to-expect">
        Skip to what to expect from the course
      </a>
      <a className={skipCls} href="#what-you-need">
        Skip to what you need to attend the course
      </a>
      <a className={skipCls} href="#course-content">
        Skip to course content
      </a>
      <a className={skipCls} href="#fee">
        Skip to participation fee
      </a>
      <a className={skipCls} href="#trainers">
        Skip to trainers
      </a>
      <a className={skipCls} href="#faq">
        Skip to frequently asked questions
      </a>
    </>
  );
}
