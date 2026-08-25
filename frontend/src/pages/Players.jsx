import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import axios from 'axios';

export default function Players() {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Virat Kohli',
      country: 'India',
      role: 'Batsman',
      jersey: 18,
      stats: {
        test: { matches: 105, runs: 8652, avg: 50.3 },
        odi: { matches: 274, runs: 13848, avg: 59.3 },
        t20: { matches: 115, runs: 3795, avg: 41.9 }
      }
    },
    {
      id: 2,
      name: 'Jasprit Bumrah',
      country: 'India',
      role: 'Bowler',
      jersey: 93,
      stats: {
        test: { matches: 35, wickets: 123, avg: 22.5 },
        odi: { matches: 94, wickets: 121, avg: 23.1 },
        t20: { matches: 63, wickets: 85, avg: 21.3 }
      }
    },
    {
      id: 3,
      name: 'Babar Azam',
      country: 'Pakistan',
      role: 'Batsman',
      jersey: 56,
      stats: {
        test: { matches: 58, runs: 4521, avg: 45.2 },
        odi: { matches: 132, runs: 6341, avg: 53.2 },
        t20: { matches: 89, runs: 2820, avg: 38.1 }
      }
    }
  ]);

  const [selectedFormat, setSelectedFormat] = useState('odi');

  const getRoleColor = (role) => {
    if (role === 'Batsman') return 'bg-blue-600';
    if (role === 'Bowler') return 'bg-red-600';
    return 'bg-green-600';
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-blue-500" size={32} />
          <h1 className="text-4xl font-bold">Cricket Players</h1>
        </div>

        {/* Format Filter */}
        <div className="flex gap-4 mb-8">
          {['test', 'odi', 't20'].map(format => (
            <button
              key={format}
              onClick={() => setSelectedFormat(format)}
              className={`px-6 py-2 rounded font-bold transition ${
                selectedFormat === format
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map(player => {
            const stats = player.stats[selectedFormat];
            const isBowler = player.role === 'Bowler';

            return (
              <div key={player.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
                {/* Player Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold">{player.name}</h3>
                      <p className="text-gray-200">{player.country}</p>
                    </div>
                    <div className={`${getRoleColor(player.role)} text-white px-3 py-1 rounded text-sm font-bold`}>
                      {player.role}
                    </div>
                  </div>
                  <p className="text-white font-bold">Jersey: #{player.jersey}</p>
                </div>

                {/* Player Stats */}
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-3 text-gray-300">{selectedFormat.toUpperCase()} Stats</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Matches</span>
                      <span className="font-bold">{stats.matches}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {isBowler ? 'Wickets' : 'Runs'}
                      </span>
                      <span className="font-bold text-green-400">
                        {isBowler ? stats.wickets : stats.runs}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average</span>
                      <span className="font-bold">{isBowler ? stats.avg : stats.avg}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 bg-green-600 hover:bg-green-700 py-2 rounded font-bold transition">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
