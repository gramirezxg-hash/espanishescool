import React, { useState } from 'react';
import { Lock, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      setIsLoading(false);

      if (res.ok && data.success) {
        onLoginSuccess();
        setPassword('');
      } else {
        setErrorMsg(data.message || 'Contraseña incorrecta.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Error de conexión con el backend.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm text-left">
      
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a73918] text-white shadow-sm font-sans font-black text-xl">
            A
          </div>
        </div>
        <h3 className="font-sans text-xl font-black text-gray-900 leading-none">Acceso Administrativo</h3>
        <p className="text-[9px] text-[#a73918] font-mono tracking-widest font-bold uppercase mt-1.5">Espanishescool Settings</p>
      </div>

      {/* Warning info message */}
      <p className="font-sans text-xs text-gray-500 mb-5 leading-normal bg-gray-50 border border-gray-100 p-3.5 rounded-xl">
        ⚠️ Este es un panel restringido exclusivamente para el propietario del sitio. Para modificar el logo, las redes sociales, los cursos y tutores, ingresa la clave de administrador.
      </p>

      {/* Error display */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl mb-4 text-xs font-sans">
          <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1.5">Contraseña de Administrador</label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-gray-400">
              <Lock className="h-4.5 w-4.5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Ingresa la clave..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-250 bg-white pl-10 pr-10 py-3 text-gray-800 font-bold focus:outline-none focus:border-[#226D7A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-650 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#226D7A] hover:bg-[#164A53] text-white py-3.5 font-sans font-black uppercase tracking-wider shadow-md disabled:opacity-60 transition-all cursor-pointer mt-6"
        >
          {isLoading ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : null}
          {isLoading ? 'Verificando...' : 'Acceder al Panel de Control'}
        </button>
      </form>

      <div className="mt-6 text-center text-[10px] text-gray-400 font-sans italic">
        Nota: La contraseña por defecto de fábrica configurada es <strong className="text-gray-600 font-mono">admin123</strong>.
      </div>

    </div>
  );
}
