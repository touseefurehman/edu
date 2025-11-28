'use client';
import { useState } from 'react';

// Mock data for analytics
const analyticsData = {
  overview: {
    totalStudents: 124,
    activeStudents: 89,
    totalLessons: 15,
    totalHours: 42,
    completionRate: 87,
    avgRating: 4.8
  },
  engagement: {
    daily: [65, 59, 80, 81, 56, 55, 40, 72, 68, 75, 82, 90],
    weekly: [420, 380, 450, 520, 480, 510, 490],
    monthly: [1800, 2100, 1900, 2200, 2400, 2300]
  },
  lessons: [
    { id: 1, title: 'Introduction to Algebra', views: 1245, completion: 92, avgTime: '18:24', rating: 4.9 },
    { id: 2, title: 'Turkish Grammar Basics', views: 987, completion: 88, avgTime: '22:15', rating: 4.7 },
    { id: 3, title: 'Constitutional Law', views: 756, completion: 85, avgTime: '25:42', rating: 4.8 },
    { id: 4, title: 'Physics Fundamentals', views: 654, completion: 79, avgTime: '20:18', rating: 4.6 },
    { id: 5, title: 'Chemistry Reactions', views: 543, completion: 82, avgTime: '19:55', rating: 4.5 }
  ],
  students: [
    { id: 1, name: 'Ahmet Yılmaz', progress: 95, lastActive: '2 hours ago', lessonsCompleted: 12 },
    { id: 2, name: 'Mehmet Demir', progress: 87, lastActive: '1 day ago', lessonsCompleted: 10 },
    { id: 3, name: 'Ayşe Kaya', progress: 92, lastActive: '5 hours ago', lessonsCompleted: 11 },
    { id: 4, name: 'Fatma Şahin', progress: 78, lastActive: '3 days ago', lessonsCompleted: 8 },
    { id: 5, name: 'Mustafa Öztürk', progress: 85, lastActive: '1 day ago', lessonsCompleted: 9 }
  ],
  ratings: [
    { rating: 5, count: 45, percentage: 75 },
    { rating: 4, count: 12, percentage: 20 },
    { rating: 3, count: 2, percentage: 3 },
    { rating: 2, count: 1, percentage: 2 },
    { rating: 1, count: 0, percentage: 0 }
  ]
};

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' }
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Simple bar chart component
  const BarChart = ({ data, color = 'blue', height = 100 }: { data: number[], color?: string, height?: number }) => {
    const max = Math.max(...data);
    return (
      <div className="flex items-end justify-between space-x-1" style={{ height: `${height}px` }}>
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-full bg-${color}-500 rounded-t transition-all duration-500 hover:opacity-80`}
              style={{ height: `${(value / max) * 80}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">{index + 1}</div>
          </div>
        ))}
      </div>
    );
  };

  // Progress bar component
  const ProgressBar = ({ value, color = 'blue' }: { value: number, color?: string }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  // Rating stars component
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating})</span>
    </div>
  );

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
                <a href="/teacher/analytics" className="text-blue-600 font-medium">Analytics</a>
                <a href="/teacher/create-lesson" className="text-gray-500 hover:text-gray-700 font-medium">Create Lesson</a>
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

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header with Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your teaching performance and student engagement</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'engagement', label: 'Engagement', icon: '👥' },
            { id: 'lessons', label: 'Lesson Analytics', icon: '📚' },
            { id: 'students', label: 'Student Progress', icon: '🎓' },
            { id: 'ratings', label: 'Ratings', icon: '⭐' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Students', value: analyticsData.overview.totalStudents, change: '+12%', icon: '👨‍🎓', color: 'blue' },
                { label: 'Active Students', value: analyticsData.overview.activeStudents, change: '+8%', icon: '🔥', color: 'green' },
                { label: 'Total Lessons', value: analyticsData.overview.totalLessons, change: '+3', icon: '📚', color: 'purple' },
                { label: 'Total Hours', value: analyticsData.overview.totalHours, change: '+5h', icon: '⏱️', color: 'orange' },
                { label: 'Completion Rate', value: `${analyticsData.overview.completionRate}%`, change: '+4%', icon: '✅', color: 'teal' },
                { label: 'Average Rating', value: analyticsData.overview.avgRating, change: '+0.2', icon: '⭐', color: 'yellow' }
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                      <span className="text-xl">{metric.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Engagement Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h3>
                <BarChart data={analyticsData.engagement.weekly} color="blue" height={120} />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Completion Rate */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Completion</h3>
                <div className="space-y-4">
                  {analyticsData.lessons.slice(0, 3).map(lesson => (
                    <div key={lesson.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{lesson.title}</span>
                        <span className="text-gray-600">{lesson.completion}%</span>
                      </div>
                      <ProgressBar value={lesson.completion} color="green" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === 'engagement' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Engagement</h3>
                <BarChart data={analyticsData.engagement.daily} color="green" height={150} />
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                <BarChart data={analyticsData.engagement.monthly} color="purple" height={150} />
              </div>
            </div>
          </div>
        )}

        {/* Lessons Analytics Tab */}
        {activeTab === 'lessons' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lesson Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.lessons.map(lesson => (
                    <tr key={lesson.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lesson.views.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProgressBar value={lesson.completion} color="blue" />
                          <span className="ml-2 text-sm text-gray-600">{lesson.completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lesson.avgTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RatingStars rating={lesson.rating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Student Progress Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons Completed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ProgressBar value={student.progress} color="green" />
                          <span className="ml-2 text-sm text-gray-600">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.lessonsCompleted} / {analyticsData.overview.totalLessons}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {analyticsData.ratings.map(rating => (
                  <div key={rating.rating} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RatingStars rating={rating.rating} />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${rating.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{rating.count} reviews</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating</h3>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">{analyticsData.overview.avgRating}</div>
                <RatingStars rating={Math.round(analyticsData.overview.avgRating)} />
                <p className="text-gray-600 mt-2">Based on {analyticsData.ratings.reduce((sum, r) => sum + r.count, 0)} reviews</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}