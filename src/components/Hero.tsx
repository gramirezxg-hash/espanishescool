import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  onBookClick: () => void;
  onProgramsClick: () => void;
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
}

export default function Hero({ 
  onBookClick, 
  onProgramsClick,
  hero = {
    title: "Aprende el español que realmente se habla en México",
    subtitle: "Domina el español con tutores nativos de México. Clases online 1-a-1 diseñadas para tu ritmo, nivel y objetivos específicos de viaje, negocios o conversación diaria.",
    ctaText: "Agendar Clase de Prueba"
  }
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f9f9fa] to-white py-16 lg:py-24" id="hero-section">
      
      {/* Background traditional geometric cultural design details */}
      <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none hidden xl:block">
        <svg width="240" height="245" viewBox="0 0 240 245" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H40V40H0V0ZM80 0H120V40H80V0ZM160 0H200V40H160V0ZM0 80H40V120H0V80ZM80 80H120V120H80V80ZM160 80H200V120H160V80ZM0 160H40V200H0V160ZM80 160H120V200H80V160ZM160 160H200V200H160V160Z" fill="#164A53" />
        </svg>
      </div>
 
      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-12 lg:gap-12 items-center">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Custom Tag/Chip */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#B0E0E9]/30 px-4 py-1.5 text-[#164A53] font-sans text-xs font-bold leading-none tracking-wide uppercase mb-6 shadow-sm border border-[#B0E0E9]/40" id="hero-tag">
            <Sparkles className="h-3 w-3 text-[#a73918]" />
            Aprendizaje 100% Personalizado
          </div>
 
          {/* Title & Accent */}
          <h1 className="font-sans text-4xl lg:text-5xl font-black text-[#1a1c1d] tracking-tight leading-[1.2] mb-6">
            {hero.title}
          </h1>
 
          {/* Subtext description */}
          <p className="font-sans text-base text-gray-650 max-w-xl leading-relaxed mb-8">
            {hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="group flex items-center justify-center gap-2 rounded-xl bg-[#a73918] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#a73918]/25 transition-all hover:-translate-y-0.5 hover:bg-[#862201] active:translate-y-0 cursor-pointer"
              id="hero-book-btn"
            >
              <Calendar className="h-5 w-5 transition-transform group-hover:rotate-6" />
              {hero.ctaText}
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </button>

            <button
              onClick={onProgramsClick}
              className="flex items-center justify-center rounded-xl border-2 border-[#226D7A]/80 bg-white px-8 py-4 font-sans text-base font-bold text-[#226D7A] shadow-sm transition-all hover:bg-[#226D7A]/5 hover:border-[#226D7A] active:scale-98 cursor-pointer"
              id="hero-programs-btn"
            >
              Ver Programas
            </button>
          </div>

          {/* Core Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-sans font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#226D7A] fill-[#226D7A]/10" />
              Tutores 100% nativos calificados
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#226D7A] fill-[#226D7A]/10" />
              Clase demo sin compromisos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#226D7A] fill-[#226D7A]/10" />
              Material de estudio incluido
            </span>
          </div>

        </div>

        {/* Right Side Creative Illustration Container (matching visual design) */}
        <div className="lg:col-span-5 mt-12 lg:mt-0 relative" id="hero-image-container">
          
          {/* Aesthetic Background Terracotta Frame Offset */}
          <div className="absolute inset-0 bg-[#a73918]/10 rounded-3xl translate-x-3 translate-y-3 blur-sm" />
          
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#fe7952] to-[#a73918] p-4 lg:p-6 shadow-xl border border-white/20">
            
            {/* Playful Mexican desert scene vector sketch details */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl flex items-center gap-2 text-white">
              <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.161 5.1a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06Zm11.678 0a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59a.75.75 0 0 1 1.06 0ZM3 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm15 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25A.75.75 0 0 1 18 12Zm-8.59 5.339a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06Zm5.18 1.59a.75.75 0 0 1 0-1.06l1.59-1.59a.75.75 0 1 1 1.06 1.06l-1.59 1.59a.75.75 0 0 1-1.06 0ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#ffdca6] leading-none">Clima Escolar</p>
                <p className="text-xs font-bold leading-tight">Clases Cálidas</p>
              </div>
            </div>

            {/* Laptop graphic with Mexican student illustration */}
            <div className="relative aspect-square w-full rounded-2xl bg-[#ffdca6]/30 overflow-hidden border border-white/10 flex items-center justify-center">
              
              {/* Cute Cacti Vectors embedded */}
              <div className="absolute bottom-0 left-0 w-24 h-36 opacity-90 text-emerald-800 flex flex-col justify-end p-2 select-none pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-md">
                  <path d="M45,20 C45,10 55,10 55,20 L55,90 L45,90 Z" />
                  <path d="M55,40 C55,40 70,35 70,45 L70,55 C70,60 55,55 55,55" />
                  <path d="M45,50 C45,50 30,45 30,55 L30,65 C30,70 45,65 45,65" />
                </svg>
              </div>

              <div className="absolute right-0 bottom-4 w-28 h-40 opacity-80 text-emerald-700 flex flex-col justify-end p-2 select-none pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-md">
                  <path d="M48,25 C48,15 52,15 52,25 L52,95 L48,95 Z" />
                  <path d="M52,48 C52,48 65,45 65,52 L65,60 C65,65 52,60 52,60" />
                </svg>
              </div>

              {/* Main Illustration Image */}
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600"
                alt="Spanish Student"
                referrerPolicy="no-referrer"
                className="w-[85%] h-[85%] object-cover rounded-2xl shadow-lg border-4 border-white transition-transform hover:scale-[1.02] duration-300"
              />
            </div>

            {/* Floating Info Pill "Metodología Activa - Inmersión desde el primer día" */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3.5 shadow-md border border-gray-100" id="hero-methodology-pill">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#226D7A]/10 text-[#226D7A]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-sans text-xs font-bold text-[#164A53]">Metodología Activa</p>
                  <p className="font-sans text-[11px] text-gray-500">Inmersión desde el primer día</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ¡En Vivo!
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
