import React, { useState } from 'react';
import { Check, Flame, HelpCircle, X, Shield, Sparkles, AlertCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  perClass: string;
  description: string;
  savings?: string;
  features: string[];
  ctaText: string;
  recommended: boolean;
  colorTheme: 'teal' | 'terracotta' | 'neutral';
}

interface PlanesCostosProps {
  onPurchaseComplete: (planName: string, creditsGranted: number) => void;
}

export default function PlanesCostos({ onPurchaseComplete }: PlanesCostosProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans: Plan[] = [
    {
      id: 'individual',
      name: 'Individual',
      price: 25,
      perClass: 'Pago por clase única',
      description: 'Ideal para probar el método o resolver dudas gramaticales muy específicas.',
      features: [
        '60 min de clase 1-a-1',
        'Material digital incluido',
        'Sin compromiso mensual',
        'Cancelación flexible hasta 12h'
      ],
      ctaText: 'Comprar Ahora',
      recommended: false,
      colorTheme: 'neutral'
    },
    {
      id: 'viajero',
      name: 'Paquete Viajero',
      price: 220,
      perClass: '$22 por clase',
      description: 'Nuestra opción más popular. Diseñado para conseguir fluidez conversacional práctica de mediano plazo.',
      savings: 'Ahorra $30',
      features: [
        '10 clases de 60 min',
        'Evaluación de progreso',
        'Soporte directo vía WhatsApp',
        'Acceso ilimitado a grupo de cultura'
      ],
      ctaText: 'Get Started',
      recommended: true,
      colorTheme: 'terracotta'
    },
    {
      id: 'immersion',
      name: 'Inmersión Total',
      price: 400,
      perClass: '$20 por clase',
      description: 'Para profesionales y aventureros comprometidos con dominar a fondo el idioma y la cultura mexicana.',
      savings: 'Ahorra $100',
      features: [
        '20 clases de 60 min',
        'Certificado formal de nivel',
        'Tutoría personalizada 24/7',
        'Entrevistas de simulación laboral'
      ],
      ctaText: 'Comprar Ahora',
      recommended: false,
      colorTheme: 'teal'
    }
  ];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;

    // Grants dynamic premium lesson credits to the student
    const credits = selectedPlan?.id === 'individual' ? 1 : selectedPlan?.id === 'viajero' ? 10 : 20;
    
    setPaymentSuccess(true);
    setTimeout(() => {
      onPurchaseComplete(selectedPlan!.name, credits);
      setSelectedPlan(null);
      setPaymentSuccess(false);
      setStudentName('');
      setStudentEmail('');
    }, 1800);
  };

  return (
    <section className="bg-white py-16 px-6 relative" id="pricing-section">
      <div className="mx-auto max-w-7xl text-center">
        
        {/* Header Titles exactly matching content details requested */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="font-sans text-3xl lg:text-4xl font-black text-[#1a1c1d] tracking-tight mb-4">
            Planes y Costos
          </h2>
          <p className="font-sans text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Invierte en tu futuro y comienza a hablar español hoy mismo con paquetes flexibles para cada necesidad.
          </p>
        </div>

        {/* Pricing Cards list wrapping responsive layouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => {
            const isRecommended = plan.recommended;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 text-left ${
                  isRecommended
                    ? 'border-3 border-[#a73918] bg-white shadow-xl scale-102 z-10 md:translate-y-[-10px]'
                    : 'border border-gray-100 bg-white hover:border-[#226D7A] hover:shadow-lg'
                }`}
                id={`plan-card-${plan.id}`}
              >
                
                {/* RECOMMENDED badge header */}
                {isRecommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#a73918] text-white px-5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-sans shadow-md flex items-center gap-1">
                    <Flame className="h-3 w-3 animate-pulse" />
                    RECOMENDADO
                  </div>
                )}

                {/* Card Top Details */}
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-gray-50 text-[#164A53] border border-gray-100 rounded-full px-3 py-1 font-sans text-xs font-semibold">
                      {plan.name}
                    </span>
                  </div>

                  {/* Savings Pill */}
                  {plan.savings && (
                    <div className="mt-1.5 mb-2.5">
                      <span className="bg-[#fe7952]/10 text-[#a73918] border border-[#fe7952]/20 font-sans text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-sans text-4xl lg:text-5xl font-black text-gray-900">${plan.price}</span>
                    <span className="font-sans text-xs text-gray-400 font-bold">USD</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 font-medium mt-1 mb-6">
                    {plan.perClass}
                  </p>

                  <p className="font-sans text-xs text-gray-500 leading-relaxed mb-6 border-b border-gray-100 pb-5">
                    {plan.description}
                  </p>

                  {/* Feature Lists */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-sans font-medium">
                        <Check className="h-4.5 w-4.5 text-[#226D7A] bg-[#226D7A]/10 p-0.5 rounded-full shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action button matching colors */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-sans text-xs font-black tracking-wide uppercase transition-all duration-300 cursor-pointer text-center ${
                    isRecommended
                      ? 'bg-[#a73918] text-white shadow-md shadow-[#a73918]/20 hover:bg-[#862201] hover:-translate-y-0.5'
                      : 'bg-white text-[#226D7A] border-2 border-[#226D7A]/80 hover:bg-[#226D7A] hover:text-white hover:border-[#226D7A]'
                  }`}
                  id={`purchase-btn-${plan.id}`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Checkout Modal Dialog */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-md w-full border border-gray-100 p-6 shadow-2xl relative animate-fadeIn" id="checkout-modal-panel">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Content */}
              {paymentSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="h-16 w-16 mb-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center animate-bounce">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="font-sans text-xl font-black text-gray-900 mb-2">¡Inscripción Exitosa!</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed">
                    Hemos procesado tus créditos de forma segura. Redirigiéndote a tu panel estudiantil...
                  </p>
                  <p className="font-mono text-[9px] text-[#226D7A] mt-5 uppercase tracking-widest font-black leading-none">
                    Espanishescool Academy secure vault
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="text-left">
                  
                  {/* Title */}
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                    <Sparkles className="h-5 w-5 text-[#a73918]" />
                    <div>
                      <h3 className="font-sans text-base font-black text-gray-900">Confirmar tu Inscripción</h3>
                      <p className="text-[10px] text-gray-400 uppercase font-mono font-bold tracking-widest">Paso Final</p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#B0E0E9]/20 border border-[#B0E0E9]/40 rounded-2xl p-4 mb-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-sans text-xs text-[#164A53] font-bold">Paquete Seleccionado:</p>
                        <h4 className="font-sans text-base font-extrabold text-gray-900 mt-0.5">{selectedPlan.name}</h4>
                        <p className="font-sans text-[11px] text-gray-500 mt-1">{selectedPlan.features[0]}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-xl font-black text-[#a73918]">${selectedPlan.price}</span>
                        <span className="block text-[8px] text-gray-400 font-mono font-bold uppercase">USD total</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive input inputs */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 font-sans mb-1.5" htmlFor="checkout-name-input">
                        Nombre Completo del Alumno
                      </label>
                      <input
                        type="text"
                        id="checkout-name-input"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ej. James Miller"
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-sans text-sm text-gray-900 focus:outline-none focus:border-[#226D7A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 font-sans mb-1.5" htmlFor="checkout-email-input">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="checkout-email-input"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-sans text-sm text-gray-900 focus:outline-none focus:border-[#226D7A]"
                      />
                    </div>
                  </div>

                  {/* Security trust line */}
                  <div className="flex items-start gap-2 text-[10px] text-gray-400 leading-normal mb-6">
                    <Shield className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      Conexión encriptada de simulación de pago. No se realizará ningún cargo real a tu tarjeta de crédito o débito durante este test en AI Studio.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="w-1/3 py-3 border border-gray-200 rounded-xl font-sans text-xs font-bold text-gray-600 hover:bg-gray-50 text-center transition-all cursor-pointer"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 bg-[#a73918] hover:bg-[#862201] text-white rounded-xl font-sans text-xs font-black tracking-wide uppercase shadow-md shadow-[#a73918]/15 text-center transition-all cursor-pointer"
                      id="checkout-complete-btn"
                    >
                      Pagar e Inscribirme
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
