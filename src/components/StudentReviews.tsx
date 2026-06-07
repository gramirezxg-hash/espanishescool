import React, { useState } from 'react';
import { Star, MessageSquareCode, Plus, CheckCircle, Send } from 'lucide-react';
import { Testimonial } from '../types';

interface StudentReviewsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (t: Testimonial) => void;
}

export default function StudentReviews({ testimonials, onAddTestimonial }: StudentReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || !country) return;

    const newTestimonial: Testimonial = {
      id: `custom-res-${Date.now()}`,
      name,
      country,
      text: `"${text}"`,
      rating,
      avatarInitials: name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      avatarBgColor: ['bg-emerald-700', 'bg-[#a73918]', 'bg-[#226D7A]', 'bg-[#664600]'][Math.floor(Math.random() * 4)]
    };

    onAddTestimonial(newTestimonial);
    setIsSuccess(true);
    
    setTimeout(() => {
      setName('');
      setCountry('');
      setText('');
      setRating(5);
      setIsSuccess(false);
      setShowForm(false);
    }, 1500);
  };

  return (
    <section className="bg-[#164A53] py-20 px-6 text-white relative overflow-hidden" id="testimonials-section">
      
      {/* Decorative Traditional Textile Lattice SVG Accent */}
      <div className="absolute top-0 left-0 w-full opacity-5 pointer-events-none select-none">
        <svg width="100%" height="32" viewBox="0 0 1200 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16L16 0L32 16L48 0L64 16L80 0L96 16L112 0L128 16L144 0L160 16L176 0L192 16L208 0L224 16L240 0L256 16L272 0L288 16L304 0L320 16L336 0L352 16L368 0L384 16L400 0L416 16L432 0L448 16L464 0L480 16L496 0L512 16L528 0L544 16L560 0L576 16L592 0L608 16L624 0L640 16L656 0L672 16L688 0L704 16L720 0L736 16L752 0L768 16L784 0L800 16L816 0L832 16L848 0L864 16L880 0L896 16L912 0L928 16L944 0L960 16L976 0L992 16L1008 0L1024 16L1040 0L1056 16L1072 0L1088 16L1104 0L1120 16L1136 0L1152 16L1168 0L1184 16L1200 0V32H0V16Z" fill="white" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left">
            <p className="text-[#B0E0E9] font-sans text-xs font-black uppercase tracking-wider mb-2">Comunidad Global</p>
            <h2 className="font-sans text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
              Nuestros Estudiantes Dicen
            </h2>
            <p className="font-sans text-sm text-white/80 max-w-lg">
              Descubre cómo la inmersión interactiva de Espanishescool ha cambiado las oportunidades y carreras de nuestros alumnos alrededor del mundo.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white text-[#164A53] hover:bg-[#B0E0E9] px-5 py-2.5 font-sans text-xs font-black tracking-wide uppercase transition-all shadow-md self-start md:self-auto cursor-pointer"
            id="write-review-toggle-btn"
          >
            <Plus className="h-4 w-4" />
            Escribir Reseña
          </button>
        </div>

        {/* Dynamic add review panel */}
        {showForm && (
          <div className="bg-white text-gray-900 rounded-3xl p-6 lg:p-8 max-w-xl mx-auto mb-12 shadow-2xl animate-fadeIn">
            {isSuccess ? (
              <div className="text-center py-6 flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-emerald-600 mb-3 animate-pulse" />
                <h4 className="font-sans text-lg font-bold">¡Mil gracias por compartir!</h4>
                <p className="font-sans text-xs text-gray-500 mt-1">Tu testimonio ha sido registrado de forma exitosa en el panel de opiniones.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="text-left">
                <h4 className="font-sans text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquareCode className="h-5 w-5 text-[#a73918]" />
                  Comparte tu experiencia en la academia
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 font-sans mb-1" htmlFor="review-name">Nombre</label>
                    <input
                      type="text"
                      id="review-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. James Miller"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#226D7A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 font-sans mb-1" htmlFor="review-country">País / Ciudad</label>
                    <input
                      type="text"
                      id="review-country"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Ej. EEUU"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#226D7A]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 font-sans mb-1">Calificación</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star className={`h-6 w-6 stroke-[#ffdca6] ${rating >= star ? 'fill-[#fcbb42] text-[#fcbb42]' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 font-sans mb-1" htmlFor="review-text">Tu opinión</label>
                  <textarea
                    id="review-text"
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Cuéntanos qué te han parecido tus profesores nativos y el material de estudio..."
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#226D7A] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    Salir
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#a73918] hover:bg-[#862201] text-white px-5 py-2.5 font-sans text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                    id="submit-review-btn"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Enviar Reseña
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Review Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white/10 flex flex-col justify-between text-left hover:bg-white/15 transition-all"
              id={`testimonial-${test.id}`}
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i < test.rating ? 'fill-[#fcbb42] text-[#fcbb42]' : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-sans text-sm font-medium italic leading-relaxed text-white/95 mb-6">
                  {test.text}
                </p>
              </div>

              {/* Author footer widget matching image circles layout */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className={`h-11 w-11 rounded-full ${test.avatarBgColor} flex items-center justify-center font-sans text-xs font-extrabold text-white`}>
                  {test.avatarInitials}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-black text-white">{test.name}</h4>
                  <p className="font-mono text-[10px] text-[#B0E0E9] font-bold uppercase tracking-wider">{test.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
