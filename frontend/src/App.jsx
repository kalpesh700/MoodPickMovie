import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Herohindi from './components/Herohindi';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/hindi" element={<Herohindi />} />
        <Route path="/movies/:mood/:language?" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
