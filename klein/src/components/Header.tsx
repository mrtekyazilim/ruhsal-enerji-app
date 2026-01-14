import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Ruhsal Enerji</Link>
        <nav>
          <Link to="/" className="mr-4 hover:underline">Ana Sayfa</Link>
          <Link to="/category/kahve falı" className="hover:underline">Kahve Falı</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
export {};
