import { SlangCard, CultureBlog } from '../types';

export const slangCardsData: SlangCard[] = [
  {
    id: 's1',
    word: 'Chido',
    literalMeaning: 'No literal translation.',
    mexicanMeaning: 'Cool / Awesome / Great.',
    exampleSpanish: '¡Qué chido está el nuevo sitio web de Espanishescool!',
    exampleEnglish: 'How cool is Espanishescool\'s new website!',
    culturalNote: 'One of the most characteristic Mexican terms. It can describe objects, people, or situations.'
  },
  {
    id: 's2',
    word: 'Apapachar',
    literalMeaning: 'To brush or clean.',
    mexicanMeaning: 'To hug or caress with the soul.',
    exampleSpanish: 'Después de un largo viaje, mi familia me vino a apapachar.',
    exampleEnglish: 'After a long trip, my family came to hug me with their souls.',
    culturalNote: 'Originally from Nahuatl (patzloa). It is considered one of the most beautiful words in the Spanish language.'
  },
  {
    id: 's3',
    word: 'Buena onda',
    literalMeaning: 'Good wave.',
    mexicanMeaning: 'Friendly / Cool (person) / Good vibe.',
    exampleSpanish: 'El tutor de Guadalajara es súper buena onda, tiene mucha paciencia.',
    exampleEnglish: 'The tutor from Guadalajara is super friendly/cool, he is very patient.',
    culturalNote: 'Commonly used to describe people with great energy or friendly vibes.'
  },
  {
    id: 's4',
    word: 'Chamba',
    literalMeaning: 'A ditch / fluke.',
    mexicanMeaning: 'Work / Job.',
    exampleSpanish: 'Ojalá consiga una buena chamba en la Ciudad de México pronto.',
    exampleEnglish: 'I hope I get a good job in Mexico City soon.',
    culturalNote: 'Historically, Mexican guest workers traveled for "Chamber of Commerce" contracts in the US; they said they went to "la chamba".'
  },
  {
    id: 's5',
    word: 'Padre',
    literalMeaning: 'Father.',
    mexicanMeaning: 'Very good / Terrific / Fantastic.',
    exampleSpanish: '¡Qué padre estuvo tu clase de español hoy por Zoom!',
    exampleEnglish: 'How fantastic was your Spanish class today over Zoom!',
    culturalNote: 'To say something is "padre" or "súper padre" is very common in central Mexico.'
  },
  {
    id: 's6',
    word: 'Ahorita',
    literalMeaning: 'Right now (diminutive).',
    mexicanMeaning: 'Anytime from 5 seconds to next week, or maybe never.',
    exampleSpanish: '—¿Cuándo vas a estudiar tu tarea? —Ahorita lo hago, mamá.',
    exampleEnglish: '—When are you going to study your homework? —I will do it in a bit, mom.',
    culturalNote: 'A legendary Mexican sense of time. "Ahorita" does not promise immediate action, but rather polite postponement.'
  }
];

export const cultureBlogsData: CultureBlog[] = [
  {
    id: 'cb1',
    title: 'La Guía Definitiva del Taco: Etiqueta en la Taquería',
    category: 'Gastronomía',
    excerpt: '¿Cómo sostener un taco sin tirar el relleno? ¿Qué significa "con copia"? Conoce los modales esenciales de la comida callejera mexicana.',
    content: `Comer tacos en México es mucho más que alimentación: es un ritual sagrado con reglas implícitas que todo extranjero debe dominar.

1. **La postura del taco (La pinza):** Usa tus dedos pulgar, índice y medio para sostener el taco por la parte media superior, formando una pinza arqueada. Nunca comas con cubiertos.
2. **La inclinación de la cabeza:** En lugar de mover el taco horizontalmente, inclina tu cabeza en un ángulo aproximado de 45 grados. El taco viaja en diagonal directo a la boca para que el consomé ruede por el centro.
3. **¿Taco con copia?** En las taquerías tradicionales, escucharás la frase "con copia". Esto significa que te darán dos tortillas encimadas por taco. Es de sabios usar la segunda tortilla para recoger el relleno que se desborde del primero.
4. **La santa trilogía:** Cebolla, cilantro y la salsa de tu preferencia (¡siempre prueba primero si pica!).`,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400',
    readTime: '3 min de lectura'
  },
  {
    id: 'cb2',
    title: 'Día de Muertos: Más Allá de la Ofrenda',
    category: 'Tradición',
    excerpt: 'Descubre el profundo simbolismo de la flor de cempasúchil, el pan de muerto y por qué la muerte se celebra con música y color.',
    content: `El Día de Muertos (1 y 2 de noviembre) es la tradición mexicana más célebre a nivel global. Es un recordatorio de que los seres queridos nunca mueren si los seguimos recordando.

- **La Flor de Cempasúchil (Flor de veinte pétalos):** El color naranja brillante representa el sol y el aroma guía a las almas de regreso al altar familiar.
- **La Ofrenda de Muertos:** Es un banquete místico. Lleva agua para calmar la sed del espíritu viajero, sal para purificación, velas para alumbrar el camino y la comida predilecta de la persona fallecida.
- **Las Calabacitas y Calaveritas de Azúcar:** Añaden humor a lo inevitable y muestran que la muerte también puede ser dulce y festiva.`,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400',
    readTime: '5 min de lectura'
  },
  {
    id: 'cb3',
    title: 'La calidez mexicana en el idioma español',
    category: 'Lingüística',
    excerpt: '¿Por qué en México usamos tantos diminutivos? Entiende cómo las raíces prehispánicas moldearon una forma de hablar suave.',
    content: `En México, escucharás constantemente palabras como "cafecito", "ahorita", "un momentito", "rapidito". El uso excesivo del diminutivo ("-ito", "-ita") no solo denota pequeñez, sino sobre todo **afecto y cortesía**.

Este estilo proviene en gran parte del Nahuatl, donde el sufijo reverencial y afectivo "-tzin" suavizaba los comandos y jerarquías familiares. En lugar de decir "abre la puerta", el hablante mexicano prefiere decir "¿me abres la puertita, por favor?" para evitar sonar demandante o rudo. ¡Aprender español con tutores mexicanos es aprender el lenguaje del afecto!`,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400',
    readTime: '4 min de lectura'
  }
];
