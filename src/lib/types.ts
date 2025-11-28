export interface Lesson {
  id: string;
  title: string;
  subject: string;
  level: 'primary' | 'high_school' | 'university' | 'exam';
  description: string;
  videoUrl?: string;
  documentUrl?: string;
  createdAt: string;
}

export type Subject = 'Math' | 'Turkish' | 'Law' | 'Science' | 'History';