import React, { useState, useEffect } from 'react';
import { BarChart3, Users, FileText, Zap } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMatches: 245,
    liveMatches: 5,
    totalUsers: 12450,
    totalNews: 3680,
    adminUsers: 8,
    recentMatches: [
      { id: 1, teams: 'India vs Australia', status: 'Live' },
      { id: 2, teams: 'Pakistan vs England', status: 'Completed' },
      { id: 3, teams: 'New Zealand vs South Africa', status: 'Upcoming' }
    ]
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's your platform overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Matches */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm">Total Matches</p>
                <p className="text-3xl font-bold">{stats.totalMatches}</p>
              </div>
              <Zap className="text-blue-200" size={24} />
            </div>
          </div>

          {/* Live Matches */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-200 text-sm">Live Matches</p>
                <p className="text-3xl font-bold">{stats.liveMatches}</p>
              </div>
              <Zap className="text-red-200" size={24} />
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="text-green-200" size={24} />
            </div>
          </div>

          {/* Total News */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-200 text-sm">News Articles</p>
                <p className="text-3xl font-bold">{stats.totalNews}</p>
              </div>
              <FileText className="text-purple-200" size={24} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-green-600 hover:bg-green-700 p-4 rounded font-bold transition">
                  + Add Match
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 p-4 rounded font-bold transition">
                  + Add Player
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded font-bold transition">
                  + Publish News
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 p-4 rounded font-bold transition">
                  📊 View Analytics
                </button>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
              <div className="space-y-3">
                {stats.recentMatches.map(match => (
                  <div key={match.id} className="flex justify-between items-center bg-gray-700 p-4 rounded hover:bg-gray-600">
                    <span className="font-bold">{match.teams}</span>
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      match.status === 'Live' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Admin Stats */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">System Stats</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Admin Users</span>
                  <span className="font-bold">{stats.adminUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Server Status</span>
                  <span className="text-green-400 font-bold">✓ Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Database</span>
                  <span className="text-green-400 font-bold">✓ Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Backup</span>
                  <span className="font-bold">Today</span>
                </div>
              </div>

              {/* Admin Link */}
              <div className="mt-6 pt-6 border-t border-gray-700 space-y-2">
                <a href="/admin/matches" className="block text-center bg-green-600 hover:bg-green-700 p-2 rounded font-bold transition">
                  Manage Matches
                </a>
                <a href="/admin/news" className="block text-center bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition">
                  Manage News
                </a>
                <a href="/admin/players" className="block text-center bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold transition">
                  Manage Players
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
