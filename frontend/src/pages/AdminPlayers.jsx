import React, { useState } from 'react';

export default function AdminPlayers() {
  const [players] = useState([
    { id: 1, name: 'Virat Kohli', country: 'India', role: 'Batsman' },
    { id: 2, name: 'Jasprit Bumrah', country: 'India', role: 'Bowler' },
    { id: 3, name: 'Babar Azam', country: 'Pakistan', role: 'Batsman' }
  ]);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Players</h1>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold">+ Add Player</button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Country</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map(p => (
                <tr key={p.id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.country}</td>
                  <td className="p-4">{p.role}</td>
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
