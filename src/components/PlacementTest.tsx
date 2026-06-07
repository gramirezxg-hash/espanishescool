import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, BookOpen, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface PlacementTestProps {
  onTestComplete: (level: string, score: number) => void;
}

export default function PlacementTest({ onTestComplete }: PlacementTestProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [testComplete, setTestComplete] = useState(false);

  // 10 authentic diagnostic Spanish exam questions
  const questions: Question[] = [
    {
      id: 1,
      question: '¿Cómo se dice "Good afternoon" en español mexicano?',
      options: ['¡Buenos días!', '¡Buenas tardes!', '¡Buenas noches!', '¡Hola amigo!'],
      correct: '¡Buenas tardes!',
      explanation: 'Utilizamos "¡Buenos días!" por la mañana, "¡Buenas tardes!" desde el mediodía hasta el anochecer, y "¡Buenas noches!" al oscurecer.'
    },
    {
      id: 2,
      question: 'Completa la frase: "Yo ________ de México y mi profesor ________ en Monterrey."',
      options: ['soy / está', 'estoy / es', 'tengo / vive', 'soy / es'],
      correct: 'soy / está',
      explanation: 'Usamos "Ser" (soy) para procedencia nacionalidad permanente, y "Estar" (está) para localización geográfica temporal.'
    },
    {
      id: 3,
      question: '¿Cuál palabra completa correctamente: "Ayer mi hermano ________ tacos al pastor en el almuerzo"?',
      options: ['comerá', 'comió', 'comía', 'coma'],
      correct: 'comió',
      explanation: 'Para acciones del pasado puntuales y terminadas ("ayer"), se utiliza el Pretérito Indefinido (comió).'
    },
    {
      id: 4,
      question: '¿Qué significa la expresión coloquial mexicana "Echar la mano"?',
      options: ['Saludar de lejos', 'Ayudar a alguien', 'Golpear un objeto', 'Despedirse formalmente'],
      correct: 'Ayudar a alguien',
      explanation: '"Echar la mano" es un modismo o jerga sumamente popular en todo México que significa brindar auxilio, ayuda o socorro.'
    },
    {
      id: 5,
      question: 'Completa con subjuntivo: "Espero que tú ________ mañana a mi clase de español."',
      options: ['vienes', 'vengas', 'vendrás', 'viniste'],
      correct: 'vengas',
      explanation: 'Frases que expresan deseos o esperanzas ("Espero que...") requieren obligatoriamente el uso del modo Subjuntivo.'
    },
    {
      id: 6,
      question: 'Si en una taquería mexicana escuchas "Taco con copia", significa que tu taco viene con:',
      options: ['Salsa extra picante gratis', 'Dos tortillas encimadas', 'Un refresco de cola incluido', 'Un taco de cortesía'],
      correct: 'Dos tortillas encimadas',
      explanation: 'En las taquerías tradicionales, los tacos se sirven "con copia" (dos tortillas) para evitar que se rompa por el consomé.'
    },
    {
      id: 7,
      question: 'Selecciona la frase gramaticalmente correcta:',
      options: [
        'Me gusta mucho el cultura mexicano.',
        'Me gusta mucho la cultura mexicana.',
        'Me gustan mucho las culturas mexicano.',
        'Me gusta mucho la cultura de mexicano.'
      ],
      correct: 'Me gusta mucho la cultura mexicana.',
      explanation: '"Cultura" es un sustantivo femenino singular, por lo tanto requiere artículo femenino ("la") y adjetivo concordante ("mexicana").'
    },
    {
      id: 8,
      question: '¿Cuál es el uso principal del término temporal "Ahorita" en el hablar mexicano cotidiano?',
      options: [
        'Exactamente en este microsegundo.',
        'En un momento indeterminado (puede ser pronto, luego o nunca).',
        'Ayer por la tarde.',
        'Solamente para citas formales de trabajo.'
      ],
      correct: 'En un momento indeterminado (puede ser pronto, luego o nunca).',
      explanation: 'El legendario sentido del tiempo mexicano. "Ahorita" expresa cortesía al posponer una actividad, sin comprometer una hora fija.'
    },
    {
      id: 9,
      question: '¿Cuál de las siguientes palabras denota un sentimiento de un cariño profundo y de "abrazar con el alma"?',
      options: ['Platicar', 'Apapachar', 'Chambear', 'Regatear'],
      correct: 'Apapachar',
      explanation: 'De origen náhuatl, "apapachar" significa etimológicamente ablandar con afecto, abrazar con el alma.'
    },
    {
      id: 10,
      question: 'Completa: "Si yo ________ más dinero, ________ de vacaciones a las playas de Oaxaca hoy mismo."',
      options: ['tuviera / iría', 'tengo / fui', 'tuviese / iré', 'tenga / iría'],
      correct: 'tuviera / iría',
      explanation: 'Estructura condicional irreal del presente: Imperfecto de Subjuntivo (tuviera) + Condicional Simple (iría).'
    }
  ];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleVerify = () => {
    if (!selectedOption || isAnswered) return;
    
    const isCorrect = selectedOption === questions[currentIdx].correct;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setTestComplete(true);
      // Determine final level placement recommendations
      const levelResult = getLevelResult(score);
      onTestComplete(levelResult, score);
    }
  };

  const getLevelResult = (totalScore: number) => {
    if (totalScore <= 30) return 'Principiante Absoluto (A1)';
    if (totalScore <= 60) return 'Principiante Intermedio (A2)';
    if (totalScore <= 80) return 'Fluidez Intermedia (B1-B2)';
    return 'Usuario Avanzado de Elite (C1-C2)';
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTestComplete(false);
  };

  const q = questions[currentIdx];
  const percentComplete = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-md text-left" id="placement-test-container">
      
      {testComplete ? (
        <div className="py-6 text-center max-w-lg mx-auto" id="test-report-panel">
          <div className="h-16 w-16 mb-5 mx-auto rounded-full bg-[#B0E0E9]/30 text-[#164A53] flex items-center justify-center animate-bounce">
            <Award className="h-8 w-8 text-[#a73918]" />
          </div>
          
          <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#a73918]/10 text-[#a73918] px-3 py-1 rounded-full">
            Diagnóstico Finalizado
          </span>
          
          <h3 className="font-sans text-2xl font-black text-gray-900 mt-3 mb-1">
            Tu Nivel Sugerido:
          </h3>
          <p className="font-sans text-xl font-bold text-[#1a6774] mb-3">
            {getLevelResult(score)}
          </p>
          <p className="font-mono text-sm text-gray-400 font-bold mb-6">
            Puntuación obtenida: {score} / 100 puntos
          </p>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left font-sans text-xs text-gray-600 space-y-2 mb-6">
            <p className="font-bold text-gray-900 flex items-center gap-1.5 text-xs text-[#226D7A] mb-1">
              <BookOpen className="h-4 w-4" />
              Senda de Aprendizaje Recomendada:
            </p>
            {score <= 60 ? (
              <p>Te sugerimos ingresar a nuestro plan <strong>"Español de Supervivencia (A1-A2)"</strong> liderado por nuestro tutor Mateo S., para darte bases sólidas y confianza de hablar.</p>
            ) : score <= 80 ? (
              <p>Estás listo para el plan <strong>"Español Conversacional Fluido (B1-B2)"</strong> liderado por nuestra tutora Elena R. en la CDMX para perfeccionar jergas y subjuntivos.</p>
            ) : (
              <p>¡Eres un as! Te desafiamos con el programa de <strong>"Español para Profesionales (C1-C2)"</strong> guiado por la tutora Isabella V., para certificar tu nivel ejecutivo.</p>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Rehacer Examen
            </button>
            <a
              href="#pricing-section"
              className="px-5 py-2.5 bg-[#a73918] hover:bg-[#862201] text-white rounded-xl font-sans text-xs font-black tracking-wide uppercase shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Ver Planes de Estudio
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div id="test-active-panel">
          
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest font-bold">EXAMEN DE COLOCACIÓN</p>
              <h3 className="font-sans text-lg font-black text-gray-900 mt-0.5">Diagnóstico Rápido de Nivel</h3>
            </div>
            <div className="text-right">
              <span className="font-sans text-xs text-[#226D7A] font-bold">Pregunta {currentIdx + 1} de {questions.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-gray-150 rounded-full mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 bg-[#226D7A] transition-all duration-300" style={{ width: `${percentComplete}%` }} />
          </div>

          {/* Question Text */}
          <h4 className="font-sans text-base font-black text-gray-900 mb-5 leading-normal">
            {q.id}. {q.question}
          </h4>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-6">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnClass = 'border-gray-100 hover:border-[#226D7A] hover:bg-gray-50';
              if (isSelected) btnClass = 'border-3 border-[#226D7A] bg-[#226D7A]/5 font-semibold';
              if (isAnswered) {
                if (option === q.correct) {
                  btnClass = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                } else if (isSelected) {
                  btnClass = 'border-2 border-red-500 bg-red-50 text-red-800';
                } else {
                  btnClass = 'opacity-60 border-gray-100';
                }
              }

              return (
                <button
                  type="button"
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border font-sans text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && option === q.correct && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />}
                  {isAnswered && isSelected && option !== q.correct && <XCircle className="h-4.5 w-4.5 text-red-600" />}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback / Explanation Block */}
          {isAnswered && (
            <div className="bg-[#B0E0E9]/20 border border-[#B0E0E9]/40 rounded-2xl p-4 mb-6 animate-fadeIn">
              <h5 className="font-sans text-xs font-bold text-[#164A53] mb-1 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-[#a73918]" />
                Consejo Gramatical del Tutor:
              </h5>
              <p className="font-sans text-xs text-gray-600 leading-normal">{q.explanation}</p>
            </div>
          )}

          {/* Footer Bar Actions */}
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] text-[#a73918] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Suma de aciertos en tiempo real
            </span>

            {isAnswered ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-[#226D7A] hover:bg-[#164A53] text-white rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                id="test-next-btn"
              >
                {currentIdx === questions.length - 1 ? 'Ver Diagnóstico Final' : 'Siguiente Pregunta'}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleVerify}
                disabled={!selectedOption}
                className={`px-5 py-2.5 rounded-xl font-sans text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                  selectedOption
                    ? 'bg-[#a73918] text-white shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                id="test-verify-btn"
              >
                Comprobar Respuesta
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
