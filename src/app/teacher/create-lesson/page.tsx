'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const subjects = ['Math', 'Turkish', 'Law', 'Science', 'History', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography'];
const levels = [
  { value: 'primary', label: 'Primary School' },
  { value: 'middle_school', label: 'Middle School' },
  { value: 'high_school', label: 'High School' },
  { value: 'university', label: 'University' },
  { value: 'exam', label: 'Exam Preparation' }
];

export default function CreateLesson() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    level: '',
    description: '',
    video: null as File | null,
    document: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Lesson created:', formData);
    alert('Lesson created successfully!');
    router.push('/teacher/dashboard');
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'video' | 'document') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [field]: file }));

      // Create preview for video
      if (field === 'video' && file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      }

      // Show document name for PDF
      if (field === 'document' && file.type === 'application/pdf') {
        setDocumentPreview(file.name);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900">EduPlatform</div>
              <nav className="ml-8 flex space-x-4">
                <a href="/teacher/dashboard" className="text-gray-500 hover:text-gray-700 font-medium">Dashboard</a>
                <a href="/teacher/create-lesson" className="text-blue-600 font-medium">Create Lesson</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">Dr. Smith</div>
              <button
                onClick={() => window.location.href = '/teacher/login'}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Lesson</h1>
          <p className="text-gray-600 mt-2">Add a new lesson to your course catalog with video and supporting materials</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Introduction to Algebra, Turkish Grammar Basics"
                  />
                </div>

                {/* Subject and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      required
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select Level</option>
                      {levels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Describe what students will learn in this lesson, key topics covered, and learning objectives..."
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Lecture (MP4) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".mp4,.mov,.avi"
                      onChange={(e) => handleFileChange(e, 'video')}
                      className="hidden"
                      id="video-upload"
                      required
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 text-xl">🎥</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Click to upload video lecture
                      </div>
                      <div className="text-xs text-gray-500">
                        MP4, MOV, AVI up to 500MB
                      </div>
                    </label>
                  </div>
                  {videoPreview && (
                    <div className="mt-3">
                      <div className="text-sm text-green-600 mb-2">✓ Video selected</div>
                      <video 
                        src={videoPreview} 
                        controls 
                        className="w-full rounded-lg border border-gray-200 max-h-48"
                      />
                    </div>
                  )}
                </div>

                {/* Document Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Document (PDF)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'document')}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 text-xl">📄</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Click to upload document
                      </div>
                      <div className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 50MB
                      </div>
                    </label>
                  </div>
                  {documentPreview && (
                    <div className="mt-3">
                      <div className="text-sm text-green-600">✓ {documentPreview}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/teacher/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Lesson...
                  </>
                ) : (
                  <>
                    <span>Create Lesson</span>
                    <span>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Tips for creating great lessons:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Keep video lectures under 30 minutes for better engagement</li>
                <li>• Provide clear learning objectives in the description</li>
                <li>• Include practical examples and exercises</li>
                <li>• Use high-quality audio and video recording</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}