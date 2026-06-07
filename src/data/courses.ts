import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'principiante',
    level: 'A1 - A2',
    title: 'Español de Supervivencia',
    subtitle: 'Nivel Principiante',
    description: 'Aprende a presentarte, pedir en restaurantes, hacer preguntas básicas y moverte por México sin frustración.',
    image: 'https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&q=80&w=400',
    duration: '4 semanas (16 lecciones)',
    accentColor: '#B0E0E9', // Sky tint
    lessons: [
      { id: 'p1', title: 'Saludos y Cortesías Mexicanas', description: 'Cómo saludar con calidez y entender la cortesía local (despedidas, favores, gracias).', duration: '60 min', order: 1 },
      { id: 'p2', title: 'Explorando la Taquería', description: 'Vocabulario esencial de comida, cómo ordenar tacos, pedir la cuenta y expresar preferencias.', duration: '60 min', order: 2 },
      { id: 'p3', title: 'Direcciones en la Ciudad', description: 'Cómo preguntar el camino, orientarse en la CDMX y usar el transporte con confianza.', duration: '60 min', order: 3 },
      { id: 'p4', title: 'Números, Precios y Mercados', description: 'Regateo básico constructivo, leer precios y manejar transacciones en pesos mexicanos.', duration: '60 min', order: 4 },
    ],
    vocabulary: [
      { spanish: '¡Buenos días!', english: 'Good morning!', pronunciationHint: 'bwe-nos dee-as', exampleSpanish: '¡Buenos días! ¿Qué tal están?', exampleEnglish: 'Good morning! How are you all?' },
      { spanish: 'Por favor', english: 'Please', pronunciationHint: 'por fah-vor', exampleSpanish: 'Unos tacos al pastor, por favor.', exampleEnglish: 'Some tacos al pastor, please.' },
      { spanish: 'Muchas gracias', english: 'Thank you very much', pronunciationHint: 'moo-chas grah-syas', exampleSpanish: 'Muchas gracias por la comida estuvo riquísima.', exampleEnglish: 'Thank you very much for the food, it was delicious.' },
      { spanish: '¿Cuánto cuesta?', english: 'How much does it cost?', pronunciationHint: 'kwan-to kwes-tah', exampleSpanish: '¿Cuánto cuesta este sarape?', exampleEnglish: 'How much does this cloak cost?' },
      { spanish: 'La cuenta, por favor', english: 'The bill, please', pronunciationHint: 'lah kwen-tah por fah-vor', exampleSpanish: 'Mesero, ¿me trae la cuenta, por favor?', exampleEnglish: 'Waiter, will you bring me the bill, please?' },
      { spanish: 'Con permiso', english: 'Excuse me (to pass)', pronunciationHint: 'kon per-mee-so', exampleSpanish: 'Con permiso, necesito pasar por aquí.', exampleEnglish: 'Excuse me, I need to pass through here.' }
    ],
    quiz: [
      {
        id: 'qp1',
        question: '¿Cómo pedirías amablemente la cuenta en un restaurante mexicano?',
        options: [
          '¡Oye, dame el costo!',
          'La cuenta, por favor.',
          'Pagaré ahora.',
          'Dame mis gastos.'
        ],
        correctAnswer: 'La cuenta, por favor.',
        explanation: '"La cuenta, por favor" es la frase más cortés y común para solicitar la cuenta al mesero en cualquier negocio de comida.'
      },
      {
        id: 'qp2',
        question: '¿Cuál es el significado de la palabra "Por favor"?',
        options: [
          'You are welcome',
          'Please',
          'Excuse me',
          'I am sorry'
        ],
        correctAnswer: 'Please',
        explanation: '"Por favor" se utiliza en español para expresar cortesía al pedir algo, equivalente a "Please" en inglés.'
      },
      {
        id: 'qp3',
        question: '¿Qué frase utilizas para pasar educadamente entre una multitud?',
        options: [
          '¡Muévete!',
          'Adiós amigos',
          'Con permiso',
          '¿Qué onda?'
        ],
        correctAnswer: 'Con permiso',
        explanation: '"Con permiso" es la expresión perfecta y respetuosa para pedir espacio para pasar o ingresar a un lugar.'
      }
    ]
  },
  {
    id: 'intermedio',
    level: 'B1 - B2',
    title: 'Español Conversacional Fluido',
    subtitle: 'Nivel Intermedio',
    description: 'Expresa opiniones, comprende la jerga cotidiana, cuenta historias en pasado y conéctate a nivel cultural profundo.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400',
    duration: '6 semanas (24 lecciones)',
    accentColor: '#F2A68D', // Terracotta light
    lessons: [
      { id: 'i1', title: 'Narrar Experiencias en Pasado', description: 'Aprende cuándo usar Pretérito Indefinido vs Imperfecto con historias cotidianas.', duration: '60 min', order: 1 },
      { id: 'i2', title: 'El Arte de Subjuntivo sin Pánico', description: 'Cómo expresar deseos, dudas, hipótesis y sentimientos de forma natural.', duration: '60 min', order: 2 },
      { id: 'i3', title: 'Modismos y Estilo Mexicano', description: 'Expresiones coloquiales auténticas como "buena onda", "chamba", "echar la mano".', duration: '60 min', order: 3 },
      { id: 'i4', title: 'Debatir Temas de Interés', description: 'Estructurar argumentos lógicos, opinar sobre noticias locales y eventos culturales.', duration: '60 min', order: 4 },
    ],
    vocabulary: [
      { spanish: 'Platicar', english: 'To chat / talk', pronunciationHint: 'plah-tee-kar', exampleSpanish: 'Me encanta platicar contigo por las tardes.', exampleEnglish: 'I love to chat with you in the afternoons.' },
      { spanish: 'Chamba', english: 'Work / Job', pronunciationHint: 'cham-bah', exampleSpanish: 'Tengo mucha chamba esta semana en la oficina.', exampleEnglish: 'I have a lot of work this week in the office.' },
      { spanish: 'Echar la mano', english: 'To give a hand / help', pronunciationHint: 'eh-char lah mah-no', exampleSpanish: '¿Me puedes echar la mano con este proyecto?', exampleEnglish: 'Can you give me a hand with this project?' },
      { spanish: 'Buena onda', english: 'Cool / Friendly vibe', pronunciationHint: 'bwe-nah on-dah', exampleSpanish: 'Tu tutor de español de la CDMX es súper buena onda.', exampleEnglish: 'Your Spanish tutor from CDMX is super cool/friendly.' },
      { spanish: 'Apapachar', english: 'To coddle / hug with the soul', pronunciationHint: 'ah-pah-pah-char', exampleSpanish: 'A mi abuela le gusta apapachar a sus nietos.', exampleEnglish: 'My grandmother likes to coddle/soul-hug her grandchildren.' }
    ],
    quiz: [
      {
        id: 'qi1',
        question: '¿Qué significa el mexicanismo colloquial "Chamba"?',
        options: [
          'Una fiesta ruidosa',
          'El trabajo o empleo',
          'Una bebida típica mexicana',
          'Un problema difícil'
        ],
        correctAnswer: 'El trabajo o empleo',
        explanation: 'En México, "chamba" es un término sumamente popular para referirse al empleo, trabajo o actividad laboral.'
      },
      {
        id: 'qi2',
        question: '¿Cómo invitarías a alguien a ayudarte con una frase coloquial?',
        options: [
          '¿Me echas la mano?',
          '¿Me muerdes el brazo?',
          '¿Me das un golpe?',
          '¿Me compras un refresco?'
        ],
        correctAnswer: '¿Me echas la mano?',
        explanation: '"Echar la mano" significa ayudar o brindar asistencia a alguien de manera solidaria.'
      }
    ]
  },
  {
    id: 'avanzado',
    level: 'C1 - C2',
    title: 'Español para Profesionales e Intérpretes',
    subtitle: 'Nivel Avanzado',
    description: 'Perfecto para quienes trabajan en entornos multinacionales, estudian literatura o necesitan dominar el registro formal intelectual.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400',
    duration: '8 semanas (32 lecciones)',
    accentColor: '#164A53', // Agave dark
    lessons: [
      { id: 'a1', title: 'Español Corporativo y Negociación', description: 'Redacción de correos formales, terminología de contratos y finanzas mexicanas.', duration: '60 min', order: 1 },
      { id: 'a2', title: 'Análisis Político y Social en México', description: 'Comprender debates de fondo, leer columnas periodísticas complejas y argumentar.', duration: '60 min', order: 2 },
      { id: 'a3', title: 'Doble sentido y Albur Metafórico', description: 'Dominar la sutileza de los contextos, la ironía mexicana y los modismos históricos.', duration: '60 min', order: 3 },
      { id: 'a4', title: 'Presentación Profesional de Impacto', description: 'Sustentar un discurso académico completo frente a una audiencia sin pausas vacilantes.', duration: '60 min', order: 4 },
    ],
    vocabulary: [
      { spanish: 'Asertividad', english: 'Assertiveness', pronunciationHint: 'ah-ser-tee-bee-dad', exampleSpanish: 'Es vital negociar con asertividad y tacto comercial.', exampleEnglish: 'It is vital to negotiate with assertiveness and commercial tact.' },
      { spanish: 'Desempeño', english: 'Performance', pronunciationHint: 'deh-sem-peh-nyoh', exampleSpanish: 'El desempeño del equipo superó las expectativas del trimestre.', exampleEnglish: 'The team\'s performance exceeded the quarters expectations.' },
      { spanish: 'Vanguardia', english: 'Vanguard / Cutting-edge', pronunciationHint: 'ban-gwar-dyah', exampleSpanish: 'Nuestra metodología de inmersión está en la vanguardia educativa.', exampleEnglish: 'Our immersion methodology is at the educational vanguard.' }
    ],
    quiz: [
      {
        id: 'qa1',
        question: '¿Qué palabra describe mejor el rendimiento o productividad de una persona en su trabajo en el registro corporativo?',
        options: [
          'El alboroto',
          'El desempeño',
          'La holgazanería',
          'La tardanza'
        ],
        correctAnswer: 'El desempeño',
        explanation: '"El desempeño" es el término formal por excelencia para designar el rendimiento laboral o profesional.'
      }
    ]
  }
];
