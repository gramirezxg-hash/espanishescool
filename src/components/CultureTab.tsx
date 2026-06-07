import React, { useState } from 'react';
import { slangCardsData, cultureBlogsData } from '../data/culture';
import { CultureBlog, SlangCard } from '../types';
import { BookOpen, Sparkles, RefreshCw, ChevronRight, X, Heart, MessageCircleCode, Volume2, Smile } from 'lucide-react';

export default function CultureTab() {
  const [selectedBlog, setSelectedBlog] = useState<CultureBlog | null>(null);
  const [flippedSlangIds, setFlippedSlangIds] = useState<{ [id: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFlip = (id: string) => {
    setFlippedSlangIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredSlang = slangCardsData.filter((card) =>
    card.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.mexicanMeaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10" id="culture-exploration-view">
      
      {/* Upper header */}
      <div className="text-left mb-10">
        <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#fe7952]/10 text-[#a73918] px-3 py-1 rounded-full">
          Inmersión en la Tradición Mexicana
        </span>
        <h2 className="font-sans text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-2">Cultura y Modismos</h2>
        <p className="font-sans text-sm text-gray-500 max-w-xl leading-relaxed">
          Para hablar un idioma con fluidez, debes vivir sus modales y comprender la picardía de su jerga. Explora nuestras flashcards y crónicas culturales creadas por tutores.
        </p>
      </div>

      {/* Grid: Left Column Flashcards Deck, Right Column Blog Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Side (7 Columns): Interactive Slang Flashcard Grid Arena */}
        <div className="lg:col-span-7 space-y-6 text-left" id="slang-arena">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-sans text-lg font-black text-gray-900 leading-none">Diccionario de Jerga</h3>
              <p className="text-[9px] text-gray-400 font-mono tracking-wider font-bold mt-1.5 uppercase">Toca la tarjeta para ver qué significa</p>
            </div>

            {/* Filter Search */}
            <input
              type="text"
              placeholder="Buscar modismo (ej. Chido, Chamba)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs focus:outline-none focus:border-[#226D7A] bg-white text-gray-900 w-full sm:max-w-[220px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSlang.map((card) => {
              const isFlipped = !!flippedSlangIds[card.id];
              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className="h-56 cursor-pointer relative perspective"
                >
                  <div
                    className={`w-full h-full duration-500 transform-style-preserve-3d transition-all ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front side of card */}
                    <div className="absolute inset-0 backface-hidden bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#226D7A] transition-all flex flex-col justify-between text-left">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#a73918] bg-[#fe7952]/10 px-2 py-0.5 rounded-md font-bold">Modismo Mexicano</span>
                          <span className="text-[10px] text-gray-300 font-mono">Ver traducción →</span>
                        </div>
                        <h4 className="font-sans text-2xl font-black text-[#164A53] tracking-tight">{card.word}</h4>
                      </div>

                      <div className="border-t border-gray-50 pt-3">
                        <p className="font-sans text-xs text-gray-500 italic block">¿Cómo suena?</p>
                        <p className="font-sans text-xs font-bold text-gray-700 mt-0.5">💬 {card.exampleSpanish}</p>
                      </div>
                    </div>

                    {/* Back side of card */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#164A53] text-white p-6 rounded-2xl shadow-md flex flex-col justify-between text-left border border-white/5">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#B0E0E9] font-bold">Respuesta Regional</span>
                          <span className="text-[9px] text-white/50 font-mono">Tocar para girar &times;</span>
                        </div>
                        <h4 className="font-sans text-base font-black text-white">{card.word} : <span className="text-[#ffdca6]">{card.mexicanMeaning}</span></h4>
                        
                        <p className="font-sans text-[11px] text-white/80 leading-snug mt-2 pt-2 border-t border-white/5 font-medium">
                          <strong>Explicacion:</strong> {card.culturalNote}
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-2.5 border border-white/5">
                        <p className="font-sans text-[10px] text-white/90 leading-tight"><strong>Inglés:</strong> {card.exampleEnglish}</p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side (5 Columns): Culture Blog Articles List */}
        <div className="lg:col-span-5 space-y-6 text-left" id="culture-chronicles">
          <div>
            <h3 className="font-sans text-lg font-black text-gray-900 leading-none">Crónicas de Cultura</h3>
            <p className="text-[9px] text-gray-400 font-mono tracking-wider font-bold mt-1.5 uppercase">Artículos seleccionados de nuestra academia</p>
          </div>

          <div className="space-y-4">
            {cultureBlogsData.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#226D7A] transition-all cursor-pointer flex gap-4"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between text-left">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#a73918] font-black bg-[#fe7952]/10 px-2 py-0.5 rounded-full">{blog.category}</span>
                    <h4 className="font-sans text-xs font-black text-gray-900 mt-1 leading-snug line-clamp-2">{blog.title}</h4>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-gray-400 font-sans mt-2">
                    <span>{blog.readTime}</span>
                    <span className="text-[#226D7A] font-bold">Leer artículo →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Culture Blog Detail Modal Viewer overlay popup */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-gray-100 p-6 lg:p-8 shadow-2xl relative animate-fadeIn text-left">
            
            {/* Close Button Trigger */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body Contents */}
            <div>
              <div className="mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a73918] bg-[#fe7952]/10 border border-[#fe7952]/20 px-3 py-1 rounded-full font-bold">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-400 text-xs font-sans font-semibold ml-3">{selectedBlog.readTime}</span>
              </div>

              <h3 className="font-sans text-2xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                {selectedBlog.title}
              </h3>

              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover rounded-2xl mb-6 shadow-sm border border-gray-50"
              />

              {/* Dynamic scrollable rich formatted markdown text mock */}
              <div className="max-h-[250px] overflow-y-auto pr-2 font-sans text-sm text-gray-600 leading-relaxed space-y-4 font-normal">
                {selectedBlog.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('1.') || paragraph.startsWith('-') || paragraph.startsWith('*')) {
                    return (
                      <div key={pIdx} className="bg-gray-55/70 rounded-xl p-3 border border-gray-100 my-2">
                        <p className="italic text-gray-800 text-xs font-semibold">{paragraph.replace(/[*-]/g, '')}</p>
                      </div>
                    );
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>

              {/* Footer row */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Smile className="h-4 w-4 text-[#a73918]" />
                  Espanishescool Cultural Corner
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedBlog(null)}
                  className="rounded-xl bg-[#226D7A] hover:bg-[#164A53] text-white px-5 py-2 font-sans text-xs font-black uppercase tracking-wide cursor-pointer"
                >
                  Cerrar Artículo
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
