import React from 'react';
import { useNavigate } from 'react-router-dom';

function Herohindi() {
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

  const handleMoodClick = (moodUrl) => {
    // Navigate to the movies page with Hindi language ('hi')
    navigate(`/movies/${moodUrl}/hi`);
  };

  return (
    <div className="flex flex-col items-center bg-white text-black p-6 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Find your perfect movie match based on your current mood! (Hindi Movies)
      </h2>
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-center mb-4">Hindi Movies</h3>
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
      </div>
    </div>
  );
}

export default Herohindi;
