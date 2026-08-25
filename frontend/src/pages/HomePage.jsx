import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Zap, Users, FileText, Flame } from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalMatches: 150,
    liveMatches: 3,
    totalPlayers: 500,
    totalNews: 2400
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/health`);
      console.log('API Connected:', response.data);
      setLoading(false);
    } catch (error) {
      console.log('API not available yet');
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">🏏 CricSphere</h1>
        <p className="text-xl text-gray-300 mb-8">Your Ultimate Cricket Platform</p>
        <p className="text-gray-400">Live Scores • Player Stats • News & Analysis</p>
      </div>
      
      {/* Stats Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
        {/* Total Matches */}
        <div className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600">
          <Flame className="mx-auto mb-2 text-orange-500" size={32} />
          <p className="text-gray-300">Total Matches</p>
          <p className="text-3xl font-bold">{stats.totalMatches}</p>
        </div>
        
        {/* Live Matches */}
        <div className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600">
          <Zap className="mx-auto mb-2 text-red-500" size={32} />
          <p className="text-gray-300">Live Now</p>
          <p className="text-3xl font-bold text-red-400">{stats.liveMatches}</p>
        </div>
        
        {/* Players */}
        <div className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600">
          <Users className="mx-auto mb-2 text-blue-500" size={32} />
          <p className="text-gray-300">Players</p>
          <p className="text-3xl font-bold">{stats.totalPlayers}</p>
        </div>
        
        {/* News */}
        <div className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600">
          <FileText className="mx-auto mb-2 text-green-500" size={32} />
          <p className="text-gray-300">News Articles</p>
          <p className="text-3xl font-bold">{stats.totalNews}</p>
        </div>
      </div>
      
      {/* Featured Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Live Scores</h3>
            <p className="text-gray-300">Watch all cricket matches live</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Player Stats</h3>
            <p className="text-gray-300">Detailed player statistics</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Latest News</h3>
            <p className="text-gray-300">Cricket news and updates</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 text-center py-8 mt-12 border-t border-gray-700">
        <p className="text-gray-400">CricSphere © 2024 | Your Cricket Companion</p>
      </div>
    </div>
  );
}
