import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function MatchDetails() {
  const { id } = useParams();

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <Link to="/live-scores" className="text-green-400 hover:underline">← Back to Live Scores</Link>

        <div className="bg-gray-800 rounded-lg p-8 mt-6">
          <h1 className="text-3xl font-bold mb-2">India vs Australia</h1>
          <p className="text-gray-400 mb-6">MCG, Melbourne · ODI · Match ID: {id}</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded">
              <p className="text-gray-400 mb-1">India</p>
              <p className="text-3xl font-bold">145/3</p>
              <p className="text-sm text-gray-400">28.4 overs</p>
            </div>
            <div className="bg-gray-900 p-6 rounded">
              <p className="text-gray-400 mb-1">Australia</p>
              <p className="text-3xl font-bold">-</p>
              <p className="text-sm text-gray-400">Yet to bat</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">Match Info</h2>
          <div className="space-y-2 text-gray-300">
            <p>Toss: India won and elected to bat</p>
            <p>Status: Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
