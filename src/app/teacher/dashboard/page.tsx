'use client';
import { useState } from 'react';
import { Lesson } from '@/lib/types';

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Math',
    level: 'high_school',
    description: 'Learn basic algebraic concepts and equations',
    videoUrl: '/videos/algebra-intro.mp4',
    documentUrl: '/docs/algebra-notes.pdf',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Turkish Grammar Basics',
    subject: 'Turkish',
    level: 'primary',
    description: 'Fundamental Turkish language rules',
    videoUrl: '/videos/turkish-grammar.mp4',
    documentUrl: '/docs/turkish-notes.pdf',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Constitutional Law Principles',
    subject: 'Law',
    level: 'university',
    description: 'Understanding constitutional law foundation',
    videoUrl: '/videos/law-principles.mp4',
    documentUrl: '/docs/law-notes.pdf',
    createdAt: '2024-01-12'
  }
];

const mockStats = {
  totalStudents: 124,
  totalLessons: 15,
  activeCourses: 8,
  completionRate: '87%'
};

const mockComments = [
  { id: 1, student: 'Ahmet Yılmaz', lesson: 'Introduction to Algebra', comment: 'Great explanation!', date: '2 hours ago' },
  { id: 2, student: 'Mehmet Demir', lesson: 'Turkish Grammar Basics', comment: 'Could you explain this part again?', date: '1 day ago' },
  { id: 3, student: 'Ayşe Kaya', lesson: 'Constitutional Law', comment: 'Very helpful lecture, thank you!', date: '2 days ago' }
];

export default function TeacherDashboard() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeleteLesson = (lessonId: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    setShowDeleteConfirm(null);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
  };

  const handleSaveEdit = (updatedLesson: Lesson) => {
    setLessons(lessons.map(lesson => 
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    ));
    setEditingLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Manage your courses and track student progress</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">👨‍🎓</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{mockStats.totalStudents}</div>
                    <div className="text-gray-600 text-sm">Total Students</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📚</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{mockStats.totalLessons}</div>
                    <div className="text-gray-600 text-sm">Total Lessons</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{mockStats.activeCourses}</div>
                    <div className="text-gray-600 text-sm">Active Courses</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-orange-600 text-xl">📈</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{mockStats.completionRate}</div>
                    <div className="text-gray-600 text-sm">Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="/teacher/create-lesson"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600">➕</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Create New Lesson</div>
                      <div className="text-sm text-gray-600">Upload video and materials</div>
                    </div>
                  </a>
                  
                  <a 
                    href="/teacher/analytics"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600">📊</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">View Analytics</div>
                      <div className="text-sm text-gray-600">Student progress and engagement</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Recent Comments */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h3>
                <div className="space-y-4">
                  {mockComments.slice(0, 2).map(comment => (
                    <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-gray-900">{comment.student}</div>
                        <div className="text-xs text-gray-500">{comment.date}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{comment.lesson}</div>
                      <div className="text-gray-700">{comment.comment}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lessons Management */}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Lessons</h1>
                <p className="text-gray-600">Manage and edit your course content</p>
              </div>
              <a 
                href="/teacher/create-lesson"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create New Lesson
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lesson Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lessons.map((lesson) => (
                      <tr key={lesson.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{lesson.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {lesson.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {lesson.level.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lesson.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEditLesson(lesson)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(lesson.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                          <a 
                            href={`/student/lessons/${lesson.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Preview
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Comments Management */}
        {activeTab === 'comments' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Student Comments</h1>
              <p className="text-gray-600">Manage and respond to student feedback</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-6">
                  {mockComments.map(comment => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-gray-900">{comment.student}</div>
                          <div className="text-sm text-gray-600">{comment.lesson}</div>
                        </div>
                        <div className="text-xs text-gray-500">{comment.date}</div>
                      </div>
                      <div className="text-gray-700 mb-4">{comment.comment}</div>
                      <div className="flex space-x-3">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Reply
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                          Mark as Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lesson Modal */}
        {editingLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Lesson</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={editingLesson.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    defaultValue={editingLesson.description}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingLesson(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(editingLesson)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2">Delete Lesson</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to delete this lesson? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteLesson(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}