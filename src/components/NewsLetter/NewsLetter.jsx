import React from 'react';

const NewsLetter = () => {
  const countries = ["México", "España", "Estados Unidos", "Argentina", "Colombia", "Chile", "Otros"];

  return (
    // h-screen asegura que el footer tenga altura para centrar verticalmente
    // flex y items-center / justify-center hacen la magia del centrado
    <footer className="w-full min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center py-20 px-6 border-t border-white/5">
      
      {/* Este es el contenedor que mx-auto centra si flex no estuviera arriba */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        <div className="text-center mb-12 py-4">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">
            Mantente en el viaje
          </h2>
          <p className="text-gray-400 font-light mx-auto">
            Suscríbete para recibir actualizaciones exclusivas.
          </p>
        </div>

        {/* Formulario - Quitamos lógica compleja para asegurar que cargue */}
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Nombre</label>
            <input type="text" className="bg-[#16161a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500" placeholder="Nombre" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Apellido</label>
            <input type="text" className="bg-[#16161a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500" placeholder="Apellido" />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Email</label>
            <input type="email" className="bg-[#16161a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500" placeholder="tu@email.com" />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">País</label>
            <select className="bg-[#16161a] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 text-gray-400">
              <option value="">Selecciona tu país</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-[#16161a]" />
              <span className="text-xs text-gray-400">Acepto los términos y condiciones.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-[#16161a]" />
              <span className="text-xs text-gray-400">Deseo recibir correos comerciales.</span>
            </label>
          </div>

          <button className="md:col-span-2 w-full bg-white text-black font-bold py-5 rounded-full uppercase tracking-widest text-sm hover:bg-indigo-600 hover:text-white transition-all">
            Enviar Registro
          </button>

        </form>

        <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 tracking-[0.3em] uppercase">
          © 2026 Creative Studio • Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default NewsLetter;