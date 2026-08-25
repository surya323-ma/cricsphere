import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Customer Pages
import HomePage from './pages/HomePage';
import LiveScores from './pages/LiveScores';
import MatchDetails from './pages/MatchDetails';
import Players from './pages/Players';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMatches from './pages/AdminMatches';
import AdminNews from './pages/AdminNews';
import AdminPlayers from './pages/AdminPlayers';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          <Route path="/players" element={<Players />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/matches" 
            element={<ProtectedRoute><AdminMatches /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/news" 
            element={<ProtectedRoute><AdminNews /></ProtectedRoute>} 
          />
          <Route 
            path="/admin/players" 
            element={<ProtectedRoute><AdminPlayers /></ProtectedRoute>} 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
