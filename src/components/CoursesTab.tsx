import React, { useState } from 'react';
import { Course, Vocabulary, QuizQuestion } from '../types';
import { coursesData } from '../data/courses';
import { BookOpen, GraduationCap, Play, Volume2, CheckCircle2, ChevronRight, HelpCircle, Heart, Award, ArrowRight } from 'lucide-react';

export default function CoursesTab() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('principiante');
  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'vocab' | 'quiz'>('syllabus');

  // Quiz interactive state managers
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: string }>({});
  const [quizVerified, setQuizVerified] = useState<{ [qId: string]: boolean }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Speech synthesizer voice trigger
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const activeCourse = coursesData.find((c) => c.id === selectedCourseId) || coursesData[0];

  const playVocabularySpeech = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speakingWord === word) {
        setSpeakingWord(null);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'es-MX';
      utterance.rate = 0.85; // slightly slower for educational clear speaking
      
      utterance.onend = () => {
        setSpeakingWord(null);
      };
      utterance.onerror = () => {
        setSpeakingWord(null);
      };

      setSpeakingWord(word);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta el sintetizador de pronunciación de voz.");
    }
  };

  const handleSelectQuizOption = (qId: string, option: string) => {
    if (quizVerified[qId]) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleVerifyAnswer = (qId: string, correctAns: string) => {
    if (quizVerified[qId]) return;
    setQuizVerified(prev => ({ ...prev, [qId]: true }));
    
    if (quizAnswers[qId] === correctAns) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setQuizVerified({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="courses-exploration-view">
      
      {/* Top Section */}
      <div className="text-left mb-10">
        <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#B0E0E9]/45 text-[#164A53] px-3 py-1 rounded-full">
          Rutas de Estudio Estructuradas
        </span>
        <h2 className="font-sans text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-2">Programas de Español Mexicano</h2>
        <p className="font-sans text-sm text-gray-500 max-w-xl leading-relaxed">
          Nuestros currículos se configuran de acuerdo al Marco de Referencia Europeo (CEFR) e inyectan desde el primer día expresiones populares, jerga, tacos y cultura interactiva.
        </p>
      </div>

      {/* Course Selection Level Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 border-b border-gray-100">
        {coursesData.map((course) => {
          const isSelected = course.id === selectedCourseId;
          return (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourseId(course.id);
                setActiveSubTab('syllabus');
                handleRestartQuiz();
              }}
              className={`px-5 py-3 rounded-2xl font-sans text-xs font-black uppercase tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#226D7A] text-white shadow-md shadow-[#226D7A]/15 border-b-2 border-emerald-500'
                  : 'bg-white text-gray-650 border border-gray-150 hover:bg-gray-50 hover:text-gray-900'
              }`}
              id={`course-tab-select-${course.id}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono opacity-80 bg-white/20 px-2 py-0.5 rounded-full">{course.level}</span>
                <span>{course.id.charAt(0).toUpperCase() + course.id.slice(1)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Left Course Summary Card, Right Interactive Syllabus/Vocabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (4 columns): Course Details Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm text-left">
          <img
            src={activeCourse.image}
            alt={activeCourse.title}
            referrerPolicy="no-referrer"
            className="w-full h-48 object-cover rounded-2xl mb-5 shadow-inner"
          />
          <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#fe7952]/10 text-[#a73918] px-2.5 py-0.75 rounded-md border border-[#fe7952]/10">
            {activeCourse.level} &bull; {activeCourse.subtitle}
          </span>
          <h3 className="font-sans text-xl font-black text-gray-900 mt-3 mb-2">{activeCourse.title}</h3>
          <p className="font-sans text-xs text-gray-500 leading-relaxed mb-5">{activeCourse.description}</p>
          
          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-650">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-sans">Duración Estructurada:</span>
              <span className="text-gray-900">{activeCourse.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-sans">Canal de Lecciones:</span>
              <span className="text-gray-900">Virtual 1-a-1 Directo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-sans">Materiales de Estudio:</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">100% Incluidos</span>
            </div>
          </div>
        </div>

        {/* Right Col (8 columns): Syllabus and Interactive Sandbox drawers */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm" id="interactive-course-sandbox">
          
          {/* Sub Navigation Tabs */}
          <div className="flex g-1.5 border-b border-gray-50 pb-3 mb-6">
            <button
              onClick={() => setActiveSubTab('syllabus')}
              className={`px-4 py-2 font-sans text-sm font-bold transition-all rounded-xl cursor-pointer ${
                activeSubTab === 'syllabus'
                  ? 'text-[#226D7A] bg-[#226D7A]/5 font-extrabold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              1. Syllabus de Lecciones ({activeCourse.lessons.length})
            </button>
            <button
              onClick={() => setActiveSubTab('vocab')}
              className={`px-4 py-2 font-sans text-sm font-bold transition-all rounded-xl cursor-pointer ${
                activeSubTab === 'vocab'
                  ? 'text-[#226D7A] bg-[#226D7A]/5 font-extrabold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              2. Vocabulario Interactivo ({activeCourse.vocabulary.length})
            </button>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`px-4 py-2 font-sans text-sm font-bold transition-all rounded-xl cursor-pointer ${
                activeSubTab === 'quiz'
                  ? 'text-[#226D7A] bg-[#226D7A]/5 font-extrabold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              3. Desafío Rápido Quiz
            </button>
          </div>

          {/* Render content based on activeSubTab selection */}
          {activeSubTab === 'syllabus' && (
            <div className="space-y-4 text-left animate-fadeIn" id="syllabus-cabinet">
              {activeCourse.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#226D7A]/10 text-[#226D7A] font-mono font-black text-sm">
                      {lesson.order}
                    </span>
                    <div>
                      <h4 className="font-sans text-sm font-black text-gray-900">{lesson.title}</h4>
                      <p className="font-sans text-xs text-gray-500 leading-normal mt-0.5">{lesson.description}</p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-gray-400 font-bold bg-white border border-gray-150 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'vocab' && (
            <div className="space-y-4 text-left animate-fadeIn" id="vocabulary-cabinet">
              <p className="font-sans text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed">
                🎯 <strong>Práctica de Pronunciación Activa</strong>: Haz clic en el parlante para activar la pronunciación nativa mexicana. Escucha el ritmo e imita la cadencia escrita de los fonemas guia.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCourse.vocabulary.map((vocab, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white rounded-2xl border border-gray-150 hover:border-[#226D7A] hover:bg-gray-50/40 hover:shadow-sm transition-all relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-sans text-sm font-black text-gray-900 leading-none">{vocab.spanish}</h4>
                        
                        <button
                          onClick={() => playVocabularySpeech(vocab.spanish)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            speakingWord === vocab.spanish
                              ? 'bg-[#a73918] text-white animate-pulse'
                              : 'bg-gray-100 text-[#164A53] hover:bg-[#B0E0E9]/30 hover:text-[#164A53]'
                          }`}
                        >
                          {speakingWord === vocab.spanish ? <Volume2 className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current text-[#164A53]" />}
                        </button>
                      </div>

                      <p className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3 leading-none">
                        Ref: {vocab.english} &bull; <span className="text-[#a73918] italic">{vocab.pronunciationHint}</span>
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 mt-2">
                      <p className="font-sans text-[11px] text-gray-700 leading-tight">💬 {vocab.exampleSpanish}</p>
                      <p className="font-sans text-[10px] text-gray-400 italic leading-tight mt-1">"{vocab.exampleEnglish}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'quiz' && (
            <div className="text-left animate-fadeIn space-y-6" id="quiz-quiz-cabinet">
              
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs font-bold text-gray-500">Prueba rápida de nivel {activeCourse.id}</span>
                <button
                  onClick={handleRestartQuiz}
                  className="text-xs font-bold text-[#a73918] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Reiniciar Quiz
                </button>
              </div>

              {activeCourse.quiz.map((q, qIndex) => {
                const userAns = quizAnswers[q.id];
                const isVerified = quizVerified[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div key={q.id} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <h4 className="font-sans text-sm font-black text-gray-900 leading-snug mb-3">
                      {qIndex + 1}. {q.question}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((option, oIdx) => {
                        const isSelected = userAns === option;
                        let optClass = 'bg-white border-gray-150 hover:bg-gray-100';
                        if (isSelected) optClass = 'border-2 border-[#226D7A] bg-[#226D7A]/5 font-semibold';
                        if (isVerified) {
                          if (option === q.correctAnswer) {
                            optClass = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                          } else if (isSelected) {
                            optClass = 'border-2 border-red-500 bg-red-50 text-red-800';
                          } else {
                            optClass = 'opacity-60 border-gray-100';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isVerified}
                            onClick={() => handleSelectQuizOption(q.id, option)}
                            className={`w-full text-left p-3 text-xs rounded-xl border transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                          >
                            <span>{option}</span>
                            {isVerified && option === q.correctAnswer && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Verification and response feedback action cards */}
                    {!isVerified ? (
                      <button
                        onClick={() => handleVerifyAnswer(q.id, q.correctAnswer)}
                        disabled={!userAns}
                        className={`px-4 py-2 text-xs rounded-xl font-sans font-bold transition-all cursor-pointer ${
                          userAns
                            ? 'bg-[#a73918] text-white hover:bg-[#862201] shadow-sm'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Comprobar Respuesta
                      </button>
                    ) : (
                      <div className="bg-[#B0E0E9]/30 rounded-xl p-3 border border-[#B0E0E9]/50 text-xs text-gray-700 leading-normal flex gap-1.5 items-start mt-2">
                        <HelpCircle className="h-4.5 w-4.5 text-[#a73918] shrink-0 mt-0.5" />
                        <p>{q.explanation}</p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
