import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function NewsDetail() {
  const { id } = useParams();

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/news" className="text-green-400 hover:underline">← Back to News</Link>

        <div className="mt-6">
          <p className="text-sm text-green-400 mb-2">Series</p>
          <h1 className="text-3xl font-bold mb-4">India Wins Historic ODI Series Against Australia</h1>
          <p className="text-gray-400 mb-6">By Sports Reporter · Article ID: {id}</p>

          <div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center text-7xl mb-6">
            🏏
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            In a thrilling series finale, India clinched the ODI series 3-2 against Australia
            with a dominant performance in the final match at the MCG. Chasing a target of 280,
            the Indian batting lineup showed great composure under pressure.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This victory marks India's third consecutive ODI series win against Australia,
            further cementing their position as one of the top teams in world cricket.
          </p>
        </div>
      </div>
    </div>
  );
}
