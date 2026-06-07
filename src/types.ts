export type ActiveTab = 'home' | 'courses' | 'tutors' | 'pricing' | 'culture' | 'dashboard' | 'admin';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
}

export interface Vocabulary {
  spanish: string;
  english: string;
  pronunciationHint: string;
  exampleSpanish: string;
  exampleEnglish: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Course {
  id: string;
  level: string; // A1, A2, etc.
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  quiz: QuizQuestion[];
  accentColor: string;
}

export interface TutorTimeSlot {
  day: string; // Monday, Tuesday, etc.
  time: string; // "10:00 AM", etc.
  isAvailable: boolean;
  id: string;
}

export interface Tutor {
  id: string;
  name: string;
  origin: string; // e.g. "CDMX, México"
  rating: number;
  experience: string; // "10+ years exp"
  specialties: string[];
  avatar: string;
  bio: string;
  funFact: string;
  timeSlots: TutorTimeSlot[];
  voiceSampleText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  text: string;
  rating: number;
  avatarInitials: string;
  avatarBgColor: string;
}

export interface BookedLesson {
  id: string;
  tutorId: string;
  tutorName: string;
  day: string;
  time: string;
  studentName: string;
  studentEmail: string;
  lessonType: 'Trial' | 'Regular';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SlangCard {
  id: string;
  word: string;
  literalMeaning: string;
  mexicanMeaning: string;
  exampleSpanish: string;
  exampleEnglish: string;
  culturalNote: string;
}

export interface CultureBlog {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  credits: number;
  placementLevel: string;
}
