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
            <Link 
              to="/hindi" 
              className="btn btn-outline btn-primary flex items-center space-x-2 px-4 py-2"
            >
              <span>Bollywood</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 inline-block text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
