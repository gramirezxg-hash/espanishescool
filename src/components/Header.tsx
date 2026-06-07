import React from 'react';
import { ActiveTab } from '../types';
import { BookOpen, User, Sun, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  studentName?: string;
  logo?: {
    text: string;
    subtitle: string;
    letter: string;
    bgColor: string;
    textColor: string;
  };
}

export default function Header({
  activeTab,
  setActiveTab,
  isLoggedIn,
  setIsLoggedIn,
  studentName = 'Estudiante',
  logo = {
    text: "Espanishescool",
    subtitle: "Academia",
    letter: "E",
    bgColor: "#226D7A",
    textColor: "#FFFFFF"
  }
}: HeaderProps) {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'courses', label: 'Cursos' },
    { id: 'tutors', label: 'Tutores' },
    { id: 'pricing', label: 'Precios' },
    { id: 'culture', label: 'Cultura' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left cursor-pointer transition-transform active:scale-95"
          id="header-logo-btn"
        >
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
            style={{ backgroundColor: logo.bgColor, color: logo.textColor }}
          >
            <span className="font-sans text-xl font-extrabold tracking-tight">{logo.letter}</span>
          </div>
          <div>
            <span className="font-sans text-xl font-black tracking-tight" style={{ color: logo.bgColor }}>
              {logo.text}
            </span>
            <span className="block text-[10px] font-mono leading-none tracking-widest text-[#a73918] uppercase">
              {logo.subtitle}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 font-sans text-sm font-medium transition-all rounded-lg duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#226D7A] bg-[#226D7A]/5 font-semibold'
                    : 'text-gray-600 hover:text-[#226D7A] hover:bg-gray-50'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#226D7A]" />
                )}
              </button>
            );
          })}
          {isLoggedIn && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 font-sans text-sm font-medium transition-all rounded-lg cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-[#a73918] bg-[#a73918]/5 font-semibold'
                  : 'text-gray-600 hover:text-[#a73918] hover:bg-gray-50'
              }`}
              id="nav-dashboard"
            >
              Mi Panel
            </button>
          )}
        </nav>

        {/* Login & Booking CTA Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-1.5 font-sans text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                id="header-user-panel"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a73918] text-white text-xs font-bold font-sans">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{studentName}</span>
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                title="Cerrar sesión"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                id="header-logout-btn"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="flex items-center gap-1.5 px-4 py-2 font-sans text-sm font-semibold text-gray-600 hover:text-[#226D7A] rounded-lg transition-colors cursor-pointer"
              id="header-login-btn"
            >
              <User className="h-4 w-4" />
              Ingresar
            </button>
          )}

          <button
            onClick={() => {
              if (isLoggedIn) {
                setActiveTab('tutors');
              } else {
                setActiveTab('pricing');
              }
            }}
            className="rounded-xl bg-[#a73918] px-5 py-2.5 font-sans text-sm font-bold text-white shadow-md shadow-[#a73918]/20 transition-all hover:-translate-y-0.5 hover:bg-[#862201] active:translate-y-0 cursor-pointer"
            id="header-cta-btn"
          >
            Agendar Clase
          </button>
        </div>
      </div>
    </header>
  );
}
