'use client';
import { useState } from 'react';
import { Lesson } from '@/lib/types';

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Math',
    level: 'high_school',
    description: 'Learn basic algebraic concepts and equations. Perfect for beginners.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Turkish Grammar Basics',
    subject: 'Turkish',
    level: 'primary',
    description: 'Fundamental Turkish language rules and sentence structures.',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Constitutional Law Principles',
    subject: 'Law',
    level: 'university',
    description: 'Understanding the foundation of constitutional law and civil rights.',
    createdAt: '2024-01-12'
  }
];

const subjects = ['Math', 'Turkish', 'Law', 'Science', 'History'];
const levels = ['primary', 'high_school', 'university', 'exam'];

export default function StudentLessons() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const filteredLessons = mockLessons.filter(lesson => {
    return (!selectedSubject || lesson.subject === selectedSubject) &&
           (!selectedLevel || lesson.level === selectedLevel);
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Lessons</h1>
        <p className="text-gray-600 mt-2">Browse and filter our course catalog</p>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>
                {level.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {lesson.subject}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {lesson.level.replace('_', ' ')}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {lesson.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {lesson.description}
              </p>
              
              <a 
                href={`/student/lessons/${lesson.id}`}
                className="w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors block"
              >
                Start Learning
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}