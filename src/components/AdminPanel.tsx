import React, { useState } from 'react';
import { Save, Plus, Trash2, Globe, Heart, BookOpen, HelpCircle, Sparkles, CheckCircle2, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Course, Tutor, FAQItem } from '../types';

interface SocialLink {
  name: string;
  url: string;
  visible: boolean;
}

interface AdminPanelProps {
  initialData: {
    logo: { text: string; subtitle: string; letter: string; bgColor: string; textColor: string };
    socialLinks: SocialLink[];
    hero: { title: string; subtitle: string; ctaText: string };
    tutors: Tutor[];
    courses: Course[];
    testimonials: any[];
    faqs: FAQItem[];
  };
  onSave: (newData: any) => Promise<boolean>;
}

export default function AdminPanel({ initialData, onSave }: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'logo' | 'socials' | 'hero' | 'tutors' | 'faqs'>('logo');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Logo config state
  const [logoText, setLogoText] = useState(initialData.logo.text);
  const [logoSubtitle, setLogoSubtitle] = useState(initialData.logo.subtitle);
  const [logoLetter, setLogoLetter] = useState(initialData.logo.letter);
  const [logoBgColor, setLogoBgColor] = useState(initialData.logo.bgColor);
  const [logoTextColor, setLogoTextColor] = useState(initialData.logo.textColor);

  // Social links state
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialData.socialLinks || []);

  // Hero state
  const [heroTitle, setHeroTitle] = useState(initialData.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(initialData.hero.subtitle);
  const [heroCtaText, setHeroCtaText] = useState(initialData.hero.ctaText);

  // Tutors list state
  const [tutors, setTutors] = useState<Tutor[]>(initialData.tutors || []);

  // FAQs list state
  const [faqs, setFaqs] = useState<FAQItem[]>(initialData.faqs || []);

  // Preset colors matching the website's curated palette
  const presetColors = [
    { name: 'Teal Agave', value: '#226D7A' },
    { name: 'Terracotta', value: '#a73918' },
    { name: 'Sky Cyan', value: '#B0E0E9' },
    { name: 'Chili Red', value: '#fe7952' },
    { name: 'Agave Dark', value: '#164A53' },
    { name: 'Charcoal', value: '#111c1d' }
  ];

  // Handling social link editing
  const handleSocialChange = (index: number, field: 'url' | 'visible', value: any) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  // Handling FAQs
  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleAddFAQ = () => {
    const newFaq: FAQItem = {
      id: `q-${Date.now()}`,
      question: '¿Nueva pregunta?',
      answer: 'Escribe aquí la respuesta...'
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleRemoveFAQ = (index: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== index));
  };

  // Handling Tutors
  const handleTutorChange = (index: number, field: keyof Tutor, value: any) => {
    const updated = [...tutors];
    updated[index] = { ...updated[index], [field]: value };
    setTutors(updated);
  };

  const handleAddTutor = () => {
    const newTutor: Tutor = {
      id: `tutor-${Date.now()}`,
      name: 'Nuevo Tutor',
      origin: 'CDMX, México',
      rating: 5.0,
      experience: '5 años exp.',
      specialties: ['Español de Supervivencia', 'Conversación Diaria'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      bio: 'Escribe aquí la biografía del nuevo tutor para motivar a los estudiantes nativos.',
      funFact: 'Un dato curioso divertido.',
      voiceSampleText: '¡Hola! Bienvenido a Espanishescool.',
      timeSlots: [
        { id: `slot-${Date.now()}-1`, day: 'Lunes', time: '09:00 AM', isAvailable: true },
        { id: `slot-${Date.now()}-2`, day: 'Miércoles', time: '11:00 AM', isAvailable: true }
      ]
    };
    setTutors([...tutors, newTutor]);
  };

  const handleRemoveTutor = (index: number) => {
    setTutors(tutors.filter((_, idx) => idx !== index));
  };

  // Save all fields
  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    const payload = {
      ...initialData,
      logo: {
        text: logoText,
        subtitle: logoSubtitle,
        letter: logoLetter,
        bgColor: logoBgColor,
        textColor: logoTextColor
      },
      socialLinks,
      hero: {
        title: heroTitle,
        subtitle: heroSubtitle,
        ctaText: heroCtaText
      },
      tutors,
      faqs
    };

    const success = await onSave(payload);
    setIsSaving(false);

    if (success) {
      setSaveMessage({ type: 'success', text: '¡Configuración guardada correctamente en Hostinger!' });
      setTimeout(() => setSaveMessage(null), 4000);
    } else {
      setSaveMessage({ type: 'error', text: 'Ocurrió un error al intentar escribir en db.json.' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150 p-6 lg:p-8 shadow-sm text-left">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="font-sans text-xl font-black text-gray-900 leading-none">Panel de Administración Web</h2>
          <p className="text-[10px] text-gray-400 font-mono tracking-wider font-bold mt-1.5 uppercase">Módulo de Configuración Dinámica</p>
        </div>
        
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-xl bg-[#226D7A] hover:bg-[#164A53] text-white px-5 py-3 font-sans text-xs font-black uppercase tracking-wide shadow-md transition-all disabled:opacity-60 cursor-pointer"
        >
          {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Save Message Banner */}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-2xl flex items-start gap-3 border animate-fadeIn ${
          saveMessage.type === 'success' ? 'bg-emerald-50 border-emerald-250 text-emerald-800' : 'bg-red-50 border-red-250 text-red-800'
        }`}>
          {saveMessage.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
          <p className="font-sans text-xs font-bold leading-normal">{saveMessage.text}</p>
        </div>
      )}

      {/* Inner split: Left Sidebar Nav, Right content container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="md:col-span-3 space-y-1.5">
          <button
            onClick={() => setActiveSubTab('logo')}
            className={`w-full text-left px-4 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              activeSubTab === 'logo' ? 'bg-[#226D7A]/5 text-[#226D7A] border-l-4 border-[#226D7A]' : 'text-gray-650 hover:bg-gray-50'
            }`}
          >
            <span>Logo y Encabezado</span>
            <Sparkles className="h-4 w-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('socials')}
            className={`w-full text-left px-4 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              activeSubTab === 'socials' ? 'bg-[#226D7A]/5 text-[#226D7A] border-l-4 border-[#226D7A]' : 'text-gray-650 hover:bg-gray-50'
            }`}
          >
            <span>Redes Sociales</span>
            <Globe className="h-4 w-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('hero')}
            className={`w-full text-left px-4 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              activeSubTab === 'hero' ? 'bg-[#226D7A]/5 text-[#226D7A] border-l-4 border-[#226D7A]' : 'text-gray-650 hover:bg-gray-50'
            }`}
          >
            <span>Sección Hero</span>
            <Heart className="h-4 w-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('tutors')}
            className={`w-full text-left px-4 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              activeSubTab === 'tutors' ? 'bg-[#226D7A]/5 text-[#226D7A] border-l-4 border-[#226D7A]' : 'text-gray-650 hover:bg-gray-50'
            }`}
          >
            <span>Gestión de Tutores ({tutors.length})</span>
            <BookOpen className="h-4 w-4 opacity-70" />
          </button>

          <button
            onClick={() => setActiveSubTab('faqs')}
            className={`w-full text-left px-4 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              activeSubTab === 'faqs' ? 'bg-[#226D7A]/5 text-[#226D7A] border-l-4 border-[#226D7A]' : 'text-gray-650 hover:bg-gray-50'
            }`}
          >
            <span>Preguntas Frecuentes ({faqs.length})</span>
            <HelpCircle className="h-4 w-4 opacity-70" />
          </button>
        </div>

        {/* Content Box (9 cols) */}
        <div className="md:col-span-9 bg-gray-50/50 border border-gray-150 rounded-2xl p-5 lg:p-6 min-h-[380px]">
          
          {/* TAB 1: LOGO CONFIG */}
          {activeSubTab === 'logo' && (
            <div className="space-y-6">
              
              {/* Visual Live Logo Preview box */}
              <div className="bg-white border border-gray-150 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] text-gray-400 font-mono tracking-wider font-bold uppercase mb-2">Vista Previa del Logotipo</h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm font-sans text-xl font-extrabold"
                      style={{ backgroundColor: logoBgColor, color: logoTextColor }}
                    >
                      {logoLetter || 'E'}
                    </div>
                    <div className="text-left">
                      <span className="font-sans text-xl font-black tracking-tight" style={{ color: logoBgColor }}>
                        {logoText || 'LogoText'}
                      </span>
                      <span className="block text-[10px] font-mono leading-none tracking-widest text-[#a73918] uppercase">
                        {logoSubtitle || 'Sub'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono text-gray-400 italic">
                  Se actualiza en tiempo real
                </div>
              </div>

              {/* Input Forms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">Texto del Logo (Nombre Principal)</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-bold focus:outline-none focus:border-[#226D7A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">Subtítulo (Ej. Academia)</label>
                  <input
                    type="text"
                    value={logoSubtitle}
                    onChange={(e) => setLogoSubtitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 focus:outline-none focus:border-[#226D7A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">Letra del Ícono (1 ó 2 caracteres)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={logoLetter}
                    onChange={(e) => setLogoLetter(e.target.value)}
                    className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-mono text-center focus:outline-none focus:border-[#226D7A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">Color de Letra del Ícono</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={logoTextColor}
                      onChange={(e) => setLogoTextColor(e.target.value)}
                      className="h-10 w-12 rounded-xl border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={logoTextColor}
                      onChange={(e) => setLogoTextColor(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-mono text-center focus:outline-none focus:border-[#226D7A] transition-colors"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1.5">Color del Ícono / Tema de Marca</label>
                  <div className="flex gap-2 items-center mb-3">
                    <input
                      type="color"
                      value={logoBgColor}
                      onChange={(e) => setLogoBgColor(e.target.value)}
                      className="h-10 w-12 rounded-xl border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={logoBgColor}
                      onChange={(e) => setLogoBgColor(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-mono focus:outline-none focus:border-[#226D7A]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {presetColors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLogoBgColor(color.value)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[10px] font-bold hover:bg-gray-50 transition-colors"
                      >
                        <span className="h-3.5 w-3.5 rounded-md border border-gray-300" style={{ backgroundColor: color.value }} />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL MEDIA CONFIG */}
          {activeSubTab === 'socials' && (
            <div className="space-y-4">
              <p className="font-sans text-xs text-gray-500 mb-2 leading-relaxed">
                Configure los enlaces oficiales a sus redes sociales. Las redes activas con enlace se mostrarán de forma automática en el pie de página de la aplicación.
              </p>

              <div className="space-y-3.5">
                {socialLinks.map((link, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-xl border border-gray-150 text-xs">
                    <div className="w-24 font-bold text-gray-800 flex items-center gap-1.5 text-left shrink-0">
                      <span className="h-2 w-2 rounded-full bg-[#a73918]" />
                      {link.name}
                    </div>
                    
                    <input
                      type="text"
                      value={link.url}
                      placeholder={`Ej. https://${link.name.toLowerCase()}.com/espanishescool`}
                      onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-800 focus:outline-none focus:border-[#226D7A] transition-colors"
                    />

                    <label className="flex items-center gap-2 font-semibold text-gray-600 shrink-0 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={link.visible}
                        onChange={(e) => handleSocialChange(idx, 'visible', e.target.checked)}
                        className="rounded text-[#226D7A] focus:ring-[#226D7A] h-4 w-4"
                      />
                      <span>Visible</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HERO CONFIG */}
          {activeSubTab === 'hero' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Título del Hero (Headline Principal)</label>
                <textarea
                  rows={2}
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-bold focus:outline-none focus:border-[#226D7A] leading-normal"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Subtítulo Descriptivo (Sub-headline)</label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 focus:outline-none focus:border-[#226D7A] leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Texto del Botón Principal de Acción (CTA)</label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  className="w-full rounded-xl border border-gray-250 bg-white px-3.5 py-2.5 text-gray-800 font-bold focus:outline-none focus:border-[#226D7A]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: TUTORS CONFIG */}
          {activeSubTab === 'tutors' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs text-gray-500">Gestione la nómina de profesores activos en el panel estudiantil</span>
                <button
                  onClick={handleAddTutor}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Agregar Tutor
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {tutors.map((tutor, idx) => (
                  <div key={tutor.id} className="bg-white border border-gray-150 rounded-xl p-4 text-xs space-y-3.5 text-left relative">
                    <button
                      onClick={() => handleRemoveTutor(idx)}
                      className="absolute right-4 top-4 p-1.5 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar Tutor"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img src={tutor.avatar} alt={tutor.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={tutor.name}
                          onChange={(e) => handleTutorChange(idx, 'name', e.target.value)}
                          className="font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none focus:border-[#226D7A] bg-transparent text-sm w-44"
                        />
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={tutor.origin}
                            onChange={(e) => handleTutorChange(idx, 'origin', e.target.value)}
                            className="text-[10px] text-gray-500 focus:outline-none border-b border-transparent focus:border-[#226D7A] bg-transparent w-32"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <label className="block text-gray-400 font-semibold mb-0.5">Biografía Estudiantil</label>
                        <textarea
                          rows={2}
                          value={tutor.bio}
                          onChange={(e) => handleTutorChange(idx, 'bio', e.target.value)}
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-lg p-2 focus:outline-none focus:bg-white text-gray-700 leading-normal"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-semibold mb-0.5">Dato Curioso (Fun Fact)</label>
                        <textarea
                          rows={2}
                          value={tutor.funFact}
                          onChange={(e) => handleTutorChange(idx, 'funFact', e.target.value)}
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-lg p-2 focus:outline-none focus:bg-white text-gray-700 leading-normal"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 font-semibold mb-0.5">Imagen Avatar (URL)</label>
                        <input
                          type="text"
                          value={tutor.avatar}
                          onChange={(e) => handleTutorChange(idx, 'avatar', e.target.value)}
                          className="w-full border border-gray-200 bg-gray-50/50 rounded-lg px-2.5 py-1.5 focus:outline-none focus:bg-white text-gray-700 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS CONFIG */}
          {activeSubTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs text-gray-500">Administre el cajón de preguntas y respuestas informativas del sitio</span>
                <button
                  onClick={handleAddFAQ}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Agregar Pregunta
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {faqs.map((faq, index) => (
                  <div key={faq.id} className="bg-white border border-gray-150 rounded-xl p-4 text-xs relative space-y-2">
                    <button
                      onClick={() => handleRemoveFAQ(index)}
                      className="absolute right-4 top-4 p-1.5 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar Pregunta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="w-[85%]">
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">Pregunta</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-900 font-bold focus:outline-none focus:border-[#226D7A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">Respuesta</label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-700 focus:outline-none focus:border-[#226D7A] transition-colors leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
