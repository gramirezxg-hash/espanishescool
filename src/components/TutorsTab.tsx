import React, { useState } from 'react';
import { Tutor, TutorTimeSlot, BookedLesson } from '../types';
import { tutorsData } from '../data/tutors';
import { Award, Star, MapPin, Calendar, Clock, Smile, Sparkles, Volume2, Play, Info, CheckCircle2, Shield, X } from 'lucide-react';

interface TutorsTabProps {
  tutors: Tutor[];
  loggedIn: boolean;
  onBookLesson: (booked: BookedLesson) => void;
  credits: number;
}

export default function TutorsTab({ tutors, loggedIn, onBookLesson, credits }: TutorsTabProps) {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TutorTimeSlot | null>(null);
  
  // Schedular inputs
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [lessonType, setLessonType] = useState<'Trial' | 'Regular'>('Trial');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Focus filters
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('todos');

  // Trigger speech synthesis
  const [speakingTutorId, setSpeakingTutorId] = useState<string | null>(null);

  const speakTutorInvitation = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speakingTutorId === id) {
        setSpeakingTutorId(null);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 0.9;
      
      utterance.onend = () => setSpeakingTutorId(null);
      utterance.onerror = () => setSpeakingTutorId(null);

      setSpeakingTutorId(id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("La síntesis de voz no se encuentra disponible.");
    }
  };

  const handleSlotSelect = (tutor: Tutor, slot: TutorTimeSlot) => {
    if (!slot.isAvailable) return;
    setSelectedTutor(tutor);
    setSelectedSlot(slot);
    setLessonType(credits > 0 ? 'Regular' : 'Trial');
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutor || !selectedSlot || !studentName || !studentEmail) return;

    const newBooking: BookedLesson = {
      id: `booking-${Date.now()}`,
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      day: selectedSlot.day,
      time: selectedSlot.time,
      studentName,
      studentEmail,
      lessonType,
      createdAt: new Date().toISOString()
    };

    onBookLesson(newBooking);
    setIsSuccess(true);

    setTimeout(() => {
      // Clear scheduling selectors
      setSelectedTutor(null);
      setSelectedSlot(null);
      setStudentName('');
      setStudentEmail('');
      setShowBookingForm(false);
      setIsSuccess(false);
    }, 1800);
  };

  const allSpecialties = ['todos', 'Conversación', 'DELE', 'Negocios', 'Niños', 'Pronunciación'];

  const filteredTutors = tutors.filter((t) => {
    if (specialtyFilter === 'todos') return true;
    return t.specialties.some((s) => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="tutors-exploration-view">
      
      {/* Directory Titles */}
      <div className="text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#fe7952]/10 text-[#a73918] px-3 py-1 rounded-full">
            Maestros Nativos Certificados
          </span>
          <h2 className="font-sans text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-2">Conoce a tus Tutores</h2>
          <p className="font-sans text-sm text-gray-500 max-w-lg leading-relaxed">
            Nuestros tutores proceden de diferentes regiones de México, cada uno con formaciones universitarias de docencia lingüística y especialidades de conversación laboral, modismos del día a día o preparación de exámenes.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          {allSpecialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                specialtyFilter === spec
                  ? 'bg-[#226D7A] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {spec === 'todos' ? '🌐 Todos' : spec}
            </button>
          ))}
        </div>
      </div>

      {/* Tutors Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between text-left"
            id={`tutor-profile-card-${tutor.id}`}
          >
            
            {/* Top Row profile summary */}
            <div>
              <div className="flex items-start gap-4 mb-5 pb-4 border-b border-gray-50">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-[#B0E0E9]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans text-lg font-black text-gray-900 leading-none">{tutor.name}</h3>
                    <div className="flex items-center gap-0.5 text-xs text-yellow-500 font-bold bg-yellow-50/50 border border-yellow-100 rounded-lg px-2 py-0.5">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{tutor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#a73918]" />
                    <span>{tutor.origin}</span>
                    <span>&bull;</span>
                    <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-md">{tutor.experience}</span>
                  </div>

                  {/* Specialty tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tutor.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="bg-[#B0E0E9]/20 text-[#164A53] font-sans text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio & Fun facts */}
              <p className="font-sans text-xs text-gray-500 leading-relaxed mb-4">{tutor.bio}</p>
              
              <div className="bg-amber-50/50 border border-amber-100/60 rounded-xl p-3 mb-5 text-[11px] text-amber-900 leading-relaxed">
                👉 <strong>Pregunta Curiosa (Fun Fact):</strong> {tutor.funFact}
              </div>
            </div>

            {/* Time Slot Calendario Interactive Grid Row */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-bold">HORARIOS DISPONIBLES</span>
                <button
                  type="button"
                  onClick={() => speakTutorInvitation(tutor.id, tutor.voiceSampleText)}
                  className={`flex items-center gap-1 text-[11px] font-bold transition-all px-2.5 py-1 rounded-lg cursor-pointer ${
                    speakingTutorId === tutor.id
                      ? 'bg-[#a73918] text-white animate-pulse'
                      : 'text-[#164A53] bg-[#B0E0E9]/30 hover:bg-[#B0E0E9]/50'
                  }`}
                >
                  {speakingTutorId === tutor.id ? <Volume2 className="h-3.5 w-3.5" /> : <Play className="h-3 fill-[#164A53]" />}
                  {speakingTutorId === tutor.id ? 'Escuchando invitación...' : 'Escuchar voz'}
                </button>
              </div>

              {/* Slots wrapping responsive columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {tutor.timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.isAvailable}
                    onClick={() => handleSlotSelect(tutor, slot)}
                    className={`p-2 rounded-xl text-center font-sans text-xs flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                      slot.isAvailable
                        ? 'bg-white border border-gray-150 hover:border-[#226D7A] hover:bg-[#B0E0E9]/10'
                        : 'bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <span className="text-[9px] text-gray-400 uppercase font-mono font-bold leading-none">{slot.day}</span>
                    <span className="font-bold text-gray-900 leading-tight">{slot.time}</span>
                    <span className="text-[8px] text-[#226D7A] font-bold uppercase tracking-wide leading-none">{slot.isAvailable ? 'Agendar' : 'Ocupado'}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Booking Confirmation Schedular Form Dialog */}
      {showBookingForm && selectedTutor && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full border border-gray-100 p-6 shadow-2xl relative animate-fadeIn" id="tutor-booking-panel">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowBookingForm(false);
                setSelectedTutor(null);
                setSelectedSlot(null);
              }}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="h-16 w-16 mb-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="h-8 w-8 text-emerald-700" />
                </div>
                <h3 className="font-sans text-xl font-black text-gray-900 mb-1.5">¡Clase Agendada con Éxito!</h3>
                <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed">
                  Tu sesión con {selectedTutor.name} el día <strong>{selectedSlot.day} ({selectedSlot.time})</strong> ha quedado registrada en tu calendario.
                </p>
                <p className="text-[10px] text-gray-300 font-mono mt-5 uppercase tracking-widest leading-none">Espanishescool Scheduler Live</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="text-left">
                
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 border-b border-gray-55 pb-3">
                  <Smile className="h-5 w-5 text-[#a73918]" />
                  <div>
                    <h3 className="font-sans text-sm font-black text-gray-900">Reservar Clase de Español</h3>
                    <p className="text-[9px] text-gray-400 uppercase font-mono font-bold tracking-widest">Sincronización en Directo</p>
                  </div>
                </div>

                {/* Schedular details segment */}
                <div className="bg-[#B0E0E9]/20 border border-[#B0E0E9]/40 rounded-2xl p-4 mb-5 shrink-0 flex items-start gap-3">
                  <div className="h-10 w-10 bg-[#226D7A] rounded-xl text-white font-sans font-bold flex items-center justify-center text-sm shrink-0">
                    {selectedTutor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-black text-gray-900">Tutor: {selectedTutor.name}</h4>
                    <p className="font-sans text-xs text-gray-500 mt-0.5">Día: <strong>{selectedSlot.day}</strong> &bull; Hora: <strong>{selectedSlot.time}</strong></p>
                    <p className="font-mono text-[9px] text-[#1a6774] font-medium uppercase mt-1 leading-none">Hora de la Ciudad de México</p>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-3.5 mb-5 font-sans">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="booking-name-input">
                      Nombre del Alumno
                    </label>
                    <input
                      type="text"
                      id="booking-name-input"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ej. James Miller"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#226D7A] bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="booking-email-input">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="booking-email-input"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#226D7A] bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Método / Tipo de Sesión
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setLessonType('Trial')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          lessonType === 'Trial'
                            ? 'bg-[#fe7952]/5 border-2 border-[#fe7952]'
                            : 'bg-white border-gray-150 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xs font-black text-gray-950">Clase de Prueba</span>
                        <span className="text-[9px] text-[#a73918] font-bold">¡Demo Gratis!</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLessonType('Regular')}
                        disabled={credits <= 0}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          lessonType === 'Regular'
                            ? 'bg-[#226D7A]/5 border-2 border-[#226D7A]'
                            : 'bg-white border-gray-150 hover:bg-gray-50'
                        } ${credits <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <span className="text-xs font-black text-gray-900">Aplicar Crédito</span>
                        <span className="text-[9px] text-emerald-800 font-bold">{credits} restantes</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Schedular warnings info */}
                <div className="flex items-start gap-2 text-[10px] text-gray-400 mb-6 leading-normal">
                  <Info className="h-4.5 w-4.5 text-[#226D7A] shrink-0 mt-0.5" />
                  <p>
                    Recibirás un correo electrónico de confirmación automática con tu enlace de Google Meet y un archivo inteligente de calendario ICS en los siguientes 5 minutos.
                  </p>
                </div>

                {/* Confirm actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedTutor(null);
                      setSelectedSlot(null);
                    }}
                    className="w-1/3 py-2.5 border border-gray-100 rounded-xl font-sans text-xs font-bold text-gray-500 hover:bg-gray-50 text-center transition-all cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#a73918] hover:bg-[#862201] text-white rounded-xl font-sans text-xs font-black uppercase tracking-wider text-center transition-all shadow-md shadow-[#a73918]/15 cursor-pointer"
                  >
                    Confirmar Reserva
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
