import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function LiveScores() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: 'India',
      team2: 'Australia',
      status: 'Live',
      score1: '145/3',
      score2: null,
      overs: '28.4',
      venue: 'MCG, Melbourne'
    },
    {
      id: 2,
      team1: 'Pakistan',
      team2: 'England',
      status: 'Live',
      score1: '189/5',
      score2: null,
      overs: '42.1',
      venue: 'Lord\'s, London'
    },
    {
      id: 3,
      team1: 'New Zealand',
      team2: 'South Africa',
      status: 'Upcoming',
      startDate: '2024-09-15 10:30',
      venue: 'Basin Reserve, Wellington'
    }
  ]);
  
  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="text-red-500" size={32} />
          <h1 className="text-4xl font-bold">Live Scores</h1>
        </div>
        
        <div className="grid gap-6">
          {matches.map(match => (
            <div key={match.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{match.team1} vs {match.team2}</h3>
                  <p className="text-gray-400">{match.venue}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded ${match.status === 'Live' ? 'bg-red-600' : 'bg-gray-600'}`}>
                    {match.status}
                  </span>
                </div>
              </div>
              
              {match.status === 'Live' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 mb-2">{match.team1}</p>
                    <p className="text-2xl font-bold">{match.score1}</p>
                    <p className="text-sm text-gray-400">{match.overs} overs</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded">
                    <p className="text-gray-400 mb-2">Chasing</p>
                    <p className="text-2xl font-bold">-</p>
                    <p className="text-sm text-gray-400">Batting</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Match starts: {match.startDate}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
