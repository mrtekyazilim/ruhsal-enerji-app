import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/FAVİCON.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCategoryActive = (categoryPath: string) => location.pathname.includes(categoryPath);

  const navigationItems = [
    { label: 'Ana Sayfa', path: '/' },
    { label: 'Kahve Falı', path: '/category/kahve-fali' },
    { label: 'Rüyalar', path: '/category/ruyalar' },
    { label: 'Şamanik', path: '/category/samanik' },
    { label: 'Büyü', path: '/category/buyu' },
    { label: 'Cinler ve İfritler', path: '/category/cinler-ve-ifritler' },
    { label: 'Tarot', path: '/category/tarot' },
    { label: 'Yıldız Haritası', path: '/category/yildiz-haritasi' },
    { label: 'Nümeroloji', path: '/category/numeroloji' },
    { label: 'Theta Healing', path: '/category/theta-healing' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link 
  to="/" 
  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
>
  <img 
    src={logo} 
    alt="Ruhsal Enerji Logo" 
   className="w-20 h-20object-contain"
  />

  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
    Ruhsal Enerji
  </h1>
</Link>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-purple-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-purple-700 shadow-md'
                    : 'text-white hover:bg-purple-500/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Link */}
            <Link
              to="/admin"
              className={`ml-4 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-yellow-400 text-purple-700 shadow-md'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-purple-500 pt-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-purple-700'
                    : 'text-white hover:bg-purple-500/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg font-bold transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-yellow-400 text-purple-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
