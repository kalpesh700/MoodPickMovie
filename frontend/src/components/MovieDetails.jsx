import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { mood } = useParams(); // Get the mood from the URL
  const [movies, setMovies] = useState([]); // Store the movie list
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch movies when the component mounts or mood changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://moodpickmovie-backend.onrender.com/movies/${mood}`);
        const data = await response.json();
        setMovies(data); // Store fetched movies in state
        setCurrentIndex(Math.floor(Math.random() * data.length)); // Start with a random movie
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovies();
  }, [mood]); // Dependency on mood to fetch again when mood changes

  const handleSkip = () => {
    if (movies.length > 1) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * movies.length);
      } while (newIndex === currentIndex); // Ensure the new index is different from the current one
      setCurrentIndex(newIndex);
    }
  };

  const handleWatchTrailer = (movieTitle) => {
    // Redirect to YouTube search results for the movie trailer
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+trailer`, '_blank');
  };

  const currentMovie = movies[currentIndex]; // Get the current movie

  return (
    // Check if movies are still being fetched
    !movies.length ? (
      <div className="flex justify-center items-center min-h-screen">
        {/* Loading animation while movies are being fetched */}
        <span className="loading loading-ring loading-md"></span>
      </div>
    ) : (
      <div className="flex justify-center items-center min-h-screen relative px-4">
        {/* Background image with blur effect */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${currentMovie.poster_path})`,
          }}
        ></div>

        <div className="card bg-base-100 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-md shadow-xl relative z-10 p-4">
          <figure>
            {/* Display movie poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
              alt={currentMovie.title}
              className="w-full h-auto rounded-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center">{currentMovie.title}</h2>
            <p><strong>Overview:</strong> {currentMovie.overview}</p>
            <p><strong>Release Date:</strong> {currentMovie.release_date}</p>
            <p><strong>Rating:</strong> {currentMovie.vote_average}</p>
            <p><strong>Genre:</strong> {currentMovie.genre || 'Romance, Comedy'}</p> {/* Added genre */}
            <p><strong>Duration:</strong> {currentMovie.runtime || '2h 40m'}</p> {/* Added duration */}
            
            <div className="card-actions justify-center space-x-4">
              {/* Button to watch trailer by redirecting to YouTube search */}
              <button onClick={() => handleWatchTrailer(currentMovie.title)} className="btn btn-primary">
                Watch Trailer
              </button>
              <button onClick={handleSkip} className="btn btn-secondary">
                Next Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default MovieDetails;
