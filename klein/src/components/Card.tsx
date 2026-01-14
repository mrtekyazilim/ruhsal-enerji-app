import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <Link to={`/category/${title.toLowerCase()}`}>
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
};

export default Card;
export {}; // <-- module olarak işaretler
