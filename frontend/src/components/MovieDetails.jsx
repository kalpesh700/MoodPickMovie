import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { mood, language = 'en' } = useParams(); // Capture both mood and language from the URL
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);  // Start loading
      setError(null);     // Reset error
      try {
        const response = await fetch(`http://localhost:5000/movies/${mood}/${language}`);
        const data = await response.json();
        setMovies(data);
        setCurrentIndex(Math.floor(Math.random() * data.length));
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchMovies();
  }, [mood, language]);

  const handleSkip = () => {
    if (movies.length > 1) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * movies.length);
      } while (newIndex === currentIndex);
      setCurrentIndex(newIndex);
    }
  };

  const handleWatchTrailer = (movieTitle) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+trailer`, '_blank');
  };

  const currentMovie = movies[currentIndex] || {};

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return 'Genre not available';
    return genres.join(', '); // Join genre names if available
  };

  // If loading, show the spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  // If there's an error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // If there are no movies
  if (!movies.length) {
    return <div>No movies available for this mood</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen relative px-4">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${currentMovie.poster_path})`,
        }}
      ></div>

      <div className="card bg-base-100 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-w-md shadow-xl relative z-10 p-4">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
            alt={currentMovie.title}
            className="w-full h-auto rounded-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">{currentMovie.title}</h2>
          <p><strong>Overview:</strong> {currentMovie.overview}</p>
          <p><strong>Release Year:</strong> {new Date(currentMovie.release_date).getFullYear()}</p>
          <p><strong>Rating:</strong> ⭐ {currentMovie.vote_average.toFixed(1)}/10</p>
          <p><strong>Genre:</strong> {formatGenres(currentMovie.genres)}</p>
          <p><strong>Duration:</strong> {currentMovie.runtime || '2h 40m'}</p>

          <div className="card-actions justify-center space-x-4">
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
  );
}

export default MovieDetails;
