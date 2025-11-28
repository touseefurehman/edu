import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduPlatform - Modern Learning',
  description: 'Next-generation education platform with AI integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Public Navigation - Teacher layout will override this */}
        <nav className="glass-nav sticky top-0 z-50 public-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduPlatform
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a href="/teacher/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Teacher Login
                </a>
                <a href="/student" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Student Portal
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}