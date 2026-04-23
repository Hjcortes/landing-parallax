import { Parallax } from "react-scroll-parallax";
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Countdown from './components/Countdown/Countdown';
import Features from './components/Features/Features';
import VideoSection from './components/VideoSection/VideoSection';
import NewsLetter from './components/NewsLetter/NewsLetter';
import Sponsors from "./components/Sponsors/Sponsors";
import "./styles.css";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpg";
import bg3 from "./img/bg3.jpg";
import bg4 from "./img/bg4.jpg";
import bg5 from "./img/bg5.jpg";

// Registrar el plugin fuera del componente
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Creative studio launches",
    text: "A minimal parallax landing experience with crisp image motion and content blocks that float into view.",
    image: bg1,
  },
  {
    title: "Smooth scroll interactions",
    text: "Use vertical motion and soft horizontal offsets to create depth without losing readability.",
    image: bg2,
  },
  {
    title: "Modern layout styling",
    text: "Alternate the image and text positions in each section for a polished, magazine-style flow.",
    image: bg3,
  },
  {
    title: "Bold visual storytelling",
    text: "Keep each section focused, with large headings and layered panels that feel dynamic while staying easy to read.",
    image: bg4,
  },
  {
    title: "High-impact design",
    text: "A refined parallax effect can make a simple landing page feel premium and motion-rich.",
    image: bg5,
  },
];

export default function Main() {
  // 1. Estado para detectar el ancho de pantalla en tiempo real
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1024;

  // 2. Animación de párrafos con GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".parrafo", {
        y: isMobile ? 20 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".parrafo",
          start: "top 95%",
        }
      });
    });

    return () => ctx.revert(); // Limpieza automática de GSAP
  }, [isMobile]); // Se reinicia si cambia el tamaño de pantalla

  const Hero = () => {
  const heroRef = React.useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el título y el subtítulo
      gsap.from(".hero-title span", {
        y: 100,
        skewY: 7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f0f12]">
      {/* Imagen de fondo con Parallax sutil */}
      <Parallax translateY={[-20, 20]} className="absolute inset-0 z-0">
        <div 
          className="w-full h-[120%] bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${bg1})` }} // Puedes usar bg1 o una imagen especial
        />
      </Parallax>

      {/* Contenido del Hero */}
      <div className="relative z-10 text-center px-6">
        <h1 className="hero-title text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          <div className="overflow-hidden inline-block"><span>Explora</span></div><br/>
          <div className="overflow-hidden inline-block"><span>Lo Inesperado</span></div>
        </h1>
        <p className="hero-sub mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
          Una experiencia inmersiva a través de paisajes digitales y movimiento fluido.
        </p>
        
        {/* Botón Call to Action */}
        <div className="hero-sub mt-10">
          <button className="button-cta px-8 py-4 bg-white text-black rounded-full font-bold uppercase text-sm tracking-widest hover:bg-indigo-600 hover:text-white transition-colors duration-300">
            Comenzar Viaje
          </button>
        </div>

        <div className="w-full mx-auto my-8 h-40 min-h-[120px]">
          <Countdown targetDate="2026-11-15T23:59:59" />
        </div>
      </div>

      {/* Indicador de Scroll (Mouse animado) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50">
        <div className="w-[2px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
};

  return (
    <div className="parallax-container">
      <Hero />
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <section key={index} className={!isEven ? "reverse" : ""}>
            <div className="wrapper">  
              <div className="section-heading">
                <Parallax 
                  translateX={isMobile 
                    ? [0, 0] 
                    : (isEven ? ['80%', '-40%'] : ['-80%', '40%'])
                  }
                  translateY={isMobile 
                    ? [60, -60] 
                    : [0, 0]
                  }
                  opacity={[0, 1, 1, 0]}
                  className="parallax-title"
                >
                  <h2>{section.title}</h2>
                </Parallax>
              </div>
              
              <div className="container">
                <Parallax translateY={[-20, 20]} scale={[0.9, 1.1]}>
                  <div className="imgBx">
                    <img src={section.image} alt={section.title} />
                  </div>
                </Parallax>

                <Parallax translateY={[80, -80]}>
                  <div className="content">
                    {/* Clase "parrafo" para GSAP y "text-white" para el color */}
                    <p className="parrafo text-white">{section.text}</p>
                  </div>
                </Parallax>
              </div>

            </div>
          </section>
        );
      })}
      <Features />
      <VideoSection />
      <NewsLetter />
      <Sponsors />
    </div>
  );
}