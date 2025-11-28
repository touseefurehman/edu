'use client';
import { useEffect } from 'react';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide public navigation on teacher pages
    const publicNav = document.querySelector('.public-nav');
    if (publicNav) {
      (publicNav as HTMLElement).style.display = 'none';
    }

    // Cleanup: Show navigation again when leaving teacher pages
    return () => {
      if (publicNav) {
        (publicNav as HTMLElement).style.display = 'block';
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Teacher-specific header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900">EduPlatform</div>
              <nav className="ml-8 flex space-x-4">
                <a href="/teacher/dashboard" className="text-gray-500 hover:text-gray-700 font-medium">Dashboard</a>
                <a href="/teacher/analytics" className="text-gray-500 hover:text-gray-700 font-medium">Analytics</a>
                <a href="/teacher/create-lesson" className="text-gray-500 hover:text-gray-700 font-medium">Create Lesson</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">Dr. Smith</div>
              <a 
                href="/teacher/login"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}