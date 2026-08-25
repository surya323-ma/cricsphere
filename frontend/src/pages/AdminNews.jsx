import React, { useState } from 'react';

export default function AdminNews() {
  const [articles] = useState([
    { id: 1, title: 'India Wins Historic ODI Series', category: 'Series', views: 15420 },
    { id: 2, title: 'Virat Kohli Breaks Another Record', category: 'Player News', views: 12300 }
  ]);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage News</h1>
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold">+ Add Article</button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Views</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="p-4">{a.title}</td>
                  <td className="p-4">{a.category}</td>
                  <td className="p-4">{a.views.toLocaleString()}</td>
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
