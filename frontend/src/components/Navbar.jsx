import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-500">
          🏏 CricSphere
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/live-scores" className="hover:text-green-400">Live Scores</Link>
          <Link to="/players" className="hover:text-green-400">Players</Link>
          <Link to="/news" className="hover:text-green-400">News</Link>
          <Link to="/admin/login" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Admin</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          <Link to="/" className="block hover:text-green-400">Home</Link>
          <Link to="/live-scores" className="block hover:text-green-400">Live Scores</Link>
          <Link to="/players" className="block hover:text-green-400">Players</Link>
          <Link to="/news" className="block hover:text-green-400">News</Link>
          <Link to="/admin/login" className="block bg-green-600 px-4 py-2 rounded">Admin</Link>
        </div>
      )}
    </nav>
  );
}
