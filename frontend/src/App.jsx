import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/movies/:mood" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;