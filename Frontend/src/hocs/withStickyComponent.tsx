import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StickyHeader = ({ children }: { children: React.ReactNode }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerElement = headerRef.current;

    gsap.fromTo(
      headerElement,
      { position: "relative", top: "0px" },
      {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "0 4px 2px -2px gray",
        zIndex: 1000,
        scrollTrigger: {
          trigger: headerElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      },
    );
  }, []);

  return (
    <div ref={headerRef} className="w-full bg-gray-100 p-4">
      {children}
    </div>
  );
};

export default StickyHeader;
