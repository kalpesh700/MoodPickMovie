import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const moods = [
    { emoji: "😁", mood: "Cheerful", url: "cheerful" },
    { emoji: "🤔", mood: "Reflective", url: "reflective" },
    { emoji: "😕", mood: "Gloomy", url: "gloomy" },
    { emoji: "🤣", mood: "Comedy", url: "humorous" },
    { emoji: "😶", mood: "Melancholy", url: "melancholy" },
    { emoji: "🤩", mood: "Idyllic", url: "idyllic" },
    { emoji: "😎", mood: "Chill", url: "chill" },
    { emoji: "🥰", mood: "Romantic", url: "romantic" },
    { emoji: "🤨", mood: "Weird", url: "weird" },
    { emoji: "🤤", mood: "Horny", url: "horny" },
    { emoji: "🥱", mood: "Sleepy", url: "sleepy" },
    { emoji: "😡", mood: "Angry", url: "angry" },
    { emoji: "😨", mood: "Fearful", url: "fearful" },
    { emoji: "😢", mood: "Lonely", url: "lonely" },
    { emoji: "😬", mood: "Tense", url: "tense" },
    { emoji: "🤓", mood: "Thoughtful", url: "thoughtful" },
    { emoji: "🤪", mood: "Thrill-seeking", url: "thrill-seeking" },
    { emoji: "🙃", mood: "Playful", url: "playful" }
  ];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initially, loading is false
  const [noMovieData, setNoMovieData] = useState(false); // Track if no movie data is available

  const handleMoodClick = (moodUrl) => {
    setLoading(true);
    setNoMovieData(false);

    setTimeout(() => {
      if (moodUrl === "horny" || moodUrl === "gloomy") {
        setNoMovieData(true); // Set no movie data flag
      } else {
        // Navigate to the movie page for the selected mood
        navigate(`/movies/${moodUrl}`);
      }
      setLoading(false);
    }, 1000); // Simulate loading time
  };

  return (
    <div className="flex flex-col items-center bg-white text-black p-6 min-h-screen"> {/* Change background to white */}
      <h2 className="text-4xl font-extrabold mb-6 text-center animate__animated animate__fadeIn">
        Find your perfect movie match based on your current mood!
      </h2>

      {loading && (
        <div className="loading-animation mb-6 flex justify-center">
          {/* Optional: Replace with a spinner or progress bar */}
          <span className="loading loading-ring loading-md text-black"></span>
        </div>
      )}

      {!loading && !noMovieData && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {moods.map(({ emoji, mood, url }) => (
            <button
              key={mood}
              className="btn md:btn-lg border-[1.5px] border-black text-black hover:bg-black hover:text-white hover:scale-105 transform transition-all duration-300"
              onClick={() => handleMoodClick(url)}
            >
              <span className="text-2xl">{emoji}</span> {mood}
            </button>
          ))}
        </div>
      )}

      {noMovieData && (
        <div className="mt-6 text-center animate__animated animate__fadeIn animate__delay-1s">
          <h3 className="text-lg font-bold text-red-400">
            Looks like there’s no movie for this mood, but don’t worry—let’s try another one! 🎬
          </h3>
        </div>
      )}
    </div>
  );
}

export default Hero;
