import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQAccordion() {
  const [activeId, setActiveId] = useState<string | null>('q-1');

  const faqs: FAQItem[] = [
    {
      id: 'q-1',
      question: '¿Qué materiales necesito para mis clases?',
      answer: '¡Solo una computadora o tablet y buena conexión a internet! Todo el material didáctico (PDFs, ejercicios interactivos y grabaciones) está incluido en tu cuenta sin costo adicional, listo para descargarse en cualquier momento.'
    },
    {
      id: 'q-2',
      question: '¿Qué plataforma usan para las clases?',
      answer: 'Nuestras clases en vivo de inmersión 1-on-1 se dictan directamente a través de una sala integrada de alta velocidad dentro de nuestro panel, o si lo prefieres, a través de enlaces rápidos de Zoom o Google Meet con un solo clic.'
    },
    {
      id: 'q-3',
      question: '¿Cómo funcionan las cancelaciones?',
      answer: 'Entendemos que el día a día puede ser impredecible. Puedes cancelar o reprogramar cualquier sesión agendada de forma totalmente gratuita directa en tu panel estudiantil con un mínimo de 12 horas de anticipación.'
    }
  ];

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-[#f9f9fa] py-16 px-6" id="faq-section">
      <div className="mx-auto max-w-4xl">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-sans text-2xl lg:text-3xl font-black text-[#1a1c1d] tracking-tight mb-2">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-xs text-gray-500 font-medium">
            Todo lo que necesitas saber antes de iniciar tu viaje lingüístico
          </p>
        </div>

        {/* Collapsible items */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all overflow-hidden text-left"
                id={`faq-item-${faq.id}`}
              >
                {/* Trigger bar */}
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-gray-900 font-sans text-sm font-bold hover:text-[#226D7A] transition-colors cursor-pointer"
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="pr-4 leading-normal">{faq.question}</span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-[#226D7A] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#a73918]' : ''
                    }`}
                  />
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-500 leading-relaxed font-sans border-t border-gray-50/50 animate-slideDown">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
