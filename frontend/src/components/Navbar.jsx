import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-gray-800 shadow-lg rounded-box mb-4 max-w-3xl mx-auto z-10">
      <div className="flex-none">
        <Link to="/" aria-label="Go to homepage">
          <img src="/2.png" alt="Logo" className="h-8 inline-block" /> {/* Logo */}
        </Link>
      </div>
      <div className="flex-1 text-center">
        <Link to="/" className="text-2xl text-white font-bold">
          MoodpickMovie
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-white hover:bg-gray-700 rounded px-2 py-1">Home</Link>
          </li>
          <li>
            <Link to="/hindi" className="text-white hover:bg-gray-700 rounded px-2 py-1">hindi</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:bg-gray-700 rounded px-2 py-1">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
