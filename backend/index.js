const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

// Mapping moods to categories
const moodToCategory = {
  cheerful: "35",          // Comedy
  reflective: "18",        // Drama
  gloomy: "27",            // Horror
  humorous: "35",          // Comedy
  melancholy: "10749",     // Romance
  idyllic: "10751",        // Family
  chill: "16",             // Animation
  romantic: "10749",       // Romance
  weird: "878",            // Science Fiction
  sleepy: "10751",         // Family
  angry: "28",             // Action
  fearful: "27",           // Horror
  lonely: "18",            // Drama
  tense: "53",             // Thriller
  thoughtful: "99",        // Documentary
  "thrill-seeking": "12",  // Adventure
  playful: "35",           // Comedy
  horny: "10749"           // Romance
};

// Fetch genres
const fetchGenres = async () => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en`;
    const response = await axios.get(url);
    return response.data.genres;  // Returns all available genres with their ids and names
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    return [];  // Return empty array if there's an error
  }
};

// Fetch movies by mood with specified language (iso_639_1 code) and Bearer token
const fetchMoviesByMood = async (mood, languageCode = 'en') => {
  const categoryId = moodToCategory[mood];
  if (!categoryId) {
    throw new Error("Invalid mood category");
  }

  try {
    const isRegionalLanguage = ["hi", "kn", "ml", "ta", "te"].includes(languageCode);
    const url = isRegionalLanguage
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${categoryId}&with_original_language=${languageCode}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${categoryId}&language=${languageCode}`;
    
    const options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` // Bearer token from environment
      }
    };

    const response = await axios.request(options);
    const movies = response.data.results;
    const genres = await fetchGenres(); // Fetch genres

    // Add genre names to each movie
    const moviesWithGenres = movies.map((movie) => {
      const movieGenres = movie.genre_ids.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Unknown"; // Return genre name or "Unknown" if not found
      });
      return {
        ...movie,
        genres: movieGenres // Attach genre names to movie data
      };
    });

    if (moviesWithGenres.length === 0) {
      throw new Error(`No ${languageCode} movies found for this mood`);
    }

    return moviesWithGenres;  // Return movies with genre names
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
};

// Fetch movie by ID with genre
const fetchMovieById = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&append_to_response=credits`;
    const response = await axios.get(url);
    
    const movie = response.data;
    const genres = movie.genres.map(genre => genre.name);  // Extract genre names from movie data

    return {
      ...movie,
      genres: genres // Add genres to movie data
    };
    console.log(genres)
  } catch (error) {
    throw new Error("Error fetching movie details: " + error.message);
  }
};

// Route for Movies by Mood (with language parameter)
app.get("/movies/:mood/:language?", async (req, res) => {
  const mood = req.params.mood.toLowerCase();  // Get mood from URL and convert to lowercase
  const language = req.params.language || 'en'; // Default to 'en' (English) if no language is specified

  try {
    const movies = await fetchMoviesByMood(mood, language);  // Fetch movies based on mood and language
    res.json(movies);  // Send the filtered movies with genres as JSON
  } catch (error) {
    if (error.message === "Invalid mood category") {
      res.status(400).json({ error: error.message }); // Bad Request for invalid mood
    } else if (error.message === `No ${language} movies found for this mood`) {
      res.status(404).json({ message: error.message }); // Not Found for no movies
    } else {
      console.error("Error fetching movies:", error.message);
      res.status(500).json({ error: "An error occurred while fetching movies" });
    }
  }
});

// Route for fetching a specific movie's details by ID, including genres
app.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await fetchMovieById(movieId);  // Fetch movie by ID with genre information
    res.json(movie);  // Send movie details with genres as JSON
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "An error occurred while fetching movie details" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
