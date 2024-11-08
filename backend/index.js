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

// Reusable function to fetch movies based on mood and language
const fetchMoviesByMood = async (mood, languageCode) => {
  const categoryId = moodToCategory[mood];
  if (!categoryId) {
    throw new Error("Invalid mood category");
  }

  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
    params: {
      api_key: process.env.API_KEY,
      with_genres: categoryId,
      language: languageCode
    }
  });

  // Filter movies if Hindi and ensure language consistency
  const movies = response.data.results
    .filter(movie => languageCode !== "hi" || movie.original_language === "hi")
    .map(movie => ({
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
      id: movie.id
    }));

  if (movies.length === 0) {
    throw new Error("No movies found for this mood and language");
  }
  return movies;
};

// Route for English Movies by Mood
app.get("/movies/:mood", async (req, res) => {
  const mood = req.params.mood.toLowerCase();
  try {
    const movies = await fetchMoviesByMood(mood, "en-US");
    res.json(movies);
  } catch (error) {
    if (error.message === "Invalid mood category") {
      res.status(400).json({ error: error.message });
    } else if (error.message === "No movies found for this mood and language") {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error fetching movies:", error.message);
      res.status(500).json({ error: "An error occurred while fetching movies" });
    }
  }
});

// Route for Hindi Movies by Mood
app.get("/hindi", async (req, res) => {
  res.send("COMING SOOOOOOOOOOOOOOOOOOON !!!!!!!!!")
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
