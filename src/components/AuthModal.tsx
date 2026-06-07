import React, { useState } from 'react';
import { X, Mail, Lock, User, RefreshCw, AlertCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const url = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login' ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      setIsLoading(false);
      if (data.success) {
        onAuthSuccess(data.user);
        onClose();
        // Reset fields
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setErrorMsg(data.message || 'Credenciales o datos inválidos');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Error de red. Asegúrate de que el servidor esté activo.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 md:p-8 animate-fadeIn text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Dynamic Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#226D7A] text-white shadow-sm font-sans font-black text-lg">
              E
            </div>
          </div>
          <h3 className="font-sans text-xl font-black text-gray-900 leading-none">Espanishescool</h3>
          <p className="text-[9px] text-[#a73918] font-mono tracking-widest font-black uppercase mt-1">Academia de Idiomas</p>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-gray-150 mb-6 font-sans text-xs uppercase tracking-wide font-black">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 pb-3 text-center transition-all cursor-pointer ${
              activeTab === 'login' ? 'text-[#226D7A] border-b-2 border-[#226D7A] font-extrabold' : 'text-gray-400'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMsg(null);
            }}
            className={`flex-1 pb-3 text-center transition-all cursor-pointer ${
              activeTab === 'register' ? 'text-[#226D7A] border-b-2 border-[#226D7A] font-extrabold' : 'text-gray-400'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error message card */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl mb-4 text-xs font-sans">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {activeTab === 'register' && (
            <div>
              <label className="block font-bold text-gray-750 mb-1">Nombre Completo</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <User className="h-4.5 w-4.5" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Ej. James Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-250 bg-white pl-10 pr-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-[#226D7A] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-gray-750 mb-1">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-gray-400">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                type="email"
                required
                placeholder="Ej. estudiante@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-250 bg-white pl-10 pr-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-[#226D7A] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-750 mb-1">Contraseña</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-gray-400">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                required
                placeholder="Escribe tu contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-250 bg-white pl-10 pr-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-[#226D7A] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#a73918] hover:bg-[#862201] text-white py-3.5 font-sans font-black uppercase tracking-wider shadow-md disabled:opacity-60 transition-all cursor-pointer mt-6"
          >
            {isLoading ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : null}
            {isLoading ? 'Verificando...' : activeTab === 'login' ? 'Acceder al Panel' : 'Crear Cuenta Estudiante'}
          </button>
        </form>

        <div className="mt-5 text-center text-[10px] text-gray-400 font-sans">
          {activeTab === 'login' ? (
            <p>¿No tienes cuenta? Haz clic en Registrarse arriba para obtener 10 créditos gratis.</p>
          ) : (
            <p>Al registrarte obtienes una cuenta estudiantil pre-cargada con 10 créditos demo.</p>
          )}
        </div>

      </div>
    </div>
  );
}
