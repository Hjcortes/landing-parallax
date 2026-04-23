import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

import logo1 from "../../img/img-logo01.png";
import logo2 from "../../img/img-logo02.png";
import logo3 from "../../img/img-logo03.png";
import logo4 from "../../img/img-logo04.png";
import logo5 from "../../img/img-logo05.png";
import logo6 from "../../img/img-logo06.png";

const Sponsors = () => {
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth;
    
    const ctx = gsap.context(() => {
      gsap.to(slider, {
        x: `-${totalWidth / 2}px`,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    }, slider);

    return () => ctx.revert();
  }, []);

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo1, logo2, logo3, logo4, logo5, logo6];

  return (
    <div className="w-full bg-[#0f0f12] border-t border-b border-white/5 overflow-hidden h-64 min-h-[96px] flex-none self-center relative">
        <div className="relative w-full h-full flex items-center overflow-hidden">
    
    {/* Contenedor del movimiento */}
    <div 
      ref={sliderRef} 
      className="flex whitespace-nowrap gap-20 items-center px-10"
      style={{ width: 'max-content' }}
    >
      {logos.map((logo, index) => (
  <div 
    key={index} 
    className="w-32 md:w-40 flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
  >
    <img 
      src={logo} 
      alt={`Sponsor ${index}`} 
      className="w-full h-auto max-h-32 object-contain" 
    />
  </div>
))}
    </div>

    {/* Gradientes laterales */}
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f0f12] to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f0f12] to-transparent z-10 pointer-events-none" />
  </div>
</div>
  );
};

export default Sponsors;