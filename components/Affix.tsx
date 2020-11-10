//gist.github.com/julianocomg/296469e414db1202fc86#gistcomment-3050760
import React, { useRef } from 'react';

export default function Affix(props: {
  top: number;
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const element = useRef(null);
  const oldStyles = {
    position: '',
    top: 0,
    width: '',
  };
  // Offset could make the element fixed ealier or later
  const { offset = 0 } = props;

  const checkPosition = (distanceToBody: number, width: number) => {
    const scrollTop = window.scrollY;

    if (
      distanceToBody - scrollTop < props.top + offset &&
      window.innerWidth > 767
    ) {
      if (element.current.style.position != 'fixed') {
        for (const key in oldStyles) {
          oldStyles[key] = element.current.style[key];
        }
        element.current.style.position = 'fixed';
        element.current.style.width = width + 'px';
        element.current.style.top = props.top + 'px';
      }
    } else {
      // reset to default
      for (const key in oldStyles) {
        element.current.style[key] = oldStyles[key];
      }
    }
  };

  React.useEffect(() => {
    if (typeof window.scrollY === 'undefined') {
      // don't work in IE
      return;
    }

    const distanceToBody =
      window.scrollY + element.current.getBoundingClientRect().top;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        checkPosition(distanceToBody, element.current.clientWidth);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div ref={element} style={{ zIndex: 1 }} className={props.className}>
      {props.children}
    </div>
  );
}
