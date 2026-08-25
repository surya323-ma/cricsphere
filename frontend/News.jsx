import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';

export default function News() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'India Wins Historic ODI Series Against Australia',
      category: 'Series',
      excerpt: 'In a thrilling series finale, India clinched the ODI series 3-2 against Australia...',
      author: 'Sports Reporter',
      date: '2024-09-20',
      views: 15420,
      likes: 1250,
      image: '🏏',
      featured: true
    },
    {
      id: 2,
      title: 'Virat Kohli Breaks Another Record',
      category: 'Player News',
      excerpt: 'Virat Kohli becomes the first batsman to score 8000 runs in Test cricket...',
      author: 'Cricket Analyst',
      date: '2024-09-19',
      views: 12300,
      likes: 980,
      image: '⭐',
      featured: true
    },
    {
      id: 3,
      title: 'T20 World Cup Schedule Announced',
      category: 'Events',
      excerpt: 'ICC announces the complete schedule for the upcoming T20 World Cup...',
      author: 'Cricket Correspondent',
      date: '2024-09-18',
      views: 8900,
      likes: 650,
      image: '🌍',
      featured: false
    },
    {
      id: 4,
      title: 'Young Talent Shines in Domestic Cricket',
      category: 'Domestic',
      excerpt: 'Emerging players make headlines in recent domestic cricket tournaments...',
      author: 'Sports Desk',
      date: '2024-09-17',
      views: 5600,
      likes: 420,
      image: '✨',
      featured: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Series', 'Player News', 'Events', 'Domestic'];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-green-500" size={32} />
          <h1 className="text-4xl font-bold">Cricket News</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles.some(a => a.featured) && (
          <div className="mb-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg overflow-hidden hover:shadow-lg transition">
            {(() => {
              const featured = filteredArticles.find(a => a.featured);
              return (
                <div className="p-8">
                  <p className="text-sm text-green-200 mb-2">FEATURED</p>
                  <h2 className="text-3xl font-bold mb-3">{featured.title}</h2>
                  <p className="text-gray-100 mb-4">{featured.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-200">
                      By {featured.author} • {featured.date}
                    </div>
                    <Link to={`/news/${featured.id}`} className="bg-white text-green-600 px-6 py-2 rounded font-bold hover:bg-gray-100">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition h-full">
                {/* Article Image */}
                <div className="bg-gray-700 h-48 flex items-center justify-center text-6xl">
                  {article.image}
                </div>

                {/* Article Content */}
                <div className="p-4">
                  <p className="text-sm text-green-400 mb-2">{article.category}</p>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                  {/* Metadata */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{article.date}</span>
                      <span className="text-xs">{article.author}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">👁️ {article.views.toLocaleString()} views</span>
                      <button className="flex items-center gap-1 text-red-400 hover:text-red-300">
                        <Heart size={16} />
                        <span>{article.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
