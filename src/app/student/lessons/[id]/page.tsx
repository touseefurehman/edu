'use client';
import { useState } from 'react';

const mockLesson = {
  id: '1',
  title: 'Introduction to Algebra',
  subject: 'Math',
  level: 'high_school',
  description: 'Learn basic algebraic concepts and equations. Perfect for beginners who want to understand the foundation of mathematics.',
  createdAt: '2024-01-15'
};

export default function LessonDetail({ params }: { params: { id: string } }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer(`This is a mock AI response about "${question}". In a real implementation, this would connect to GPT API. Lesson ID: ${params.id}`);
    setQuestion('');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{mockLesson.title}</h1>
        <div className="flex items-center space-x-4 mt-2">
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
            {mockLesson.subject}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {mockLesson.level.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Placeholder */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Lesson</h2>
            <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
              <p className="text-gray-500">Video Player Placeholder</p>
            </div>
          </div>

          {/* PDF Viewer Placeholder */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supporting Materials</h2>
            <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
              <p className="text-gray-500">PDF Viewer Placeholder</p>
            </div>
          </div>

          {/* Lesson Description */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Lesson</h2>
            <p className="text-gray-600">{mockLesson.description}</p>
          </div>
        </div>

        {/* AI Chat Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Learning Assistant</h2>
            
            <form onSubmit={handleAskAI} className="mb-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about this lesson..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ask AI
              </button>
            </form>

            {answer && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">AI Response:</h3>
                <p className="text-gray-600">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}