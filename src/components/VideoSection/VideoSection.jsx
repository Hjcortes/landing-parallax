import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from "../../img/bg1.jpg";
import img2 from "../../img/bg3.jpg";
import img3 from "../../img/bg4.jpg";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación de las tarjetas
      gsap.from(".floating-card", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // 2. Control de Rendimiento: Pausar/Reproducir video al entrar/salir
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom", // Cuando el video entra por abajo
        end: "bottom top",    // Cuando el video sale por arriba
        onEnter: () => playVideo(),
        onEnterBack: () => playVideo(),
        onLeave: () => pauseVideo(),
        onLeaveBack: () => pauseVideo(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Funciones para controlar el iframe de YouTube
  const playVideo = () => {
    iframeRef.current?.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  };

  const pauseVideo = () => {
    iframeRef.current?.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          ref={iframeRef}
          className="w-[100vw] h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/n1ZplRnevmg?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=n1ZplRnevmg&controls=0&showinfo=0&rel=0&modestbranding=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contenedor principal de las 3 imágenes */}
        <div className="relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {[img1, img2, img3].map((img, index) => (
            <div 
                key={index} 
                className="floating-card w-full md:w-[300px] h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#16161a]/40 backdrop-blur-md"
            >
                <img 
                src={img} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
                alt={`Galería ${index + 1}`} 
                />
            </div>
            ))}
        </div>
        </div>
    </section>
  );
};

export default VideoSection;