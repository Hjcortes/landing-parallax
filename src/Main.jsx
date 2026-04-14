import { Parallax } from "react-scroll-parallax";
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  return (
    <div className="parallax-container">
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
    </div>
  );
}