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
import AuthModal from './components/AuthModal';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

import { ActiveTab, BookedLesson, Tutor, Testimonial, User } from './types';
import { tutorsData, defaultTestimonials } from './data/tutors';
import { Sparkles, ArrowRight, Sun, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  
  // Dynamic Site Config State
  const [siteData, setSiteData] = useState<any>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState<boolean>(true);

  // Student Context State (Guest Fallbacks)
  const [studentName, setStudentName] = useState<string>('James Miller');
  const [studentEmail, setStudentEmail] = useState<string>('james.miller@gmail.com');
  const [credits, setCredits] = useState<number>(10);
  const [placementTestLevel, setPlacementTestLevel] = useState<string>(
    'Sin clasificar. ¡Toma el examen de colocación hoy!'
  );

  // Computed Properties
  const currentStudentName = currentUser ? currentUser.name : studentName;
  const currentStudentEmail = currentUser ? currentUser.email : studentEmail;
  const currentCredits = currentUser ? currentUser.credits : credits;
  const currentPlacementLevel = currentUser ? currentUser.placementLevel : placementTestLevel;

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
    if (savedBookings) setBookedLessons(JSON.parse(savedBookings));
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

    const savedUser = localStorage.getItem('espanish_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      const savedCredits = localStorage.getItem('espanish_credits');
      const savedLevel = localStorage.getItem('espanish_level');
      const savedName = localStorage.getItem('espanish_name');
      const savedEmail = localStorage.getItem('espanish_email');

      if (savedCredits) setCredits(Number(savedCredits));
      if (savedLevel) setPlacementTestLevel(savedLevel);
      if (savedName) setStudentName(savedName);
      if (savedEmail) setStudentEmail(savedEmail);
    }
  }, []);

  const saveBookingsState = (newBookings: BookedLesson[]) => {
    setBookedLessons(newBookings);
    localStorage.setItem('espanish_bookings', JSON.stringify(newBookings));
  };

  const updateCurrentUserFields = async (fields: Partial<User>) => {
    if (!currentUser) {
      // Guest local updates
      if (fields.credits !== undefined) {
        setCredits(fields.credits);
        localStorage.setItem('espanish_credits', String(fields.credits));
      }
      if (fields.placementLevel !== undefined) {
        setPlacementTestLevel(fields.placementLevel);
        localStorage.setItem('espanish_level', fields.placementLevel);
      }
      if (fields.name !== undefined) {
        setStudentName(fields.name);
        localStorage.setItem('espanish_name', fields.name);
      }
      if (fields.email !== undefined) {
        setStudentEmail(fields.email);
        localStorage.setItem('espanish_email', fields.email);
      }
      return;
    }

    try {
      const res = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentUser.id,
          ...fields
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('espanish_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Error updating user profile:", err);
    }
  };

  const handleBookLesson = (booking: BookedLesson) => {
    const updated = [...bookedLessons, booking];
    saveBookingsState(updated);
    
    // Deduct credits if regular class was selected
    if (booking.lessonType === 'Regular' && currentCredits > 0) {
      updateCurrentUserFields({ credits: currentCredits - 1 });
    }

    // Auto update user name context if not registered and guest
    if (!currentUser && !localStorage.getItem('espanish_name') && booking.studentName) {
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
    updateCurrentUserFields({ credits: currentCredits + creditsGranted });
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

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('espanish_user', JSON.stringify(user));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('espanish_user');
    setActiveTab('home');
  };

  // Safe fallback configuration values
  const logoConfig = siteData?.logo || {
    text: "Espanishescool",
    subtitle: "Academia",
    letter: "E",
    bgColor: "#226D7A",
    textColor: "#FFFFFF",
    imageUrl: ""
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
        isLoggedIn={!!currentUser}
        setIsLoggedIn={(login) => {
          if (login) {
            setIsAuthModalOpen(true);
          } else {
            handleLogout();
          }
        }}
        studentName={currentStudentName}
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
            loggedIn={!!currentUser}
            onBookLesson={handleBookLesson}
            credits={currentCredits}
          />
        )}

        {activeTab === 'pricing' && <PlanesCostos onPurchaseComplete={handlePurchaseComplete} />}

        {activeTab === 'culture' && <CultureTab />}

        {activeTab === 'dashboard' && (
          <Dashboard
            studentName={currentStudentName}
            setStudentName={(name) => {
              updateCurrentUserFields({ name });
            }}
            studentEmail={currentStudentEmail}
            setStudentEmail={(email) => {
              updateCurrentUserFields({ email });
            }}
            bookedLessons={bookedLessons}
            onCancelLesson={handleCancelLesson}
            credits={currentCredits}
            onGrantCredits={(amount) => {
              updateCurrentUserFields({ credits: currentCredits + amount });
            }}
            placementTestLevel={currentPlacementLevel}
            setPlacementTestLevel={(lvl) => {
              updateCurrentUserFields({ placementLevel: lvl });
            }}
          />
        )}

        {activeTab === 'admin' && (
          <div className="mx-auto max-w-7xl px-6 py-10">
            {!isAdminAuthenticated ? (
              <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
            ) : (
              <AdminPanel
                initialData={siteData || {
                  logo: logoConfig,
                  socialLinks: socialLinksConfig,
                  hero: heroConfig,
                  tutors: tutorsConfig,
                  courses: coursesConfig,
                  testimonials: testimonials,
                  faqs: faqsConfig
                }}
                onSave={handleSaveSiteData}
              />
            )}
          </div>
        )}

      </main>

      {/* Branded Footer */}
      <Footer 
        onNavigation={setActiveTab} 
        logo={logoConfig}
        socialLinks={socialLinksConfig}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
