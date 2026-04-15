import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const StaggeredMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSub, setActiveSub] = useState(null); // Estado para el submenú abierto
  const textRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set('.menu-layer', { xPercent: 100 });
    gsap.set('.menu-link', { y: 50, opacity: 0 });
  }, []);

  const toggleMenu = () => {
  const tl = gsap.timeline();
  
  if (!isOpen) {
    // ABRIR
    setIsOpen(true);
    tl.to('.menu-layer', { xPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.inOut" })
      .to('.menu-link', { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
      .to(textRef.current, { yPercent: -50, duration: 0.4, ease: "power2.inOut" }, 0);
  } else {
    // CERRAR
    // Añadimos una clase temporal al nav para forzar el reset del underline
    const nav = document.querySelector('nav');
    nav?.classList.add('menu-closing');

    tl.to('.menu-link', { y: 20, opacity: 0, duration: 0.3, stagger: 0.05 })
      .to('.menu-layer', { xPercent: 100, duration: 0.6, stagger: 0.05, ease: "power4.inOut" }, "-=0.2")
      .to(textRef.current, { yPercent: 0, duration: 0.4, ease: "power2.inOut" }, 0)
      .add(() => {
        setIsOpen(false);
        setActiveSub(null);
        nav?.classList.remove('menu-closing');
      });
  }
};

  const navItems = [
    { name: 'Inicio', url: '#inicio' },
    { 
      name: 'Experiencias', 
      url: '#', 
      links: [
        { n: 'Nado con Delfines', h: '#nado' },
        { n: 'Esnórquel', h: '#esnorquel' },
        { n: 'Río Subterráneo', h: '#rio' }
      ] 
    },
    { name: 'Galería', url: '#galeria' },
    { name: 'Contacto', url: '#contacto' }
  ];

  return (
    <>
      {/* Botón (Mismo que ya tienes funcional) */}
      <button 
        onClick={toggleMenu}
        style={{ padding: '14px 32px', minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        className="fixed top-8 right-8 z-[200] bg-white text-black rounded-full shadow-2xl hover:scale-105 transition-transform font-bold overflow-hidden"
      >
        <div className="relative h-[20px] overflow-hidden leading-[20px] uppercase text-[11px] tracking-widest">
          <div ref={textRef}><span>Menu</span><br /><span>Close</span></div>
        </div>
        <div style={{ width: '20px' }} className="flex flex-col gap-1 flex-shrink-0">
          <span className={`h-[2px] w-full bg-black transition-all ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`h-[2px] w-full bg-black transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-full bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </div>
      </button>

      {/* Menú Desplegable */}
      <div className={`fixed inset-0 z-[150] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
  
  {/* Capa de color (Indigo) */}
  <div className="menu-layer absolute inset-0 bg-indigo-600 z-[1]" />
  
  {/* Capa de fondo oscuro - IMPORTANTE: Añadir flex-col y z-index al nav */}
  <div className="menu-layer absolute inset-0 bg-[#0f0f12] z-[2] flex items-center justify-center">
    
    {/* EL NAV: Le subimos el z-index para que esté sobre las capas de fondo */}
    <nav className="relative z-[10] flex flex-col gap-4 md:gap-6 text-center">
      {navItems.map((item, i) => (
        <div key={i} className="relative z-[20] overflow-hidden">
                <div className="menu-link-wrapper">
                  <a 
                    href={item.url}
                    onClick={(e) => {
                      if (item.links) {
                        e.preventDefault();
                        setActiveSub(activeSub === i ? null : i);
                      } else {
                        toggleMenu();
                      }
                    }}
                    className={`menu-link menu-link-xelha inline-block text-4xl md:text-6xl font-bold uppercase tracking-widest ${item.links ? 'has-submenu' : ''} ${activeSub === i ? 'submenu-active' : ''}`}
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {item.name}
                  </a>
                </div>

                {/* Submenú Animado (Si existe) */}
                {item.links && activeSub === i && (
                  <div className="submenu-animate flex flex-col gap-2 mt-4"> {/* <-- Añadimos submenu-animate */}
                    {item.links.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.h}
                        onClick={toggleMenu}
                        className="text-gray-400 hover:text-white uppercase text-sm md:text-lg tracking-widest transition-colors cursor-pointer block py-1"
                      >
                        {link.n}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default StaggeredMenu;