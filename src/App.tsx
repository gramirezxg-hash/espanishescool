import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import PlanesCostos from './components/PlanesCostos';
import StudentReviews from './components/StudentReviews';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import CoursesTab from './components/CoursesTab';
import TutorsTab from './components/TutorsTab';
import CultureTab from './components/CultureTab';
import Dashboard from './components/Dashboard';

import { ActiveTab, BookedLesson, Tutor, Testimonial } from './types';
import { tutorsData, defaultTestimonials } from './data/tutors';
import { Sparkles, ArrowRight, Sun, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-logged in for elite prompt demonstration!
  
  // Dynamic Site Config State
  const [siteData, setSiteData] = useState<any>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState<boolean>(true);

  // Student Context State
  const [studentName, setStudentName] = useState<string>('James Miller');
  const [studentEmail, setStudentEmail] = useState<string>('james.miller@gmail.com');
  const [credits, setCredits] = useState<number>(10);
  const [placementTestLevel, setPlacementTestLevel] = useState<string>(
    'Sin clasificar. ¡Toma el examen de colocación hoy!'
  );

  // App Persistence arrays
  const [bookedLessons, setBookedLessons] = useState<BookedLesson[]>([
    {
      id: 'b-seed-1',
      tutorId: 't1',
      tutorName: 'Elena R.',
      day: 'Lunes',
      time: '09:00 AM',
      studentName: 'James Miller',
      studentEmail: 'james.miller@gmail.com',
      lessonType: 'Trial',
      createdAt: new Date().toISOString()
    }
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  // Load configuration from Express backend
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (json.success && json.data) {
          setSiteData(json.data);
          if (json.data.testimonials && json.data.testimonials.length > 0) {
            setTestimonials(json.data.testimonials);
          }
        }
      } catch (err) {
        console.error("Failed to load site data from Express backend:", err);
      } finally {
        setIsLoadingConfig(false);
      }
    };
    fetchSiteData();
  }, []);

  // Save updated configuration to Express backend
  const handleSaveSiteData = async (newData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const json = await res.json();
      if (json.success) {
        setSiteData(newData);
        if (newData.testimonials) {
          setTestimonials(newData.testimonials);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to save site data:", err);
      return false;
    }
  };

  // Sync state with localstorage if desired
  useEffect(() => {
    const savedBookings = localStorage.getItem('espanish_bookings');
    const savedTestimonials = localStorage.getItem('espanish_testimonials');
    const savedCredits = localStorage.getItem('espanish_credits');
    const savedLevel = localStorage.getItem('espanish_level');
    const savedName = localStorage.getItem('espanish_name');
    const savedEmail = localStorage.getItem('espanish_email');

    if (savedBookings) setBookedLessons(JSON.parse(savedBookings));
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
    if (savedCredits) setCredits(Number(savedCredits));
    if (savedLevel) setPlacementTestLevel(savedLevel);
    if (savedName) setStudentName(savedName);
    if (savedEmail) setStudentEmail(savedEmail);
  }, []);

  const saveBookingsState = (newBookings: BookedLesson[]) => {
    setBookedLessons(newBookings);
    localStorage.setItem('espanish_bookings', JSON.stringify(newBookings));
  };

  const handleBookLesson = (booking: BookedLesson) => {
    const updated = [...bookedLessons, booking];
    saveBookingsState(updated);
    
    // Deduct credits if regular class was selected
    if (booking.lessonType === 'Regular' && credits > 0) {
      const remainingCredits = credits - 1;
      setCredits(remainingCredits);
      localStorage.setItem('espanish_credits', String(remainingCredits));
    }

    // Auto update user name context if not registered
    if (!localStorage.getItem('espanish_name') && booking.studentName) {
      setStudentName(booking.studentName);
      setStudentEmail(booking.studentEmail);
      localStorage.setItem('espanish_name', booking.studentName);
      localStorage.setItem('espanish_email', booking.studentEmail);
    }
    
    setActiveTab('dashboard');
  };

  const handleCancelLesson = (id: string) => {
    const updated = bookedLessons.filter((b) => b.id !== id);
    saveBookingsState(updated);
  };

  const handlePurchaseComplete = (planName: string, creditsGranted: number) => {
    const nextCredits = credits + creditsGranted;
    setCredits(nextCredits);
    localStorage.setItem('espanish_credits', String(nextCredits));
    setActiveTab('dashboard');
  };

  const handleAddTestimonial = (review: Testimonial) => {
    const updated = [review, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('espanish_testimonials', JSON.stringify(updated));

    // Also sync to backend if config loaded
    if (siteData) {
      const updatedConfig = { ...siteData, testimonials: [review, ...(siteData.testimonials || [])] };
      handleSaveSiteData(updatedConfig);
    }
  };

  const updatePlacementLevelInLocalStorage = (lvl: string) => {
    setPlacementTestLevel(lvl);
    localStorage.setItem('espanish_level', lvl);
  };

  // Safe fallback configuration values
  const logoConfig = siteData?.logo || {
    text: "Espanishescool",
    subtitle: "Academia",
    letter: "E",
    bgColor: "#226D7A",
    textColor: "#FFFFFF"
  };

  const socialLinksConfig = siteData?.socialLinks || [
    { name: "Facebook", url: "https://facebook.com/espanishescool", visible: true },
    { name: "Instagram", url: "https://instagram.com/espanishescool", visible: true },
    { name: "Twitter", url: "https://twitter.com/espanishescool", visible: true },
    { name: "YouTube", url: "https://youtube.com/c/espanishescool", visible: false },
    { name: "TikTok", url: "https://tiktok.com/@espanishescool", visible: true },
    { name: "WhatsApp", url: "https://wa.me/523300000000", visible: true }
  ];

  const heroConfig = siteData?.hero || {
    title: "Aprende el español que realmente se habla en México",
    subtitle: "Domina el español con tutores nativos de México. Clases online 1-a-1 diseñadas para tu ritmo, nivel y objetivos específicos de viaje, negocios o conversación diaria.",
    ctaText: "Reserva tu Clase de Prueba Hoy"
  };

  const tutorsConfig = siteData?.tutors || tutorsData;
  const coursesConfig = siteData?.courses || [];
  const faqsConfig = siteData?.faqs || [];

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-gray-900 flex flex-col justify-between" id="app-viewport">
      
      {/* Universal Shared Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        studentName={studentName}
        logo={logoConfig}
      />

      {/* Main Dynamic Workspace Frame */}
      <main className="flex-grow">
        
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            
            {/* 1. Hero Showcase */}
            <Hero
              onBookClick={() => setActiveTab('tutors')}
              onProgramsClick={() => setActiveTab('courses')}
              hero={heroConfig}
            />

            {/* 2. Bento features, interactive Curriculums, availability calendars */}
            <BentoFeatures
              tutors={tutorsConfig}
              onBookTutor={(tutor) => {
                setActiveTab('tutors');
              }}
              onExplorePricing={() => setActiveTab('pricing')}
            />

            {/* 3. Pricing packages table list */}
            <PlanesCostos onPurchaseComplete={handlePurchaseComplete} />

            {/* 4. Student Reviews carousel & submission forms */}
            <StudentReviews
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
            />

            {/* 5. Frequently Asked collapsible Questions */}
            <FAQAccordion faqs={faqsConfig} />

            {/* 6. Soft Visual CTA bottom banner matches exact aesthetic design */}
            <section className="bg-white py-16 px-6 text-center border-t border-gray-100">
              <div className="max-w-3xl mx-auto">
                <span className="font-mono text-[9px] uppercase tracking-widest font-black leading-none bg-[#B0E0E9]/45 text-[#164A53] px-3 py-1 rounded-full">
                  Haz realidad tus sueños bilingües
                </span>
                
                <p className="font-sans text-xs text-gray-405 leading-relaxed mt-4 max-w-md mx-auto">
                  Tu primera clase de prueba es el primer paso hacia una conexión real con el mundo hispanohablante.
                </p>

                <div className="mt-8">
                  <button
                    onClick={() => setActiveTab('tutors')}
                    className="rounded-xl bg-[#a73918] hover:bg-[#862201] text-white px-8 py-4 font-sans text-sm font-black uppercase tracking-wider shadow-md shadow-[#a73918]/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                    id="bottom-call-to-action-btn"
                  >
                    Reserva tu Clase de Prueba Hoy
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {activeTab === 'courses' && <CoursesTab courses={coursesConfig} />}

        {activeTab === 'tutors' && (
          <TutorsTab
            tutors={tutorsConfig}
            loggedIn={isLoggedIn}
            onBookLesson={handleBookLesson}
            credits={credits}
          />
        )}

        {activeTab === 'pricing' && <PlanesCostos onPurchaseComplete={handlePurchaseComplete} />}

        {activeTab === 'culture' && <CultureTab />}

        {activeTab === 'dashboard' && (
          <Dashboard
            studentName={studentName}
            setStudentName={(name) => {
              setStudentName(name);
              localStorage.setItem('espanish_name', name);
            }}
            studentEmail={studentEmail}
            setStudentEmail={(email) => {
              setStudentEmail(email);
              localStorage.setItem('espanish_email', email);
            }}
            bookedLessons={bookedLessons}
            onCancelLesson={handleCancelLesson}
            credits={credits}
            onGrantCredits={(amount) => {
              const updated = credits + amount;
              setCredits(updated);
              localStorage.setItem('espanish_credits', String(updated));
            }}
            placementTestLevel={placementTestLevel}
            setPlacementTestLevel={updatePlacementLevelInLocalStorage}
            siteData={siteData}
            onSaveSiteData={handleSaveSiteData}
          />
        )}

      </main>

      {/* Branded Footer */}
      <Footer 
        onNavigation={setActiveTab} 
        logo={logoConfig}
        socialLinks={socialLinksConfig}
      />

    </div>
  );
}
