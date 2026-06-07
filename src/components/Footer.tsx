import React from 'react';
import { ActiveTab } from '../types';
import { Mail, Shield, Award, Heart, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  visible: boolean;
}

interface FooterProps {
  onNavigation: (tab: ActiveTab) => void;
  logo?: {
    text: string;
    subtitle: string;
    letter: string;
    bgColor: string;
    textColor: string;
  };
  socialLinks?: SocialLink[];
}

export default function Footer({ 
  onNavigation,
  logo = {
    text: "Espanishescool",
    subtitle: "Academia",
    letter: "E",
    bgColor: "#226D7A",
    textColor: "#FFFFFF"
  },
  socialLinks = []
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111c1d] text-white/80 py-12 px-6 border-t border-white/5 text-left" id="footer-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/5">
          
          {/* Logo Brand Frame */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="flex h-9 w-9 items-center justify-center rounded-lg font-sans font-black text-sm"
                style={{ backgroundColor: logo.bgColor, color: logo.textColor }}
              >
                {logo.letter}
              </div>
              <span className="font-sans text-lg font-black text-white tracking-tight">{logo.text}</span>
            </div>
            <p className="font-sans text-xs text-white/50 leading-relaxed max-w-sm mb-4">
              La academia líder de inmersión personalizada en español de México. Conectamos alumnos de todo el mundo con educadores nativos calificados desde la comodidad de sus hogares.
            </p>
            {socialLinks && socialLinks.filter(l => l.visible && l.url).length > 0 && (
              <div className="flex items-center gap-3.5 mb-5">
                {socialLinks.filter(l => l.visible && l.url).map((link, idx) => {
                  let Icon = MessageCircle;
                  const name = link.name.toLowerCase();
                  if (name.includes('facebook')) Icon = Facebook;
                  else if (name.includes('instagram')) Icon = Instagram;
                  else if (name.includes('twitter') || name.includes('x.com')) Icon = Twitter;
                  else if (name.includes('youtube')) Icon = Youtube;
                  else if (name.includes('whatsapp')) Icon = MessageCircle;
                  
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                      title={link.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
            <p className="font-mono text-[9px] text-[#B0E0E9] font-bold uppercase tracking-widest flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              CONEXIÓN SEGURA SSL 256-BIT
            </p>
          </div>

          {/* Quick Menu Selection Links */}
          <div className="md:col-span-3">
            <h4 className="font-sans text-xs font-black text-white uppercase tracking-wider mb-3">Explorar</h4>
            <ul className="space-y-2 text-xs font-medium font-sans">
              <li>
                <button onClick={() => onNavigation('courses')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Programas de Estudio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigation('tutors')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Nuestros Tutores Nativos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigation('pricing')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Planes de Precios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigation('culture')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Diccionario de Jerga y Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Authentic Menu requests matching image bottom line */}
          <div className="md:col-span-4">
            <h4 className="font-sans text-xs font-black text-white uppercase tracking-wider mb-3">Enlaces Oficiales</h4>
            <ul className="space-y-2 text-xs font-medium font-sans">
              <li>
                <button onClick={() => onNavigation('dashboard')} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F2A68D]" />
                  Unirse como Tutor (Become a Tutor)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigation('culture')} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B0E0E9]" />
                  Blog Cultural (Cultural Blog)
                </button>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-white transition-colors">
                  Ayuda e Información
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright line strictly matching the requested layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/45 font-sans font-medium">
          <div>
            &copy; {currentYear} Espanishescool Academy. CDMX & Guadalajara, México. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => alert("Términos de Servicio (Terms of Service) - Simulado")} className="hover:text-white cursor-pointer select-all">
              Terms of Service
            </button>
            <span>&bull;</span>
            <button onClick={() => alert("Políticas de Privacidad (Privacy Policy) - Simulado")} className="hover:text-white cursor-pointer select-all">
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
