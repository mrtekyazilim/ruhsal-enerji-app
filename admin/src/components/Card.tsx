import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  link?: string;
}

const toKebabCase = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  const route = link || `/category/${toKebabCase(title)}`;

  return (
    <Link to={route} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 p-6 h-full border border-purple-100 hover:border-purple-400">
        {/* Icon/Emoji */}
        <div className="mb-4 text-4xl">
          {title === "Kahve Falı" && "☕"}
          {title === "Rüyalar" && "😴"}
          {title === "Şamanik" && "🪶"}
          {title === "Büyü" && "✨"}
          {title === "Cinler ve İfritler" && "👻"}
          {title === "Tarot" && "🃏"}
          {title === "Yıldız Haritası" && "⭐"}
          {title === "Nümeroloji" && "🔢"}
          {title === "Theta Healing" && "💎"}
        </div>

        <h3 className="text-xl font-bold text-purple-800 mb-3 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center text-purple-600 group-hover:text-indigo-600 font-semibold transition-colors">
          <span>Keşfet</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
