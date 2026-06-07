import { Tutor } from '../types';

export const tutorsData: Tutor[] = [
  {
    id: 't1',
    name: 'Elena R.',
    origin: 'CDMX, México',
    rating: 5.0,
    experience: '10+ años exp.',
    specialties: ['Español Conversacional', 'Doble Sentido y Comedia', 'Preparación DELE', 'Español de Negocios'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: '¡Hola! Soy Elena, pedagoga egresada de la UNAM. Llevo más de una década enseñando a estudiantes de más de 45 países. Adoro platicar sobre la historia secreta de los barrios de la Ciudad de México, el cine de oro mexicano y la literatura latinoamericana. ¡Aprenderás con risas y paciencia!',
    funFact: 'Tengo una colección de más de 120 cactus diferentes en mi balcón en Coyoacán.',
    voiceSampleText: '¡Hola! Bienvenidos a Espanishescool. Soy Elena y me encantaría ser tu guía en esta aventura por el idioma español. ¡Te espero pronto en clase!',
    timeSlots: [
      { id: 't1-s1', day: 'Lunes', time: '09:00 AM', isAvailable: true },
      { id: 't1-s2', day: 'Lunes', time: '11:00 AM', isAvailable: true },
      { id: 't1-s3', day: 'Martes', time: '01:00 PM', isAvailable: false },
      { id: 't1-s4', day: 'Martes', time: '04:00 PM', isAvailable: true },
      { id: 't1-s5', day: 'Miércoles', time: '10:00 AM', isAvailable: true },
      { id: 't1-s6', day: 'Miércoles', time: '02:00 PM', isAvailable: true },
      { id: 't1-s7', day: 'Jueves', time: '09:00 AM', isAvailable: true },
      { id: 't1-s8', day: 'Viernes', time: '11:00 AM', isAvailable: true },
    ]
  },
  {
    id: 't2',
    name: 'Mateo S.',
    origin: 'Guadalajara, Jal.',
    rating: 4.9,
    experience: '7 años exp.',
    specialties: ['Español de Supervivencia', 'Pronunciación Acertada', 'Cultura de Jalisco', 'Niños y Jóvenes'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    bio: '¡Qué onda! Soy Mateo. Nací rodeado de mariachis, tequila y una rica calidez cultural. Me enfoco en metodologías sumamente visuales e interactivas. Conmigo dominarás la pronunciación del acento mexicano rápidamente y hablarás de forma relajada y segura.',
    funFact: 'Toco el violín en una banda local de mariachi acústico fusión los fines de semana.',
    voiceSampleText: '¿Qué tal? ¿Cómo estás? Soy Mateo, de Guadalajara. Conmigo vas a platicar de forma súper natural. ¡Agenda tu clase de prueba!',
    timeSlots: [
      { id: 't2-s1', day: 'Lunes', time: '10:00 AM', isAvailable: true },
      { id: 't2-s2', day: 'Martes', time: '03:00 PM', isAvailable: true },
      { id: 't2-s3', day: 'Miércoles', time: '11:00 AM', isAvailable: true },
      { id: 't2-s4', day: 'Miércoles', time: '05:00 PM', isAvailable: false },
      { id: 't2-s5', day: 'Jueves', time: '01:00 PM', isAvailable: true },
      { id: 't2-s6', day: 'Viernes', time: '09:00 AM', isAvailable: true },
    ]
  },
  {
    id: 't3',
    name: 'Isabella V.',
    origin: 'Monterrey, N.L.',
    rating: 4.9,
    experience: '6 años exp.',
    specialties: ['Español Comercial', 'Entrevistas de Trabajo', 'Jerga Corporativa', 'Preparación Universitaria'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    bio: '¡Hola! Soy Isabella. Me especializo en preparar a estudiantes de todo el mundo para ingresar al mercado laboral de habla hispana. Mis clases son dinámicas, estructuradas y con un alto nivel de exigencia profesional, siempre con el inigualable toque amigable del norte mexicano.',
    funFact: 'He corrido 3 maratones internacionales completos y soy fanática de los asados norteños.',
    voiceSampleText: 'Hola, un gusto saludarte. Soy Isabella, experta en español para negocios y propósitos corporativos. ¡Llevemos tu carrera al siguiente nivel!',
    timeSlots: [
      { id: 't3-s1', day: 'Lunes', time: '08:00 AM', isAvailable: true },
      { id: 't3-s2', day: 'Lunes', time: '02:00 PM', isAvailable: true },
      { id: 't3-s3', day: 'Martes', time: '10:00 AM', isAvailable: true },
      { id: 't3-s4', day: 'Jueves', time: '04:00 PM', isAvailable: true },
      { id: 't3-s5', day: 'Viernes', time: '03:00 PM', isAvailable: true },
    ]
  },
  {
    id: 't4',
    name: 'Sofía M.',
    origin: 'Oaxaca, Oax.',
    rating: 5.0,
    experience: '9 años exp.',
    specialties: ['Gastronomía y Vocabulario', 'Historia e Indigenismo', 'Expresión Escrita', 'Artes Tradicionales'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: '¡Bienvenidos! Soy Sofía. Oaxaca es mi cuna, famosa mundialmente por el mezcal, el mole y las artesanías maravillosas. En mis clases combinamos la adquisición lingüística sólida con recetas tradicionales e historia del arte prehispánico.',
    funFact: 'Mi familia produce chocolate artesanal oaxaqueño desde hace cuatro generaciones.',
    voiceSampleText: '¡Hola a todos! Soy Sofía, apasionada de las letras y la herencia de Oaxaca. Descubrirás el español mediante el sabor y el arte tradicional.',
    timeSlots: [
      { id: 't4-s1', day: 'Martes', time: '09:00 AM', isAvailable: true },
      { id: 't4-s2', day: 'Martes', time: '11:00 AM', isAvailable: true },
      { id: 't4-s3', day: 'Miércoles', time: '04:00 PM', isAvailable: true },
      { id: 't4-s4', day: 'Jueves', time: '09:00 AM', isAvailable: true },
      { id: 't4-s5', day: 'Jueves', time: '02:00 PM', isAvailable: true },
      { id: 't4-s6', day: 'Viernes', time: '10:00 AM', isAvailable: true },
    ]
  }
];
export const defaultTestimonials = [
  {
    id: 'res-1',
    name: 'James Miller',
    country: 'EEUU',
    text: '"Las clases son increíbles. Mi tutor me enseñó no solo la gramática, sino cómo hablan realmente los jóvenes en CDMX. ¡Me siento muy seguro!"',
    rating: 5,
    avatarInitials: 'JD',
    avatarBgColor: 'bg-[#226D7A]'
  },
  {
    id: 'res-2',
    name: 'Sarah Klein',
    country: 'Alemania',
    text: '"Ideal para mi trabajo. Me ayudaron a preparar una presentación en español para mi equipo en México en solo dos semanas. ¡Gran profesionalismo!"',
    rating: 5,
    avatarInitials: 'SK',
    avatarBgColor: 'bg-[#a73918]'
  },
  {
    id: 'res-3',
    name: 'Akiko Matsu',
    country: 'Japón',
    text: '"Me encanta la flexibilidad. Puedo tomar mis clases a las 7 AM antes de ir a la oficina. Los materiales son muy divertidos y dinámicos."',
    rating: 5,
    avatarInitials: 'AM',
    avatarBgColor: 'bg-[#664600]'
  }
];
