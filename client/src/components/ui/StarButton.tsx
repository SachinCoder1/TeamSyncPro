'use client'

// components/StarButton.js
import { useState } from 'react';
import { Star } from 'lucide-react';

const StarButton = () => {
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <button
      onClick={toggleStar}
      className={`p-2 rounded-full border-2 ${
        isStarred ? 'bg-yellow-400 border-yellow-400' : 'bg-transparent border-gray-400'
      }`}
    >
      <Star
        size={24}
        className={isStarred ? 'text-white' : 'text-gray-400'}
        fill={isStarred ? 'currentColor' : 'none'}
      />
    </button>
  );
};

export default StarButton;