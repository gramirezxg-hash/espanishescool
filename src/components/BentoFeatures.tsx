import React, { useState } from 'react';
import { BookOpen, MapPin, CheckCircle2, Award, Calendar, Clock, Smile, Play, Volume2 } from 'lucide-react';
import { Tutor } from '../types';

interface BentoFeaturesProps {
  tutors: Tutor[];
  onBookTutor: (tutor: Tutor) => void;
  onExplorePricing: () => void;
}

export default function BentoFeatures({ tutors, onBookTutor, onExplorePricing }: BentoFeaturesProps) {
  // Curriculum generator states
  const [selectedInterest, setSelectedInterest] = useState<'viajes' | 'negocios' | 'cultura'>('cultura');
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null);

  // Availability preview states
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');

  // Trigger browser text-to-speech greeting
  const playTutorVoice = (tutorId: string, text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlayingVoice === tutorId) {
        setIsPlayingVoice(null);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.onend = () => {
        setIsPlayingVoice(null);
      };
      utterance.onerror = () => {
        setIsPlayingVoice(null);
      };
      
      setIsPlayingVoice(tutorId);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("La síntesis de voz no es compatible con tu navegador actual, pero puedes leer el saludo del tutor.");
    }
  };

  // Sample Custom Curriculum generator responses
  const getCurriculumData = () => {
    switch (selectedInterest) {
      case 'viajes':
        return {
          title: 'Español Viajero & Aventura',
          duration: '4 lecciones intensivas',
          focus: 'Cruzar el metro de la CDMX, pedir tacos sin picante y regatear amistosamente.',
          modules: ['Clase 1: Vocabulario básico del Metro y Metrobús', 'Clase 2: El arte culinario y niveles de picante', 'Clase 3: Direcciones y mercados de artesanías'],
        };
      case 'negocios':
        return {
          title: 'Español Corporativo de Alto Impacto',
          duration: '6 lecciones avanzadas',
          focus: 'Email profesional, finanzas locales, estructurar propuestas ante empresarios mexicanos.',
          modules: ['Clase 1: Fórmulas de cortesía corporativa mexicana', 'Clase 2: Presentar KPI y proyecciones de venta', 'Clase 3: Negociación con asertividad y tacto'],
        };
      case 'cultura':
      default:
        return {
          title: 'Inmersión Cultural e Histórica',
          duration: '5 lecciones temáticas',
          focus: 'Leyendas tradicionales, el albur, música vernácula y modismos regionales.',
          modules: ['Clase 1: Tradiciones del Día de Muertos y Ofrendas', 'Clase 2: Jerga mexicana esencial para la calle', 'Clase 3: Significado oculto de los refranes populares'],
        };
    }
  };

  const curr = getCurriculumData();

  return (
    <section className="bg-[#f9f9fa]/60 py-16 px-6 border-y border-gray-100" id="features-section">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Title with Active Student Count Avatar Bubble */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-2xl">
            <h2 className="font-sans text-3xl lg:text-4xl font-black text-[#1a1c1d] tracking-tight mb-4">
              Por qué aprender con nosotros
            </h2>
            <p className="font-sans text-base text-gray-500 leading-relaxed">
              Más que un idioma, te entregamos las llaves para comunicarte en español a través de un programa estructurado y flexible que se mimetiza con tus intereses auténticos.
            </p>
          </div>

          {/* "+500 estudiantes activos" floating badges pill from image reference */}
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm self-start md:self-auto" id="active-students-pill">
            <div className="flex -space-x-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0E0E9] border-2 border-white text-[10px] font-bold text-gray-700">JD</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2A68D] border-2 border-white text-[10px] font-bold text-gray-700">AM</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#226D7A] border-2 border-white text-[10px] font-bold text-white">SK</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 border-2 border-white text-[10px] font-bold text-gray-700">+</span>
            </div>
            <div className="text-left font-sans">
              <p className="text-xs font-black text-[#164A53] leading-none">+500 estudiantes</p>
              <p className="text-[10px] text-gray-400 font-medium">aprendiendo activamente</p>
            </div>
          </div>
        </div>

        {/* Bento Grid Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Card 1: Currículo Personalizado with Interactive Simulator (8 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left relative overflow-hidden" id="card-personalized-curriculum">
            
            <div className="relative z-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B0E0E9]/30 text-[#164A53] mb-5">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-2xl font-extrabold text-gray-900 mb-3">Currículo Personalizado</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">
                No usamos libros genéricos aburridos de gramática antigua. Adaptamos el contenido a tus aficiones: selecciona tus intereses clave abajo y mira cómo cambia tu ruta de aprendizaje:
              </p>

              {/* Interactive Interest Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedInterest('cultura')}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                    selectedInterest === 'cultura'
                      ? 'bg-[#226D7A] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  id="tab-interest-cultura"
                >
                  🇲🇽 Cultura y Jerga
                </button>
                <button
                  onClick={() => setSelectedInterest('viajes')}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                    selectedInterest === 'viajes'
                      ? 'bg-[#226D7A] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  id="tab-interest-viajes"
                >
                  ✈️ Viajes de Mochila
                </button>
                <button
                  onClick={() => setSelectedInterest('negocios')}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                    selectedInterest === 'negocios'
                      ? 'bg-[#226D7A] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  id="tab-interest-negocios"
                >
                  💼 Negocios en LATAM
                </button>
              </div>

              {/* Dynamic Simulated Syllabus Box */}
              <div className="bg-[#B0E0E9]/10 rounded-2xl p-5 border border-[#B0E0E9]/30 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#164A53] font-bold bg-[#B0E0E9]/40 px-2 py-0.5 rounded-full">Syllabus Generado</span>
                  <span className="font-sans text-xs font-semibold text-gray-500">{curr.duration}</span>
                </div>
                <h4 className="font-sans text-base font-black text-gray-900 mb-1">{curr.title}</h4>
                <p className="font-sans text-xs text-gray-500 mb-4">{curr.focus}</p>
                <div className="space-y-2">
                  {curr.modules.map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <span className="font-mono font-bold text-[#a73918]">{i + 1}.</span>
                      <p>{m}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reference Checkbox bullets exactly matching the reference image layout */}
              <div className="space-y-3 pt-2 text-sm text-gray-700 font-sans font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Materiales exclusivos diseñados a la medida de tu aprendizaje</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Evaluación de nivel y entrevista de metas siempre gratuita</span>
                </div>
              </div>
            </div>

            {/* Notebook & coffee illustration decoration on the right */}
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20 lg:opacity-30 select-none pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#a73918]">
                <circle cx="80" cy="80" r="40" fill="currentColor" />
                <path d="M50 40H90V80H50V40Z" fill="white" stroke="currentColor" strokeWidth="2" />
                <line x1="55" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="2" />
                <line x1="55" y1="60" x2="85" y2="60" stroke="currentColor" strokeWidth="2" />
                <line x1="55" y1="70" x2="75" y2="70" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Card 2: Tutores Nativos with Spotlights (5 Columns) */}
          <div className="lg:col-span-5 bg-[#164A53] rounded-3xl p-6 lg:p-8 text-white shadow-sm flex flex-col justify-between text-left relative overflow-hidden" id="card-native-tutors">
            
            {/* Overlay circle graphic */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5" />
            
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#B0E0E9] mb-5">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-sans text-2xl font-extrabold text-white mb-3">Tutores Nativos</h3>
              <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                Todos nuestros maestros son mexicanos con acreditaciones universitarias de enseñanza de segunda lengua. Nada de acentos neutros ficticios: aprende el ritmo, la calidez y las frases auténticas de México.
              </p>

              {/* Active Tutor Spotlight Mini-Widget */}
              <div className="space-y-4">
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#B0E0E9] font-bold">TUTOR DISPONIBLE HOY</p>
                {tutors.slice(0, 2).map((tutor) => (
                  <div key={tutor.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full object-cover border-2 border-[#B0E0E9]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-sans text-sm font-semibold">{tutor.name}</h4>
                          <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold text-[#B0E0E9]">{tutor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/75 mt-0.5">
                          <MapPin className="h-3 w-3 text-[#F2A68D]" />
                          <span>{tutor.origin}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Audio Greeting Play Trigger */}
                    <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => playTutorVoice(tutor.id, tutor.voiceSampleText)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                          isPlayingVoice === tutor.id
                            ? 'bg-[#a73918] text-white animate-pulse'
                            : 'bg-white text-[#164A53] hover:bg-gray-100'
                        }`}
                        id={`btn-listen-${tutor.id}`}
                      >
                        {isPlayingVoice === tutor.id ? <Volume2 className="h-3 w-3" /> : <Play className="h-3 w-3 fill-[#164A53]" />}
                        {isPlayingVoice === tutor.id ? 'Escuchando...' : 'Escuchar voz'}
                      </button>

                      <button
                        onClick={() => onBookTutor(tutor)}
                        className="text-xs font-bold text-[#B0E0E9] hover:underline cursor-pointer"
                        id={`btn-spotlight-book-${tutor.id}`}
                      >
                        Agendar Clase →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-2 text-xs text-white/60 font-sans">
              <span className="font-bold text-[#B0E0E9]">Elena R.</span> y otros 15 tutores calificados te esperan para platicar.
            </div>
          </div>

        </div>

        {/* Lower Full-Width Banner: "Horarios que se adaptan a ti" */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#B0E0E9]/30 to-[#B0E0E9]/60 border border-[#B0E0E9]/60 p-6 lg:p-8 text-left" id="card-schedules">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="font-sans text-xl font-extrabold text-[#1a6774] mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#a73918]" />
                Horarios que se adaptan a ti
              </h3>
              <p className="font-sans text-sm text-[#164A53]/80 max-w-xl leading-relaxed">
                Reserva tus clases 24/7 a través de nuestra plataforma interactiva. Cancela o reprograma sin penalizaciones y sin complicaciones hasta 12 horas antes de tu sesión.
              </p>
            </div>

            <button
              onClick={() => setShowAvailability(!showAvailability)}
              className="rounded-xl bg-[#005460] hover:bg-[#164A53] text-white px-6 py-3 font-sans text-sm font-bold shadow-md shadow-[#226D7A]/20 transition-all flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
              id="features-availability-btn"
            >
              <Clock className="h-4 w-4" />
              {showAvailability ? 'Cerrar Disponibilidad' : 'Ver Disponibilidad'}
            </button>
          </div>

          {/* Expanded Interactive Calendar Scheduler Sandbox inside features section! */}
          {showAvailability && (
            <div className="mt-6 bg-white rounded-2xl p-5 border border-dashed border-[#226D7A]/30 animate-fadeIn text-left">
              <h4 className="font-sans text-sm font-bold text-[#164A53] mb-3 flex items-center gap-2">
                <Smile className="h-4 w-4 text-[#a73918]" />
                Simulador de Canales Horarios Disponibles (Hora Central México UTC-6)
              </h4>
              
              {/* Day selection */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1.5">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      selectedDay === day
                        ? 'bg-[#a73918] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Time Slots layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {['08:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'].map((time) => {
                  const demoId = `${selectedDay}-${time}`;
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        // Quick dynamic booking triggers
                        const demoTutor = tutors[Math.floor(Math.random() * tutors.length)];
                        onBookTutor({
                          ...demoTutor,
                          timeSlots: [{ id: demoId, day: selectedDay, time: time, isAvailable: true }]
                        });
                      }}
                      className="px-2.5 py-2 font-sans text-xs bg-white hover:bg-[#B0E0E9]/10 border border-gray-100 hover:border-[#226D7A] rounded-xl text-center text-gray-700 font-medium transition-all shadow-sm flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <span className="font-mono text-[10px] text-gray-400">{selectedDay}</span>
                      <span className="font-bold text-[#1a1c1d]">{time}</span>
                      <span className="text-[9px] text-[#226D7A] font-bold">Agendar</span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-[10px] text-gray-400 font-mono text-center">
                *Los horarios se sincronizan con tu huso horario local de manera automática de forma inteligente al registrarte.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
