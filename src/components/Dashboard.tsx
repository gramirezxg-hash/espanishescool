import React, { useState } from 'react';
import { BookedLesson, Tutor, Testimonial } from '../types';
import { Flame, Calendar, Award, BookOpen, Clock, Trash2, Code2, AlertCircle, RefreshCw, Star, ArrowRight } from 'lucide-react';
import PlacementTest from './PlacementTest';

interface DashboardProps {
  studentName: string;
  setStudentName: (name: string) => void;
  studentEmail: string;
  setStudentEmail: (email: string) => void;
  bookedLessons: BookedLesson[];
  onCancelLesson: (id: string) => void;
  credits: number;
  onGrantCredits: (amt: number) => void;
  placementTestLevel: string;
  setPlacementTestLevel: (lvl: string) => void;
}

export default function Dashboard({
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail,
  bookedLessons,
  onCancelLesson,
  credits,
  onGrantCredits,
  placementTestLevel,
  setPlacementTestLevel,
}: DashboardProps) {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [inputName, setInputName] = useState(studentName);
  const [inputEmail, setInputEmail] = useState(studentEmail);

  const handleTestComplete = (level: string, score: number) => {
    setPlacementTestLevel(level);
    setShowDiagnostic(false);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentName(inputName);
    setStudentEmail(inputEmail);
    setIsEditingProfile(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="student-dashboard">
      
      {/* Upper Welcome Banner Row */}
      <div className="bg-gradient-to-r from-[#226D7A] to-[#164A53] rounded-3xl p-6 lg:p-8 text-white mb-10 shadow-lg relative overflow-hidden text-left" id="dashboard-banner">
        
        {/* Background Cactus Logo graphic overlay */}
        <div className="absolute right-6 bottom-0 w-32 h-32 opacity-10 select-none pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M45,20 C45,10 55,10 55,20 L55,90 L45,90 Z" />
            <path d="M55,40 C55,40 70,35 70,45 L70,55 C70,60 55,55 55,55" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#fe7952] text-white px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <Flame className="h-3 w-3 fill-white" />
                DÍA 5 DE RACHA DE ESTUDIO
              </span>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileSave} className="flex flex-wrap items-center gap-3 mt-2">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-base font-bold text-white focus:outline-none focus:bg-white/20 max-w-[180px]"
                />
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white focus:outline-none focus:bg-white/20 max-w-[200px]"
                />
                <button
                  type="submit"
                  className="bg-[#a73918] hover:bg-[#862201] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Guardar
                </button>
              </form>
            ) : (
              <div>
                <h2 className="font-sans text-3xl font-black">{studentName}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 mt-1.5">
                  <span className="font-medium">{studentEmail}</span>
                  <span>&bull;</span>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-[#B0E0E9] hover:underline hover:text-white transition-all font-bold cursor-pointer"
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <div className="text-left font-sans">
              <p className="text-[10px] text-white/75 font-mono tracking-wider leading-none uppercase">Créditos de Clases</p>
              <p className="text-2xl font-black mt-1 leading-none">{credits} disponibles</p>
            </div>
            <button
              onClick={() => onGrantCredits(2)}
              className="px-3.5 py-2 bg-white text-[#164A53] hover:bg-[#B0E0E9] rounded-xl text-xs font-black tracking-wide uppercase transition-all shadow-sm cursor-pointer"
              title="Añadir créditos de práctica gratis"
            >
              + Recarga Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side (Schedules), Right Side (Activities and Test Option) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 columns): Schedule Classes */}
        <div className="lg:col-span-8 space-y-8 text-left">
          
          {/* Diagnostic Placement Test Inline Drawer */}
          {showDiagnostic ? (
            <div className="border border-[#226D7A] rounded-3xl overflow-hidden shadow-md">
              <div className="bg-[#226D7A] p-4 text-white flex justify-between items-center">
                <span className="font-sans text-sm font-bold flex items-center gap-1.5">
                  <Award className="h-4 w-4" /> Exam de Colocación Activo
                </span>
                <button
                  onClick={() => setShowDiagnostic(false)}
                  className="text-xs font-bold bg-white/15 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar Prueba
                </button>
              </div>
              <PlacementTest onTestComplete={handleTestComplete} />
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#B0E0E9]/30 text-[#164A53]">
                  <Award className="h-6 w-6 text-[#a73918]" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-black text-gray-900 leading-tight">Clasificación CEFR Sugerida</h3>
                  <p className="font-sans text-xs text-gray-500 mt-1">
                    {placementTestLevel === 'Sin clasificar. ¡Toma el examen de colocación hoy!' ? (
                      <span>No has medido tu nivel actual con respecto al español mexicano de calles y negocios.</span>
                    ) : (
                      <span>Tu nivel actual está registrado como: <strong className="text-[#a73918]">{placementTestLevel}</strong>.</span>
                    )}
                  </p>
                </div>

              </div>
              <button
                onClick={() => setShowDiagnostic(true)}
                className="bg-[#226D7A] hover:bg-[#164A53] text-white px-5 py-2.5 rounded-xl font-sans text-xs font-black tracking-wide uppercase shadow-sm transition-all whitespace-nowrap cursor-pointer hover:-translate-y-0.5"
                id="dashboard-quiz-btn"
              >
                {placementTestLevel === 'Sin clasificar. ¡Toma el examen de colocación hoy!' ? 'Hacer Test Gratis' : 'Repetir Test de Nivel'}
              </button>
            </div>
          )}

          {/* Booked Sessions Header */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-sans text-lg font-black text-gray-900 leading-none">Tus Próximas Clases</h3>
                <p className="text-[10px] text-gray-400 font-mono tracking-wider font-bold mt-1.5 uppercase">Sesiones programadas 1-a-1</p>
              </div>
              <span className="font-sans text-xs text-[#226D7A] bg-[#226D7A]/10 border border-[#226D7A]/20 px-3 py-1 rounded-full font-bold">
                {bookedLessons.length} Clases Activas
              </span>
            </div>

            {bookedLessons.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <Calendar className="h-10 w-10 text-gray-300 mb-3" />
                <p className="font-sans text-sm font-bold text-gray-400">No tienes clases agendadas en este momento</p>
                <p className="font-sans text-xs text-gray-400 max-w-xs mt-1">Explora nuestra lista de tutores nativos de México y agenda tu clase de prueba con tu crédito disponible.</p>
                <a
                  href="#features-section"
                  className="mt-5 rounded-xl bg-[#a73918] hover:bg-[#862201] text-white px-5 py-2.5 font-sans text-xs font-bold shadow-md cursor-pointer"
                >
                  Explorar Tutores Nativos
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {bookedLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-150 relative overflow-hidden transition-all hover:bg-gray-100/75"
                    id={`booked-slot-${lesson.id}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#226D7A] text-white font-sans font-bold text-sm">
                        {lesson.tutorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-sans text-sm font-black text-gray-900">Sesión con {lesson.tutorName}</h4>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            lesson.lessonType === 'Trial' ? 'bg-[#fe7952] text-white' : 'bg-[#226D7A] text-white'
                          }`}>
                            Clase de {lesson.lessonType === 'Trial' ? 'Prueba' : 'Regular'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1 font-sans font-medium">
                            <Calendar className="h-3.5 w-3.5 text-[#a73918]" />
                            {lesson.day}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="h-3.5 w-3.5 text-[#226D7A]" />
                            {lesson.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onCancelLesson(lesson.id)}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold"
                        title="Cancelar o reprogramar clase"
                        id={`cancel-class-${lesson.id}`}
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                        <span className="sm:hidden">Cancelar</span>
                      </button>
                      <button
                        onClick={() => {
                          alert(`¡Conexión iniciada! Enlazándote a la sala privada de videoconferencia con ${lesson.tutorName}.`);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-extrabold rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        Entrar Aula
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (4 columns): Stats and resources widgets */}
        <div className="lg:col-span-4 space-y-8 text-left">
          
          {/* Custom learning track progress widget exact structure */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-sans text-base font-black text-gray-900 leading-none mb-2">Avance de Aprendizaje</h3>
            <p className="text-[9px] text-gray-400 font-mono tracking-wider font-bold uppercase mb-4">Semana 1: Completado al 40%</p>
            
            {/* Custom learning indicator progress bars exactly as detailed in shapes & components block */}
            <div className="space-y-4 font-sans text-xs font-medium text-gray-650 font-medium">
              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>Módulo: Vocabulario de la Taquería</span>
                  <span className="font-bold text-[#a73918]">80%</span>
                </div>
                <div className="h-2 w-full bg-[#B0E0E9]/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a73918] rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>Gramática: Uso de "Ser" vs "Estar"</span>
                  <span className="font-bold text-[#a73918]">20%</span>
                </div>
                <div className="h-2 w-full bg-[#B0E0E9]/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a73918] rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>Comprensión: Saludos e Interacciones CDMX</span>
                  <span className="font-bold text-gray-450">En Espera</span>
                </div>
                <div className="h-2 w-full bg-[#B0E0E9]/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Download Material drawer */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-sans text-base font-black text-gray-900 leading-none mb-1.5">Material de Estudio</h3>
            <p className="text-[9px] text-gray-400 font-mono tracking-wider font-bold mb-4 uppercase">Descargas Ilimitadas PDF</p>
            
            <div className="space-y-2.5 text-xs font-semibold text-gray-700">
              <button
                onClick={() => alert("Abriendo Guía Vocabulario del Taco en PDF de Espanishescool")}
                className="w-full flex items-center justify-between p-3 bg-[#B0E0E9]/10 hover:bg-[#B0E0E9]/20 border border-[#B0E0E9]/30 rounded-xl text-left transition-all cursor-pointer"
              >
                <span>📖 Guía del Taco y Clima mexicano.pdf</span>
                <span className="text-[#a73918] text-[10px] uppercase font-mono">Descargar</span>
              </button>
              <button
                onClick={() => alert("Abriendo Esquemas Conjugación Subjuntivos en PDF")}
                className="w-full flex items-center justify-between p-3 bg-[#B0E0E9]/10 hover:bg-[#B0E0E9]/20 border border-[#B0E0E9]/30 rounded-xl text-left transition-all cursor-pointer"
              >
                <span>📘 Conjugación de Subjuntivos.pdf</span>
                <span className="text-[#a73918] text-[10px] uppercase font-mono">Descargar</span>
              </button>
              <button
                onClick={() => alert("Abriendo Mapas Coordenadas de Metro CDMX para Estudiantes")}
                className="w-full flex items-center justify-between p-3 bg-[#B0E0E9]/10 hover:bg-[#B0E0E9]/20 border border-[#B0E0E9]/30 rounded-xl text-left transition-all cursor-pointer"
              >
                <span>🗺️ Mapa Turístico Conversacional de la CDMX.pdf</span>
                <span className="text-[#a73918] text-[10px] uppercase font-mono">Descargar</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
