import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bg2 from "../../img/bg2.jpg"; 
import bg4 from "../../img/bg4.jpg";
import bg5 from "../../img/bg5.jpg";

// Registrar el plugin UNA SOLA VEZ
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const featuresList = [
    { 
      id: "01", 
      t: "Estrategia Digital", 
      d: "Planificación profunda para marcas que buscan impacto real.",
      img: bg2 
    },
    { 
      id: "02", 
      t: "Desarrollo Elite", 
      d: "Experiencias web de alto rendimiento con animaciones fluidas.",
      img: bg4 
    },
    { 
      id: "03", 
      t: "Identidad Visual", 
      d: "Sistemas de diseño coherentes y modernos para la era digital.",
      img: bg5 
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#0f0f12] px-6 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Servicios <br /> Especializados
          </h2>
          <div className="w-20 h-1 bg-indigo-600"></div>
        </div>

        {/* Grid de 3 columnas - Portrait Style */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((f) => (
            <div 
              key={f.id} 
              className="feature-card group relative h-[600px] md:h-[750px] overflow-hidden rounded-3xl bg-[#16161a]"
            >
              {/* Imagen de fondo con Zoom */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={f.img} 
                  alt={f.t}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-90" />
              </div>

              {/* Contenido */}
              <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                <span className="text-indigo-500 font-bold text-sm tracking-[0.3em] mb-4 block">
                  {f.id} / CAPACIDAD
                </span>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                  {f.t}
                </h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500">
                  {f.d}
                </p>
                
                <div className="mt-6 overflow-hidden">
                   <span className="text-white text-xs font-bold uppercase tracking-widest translate-y-10 group-hover:translate-y-0 transition-transform duration-500 inline-block border-b border-white pb-1">
                     Saber más
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;