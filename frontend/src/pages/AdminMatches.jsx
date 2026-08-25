import React, { useState } from 'react';

export default function AdminMatches() {
  const [matches] = useState([
    { id: 1, teams: 'India vs Australia', format: 'ODI', status: 'Live' },
    { id: 2, teams: 'Pakistan vs England', format: 'T20', status: 'Upcoming' },
    { id: 3, teams: 'South Africa vs New Zealand', format: 'Test', status: 'Completed' }
  ]);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Matches</h1>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold">+ Add Match</button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4">Teams</th>
                <th className="p-4">Format</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => (
                <tr key={m.id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-4">{m.teams}</td>
                  <td className="p-4">{m.format}</td>
                  <td className="p-4">{m.status}</td>
                  <td className="p-4 space-x-2">
                    <button className="text-blue-400 hover:underline">Edit</button>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
