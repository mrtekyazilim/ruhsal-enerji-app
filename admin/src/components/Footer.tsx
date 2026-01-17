import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Açıklama */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-purple-200">
            ✨ Ruhsal Enerji
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Ezoterik bilgiler, manevi rehberlik ve spiritüel farkındalık
            yolculuğunuzda size ışık tutan bir platform.
          </p>
        </div>

        {/* Kategoriler */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-200">
            Kategoriler
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/category/kahve-fali" className="hover:text-white">Kahve Falı</Link></li>
            <li><Link to="/category/tarot" className="hover:text-white">Tarot</Link></li>
            <li><Link to="/category/ruyalar" className="hover:text-white">Rüyalar</Link></li>
            <li><Link to="/category/theta-healing" className="hover:text-white">Theta Healing</Link></li>
          </ul>
        </div>

        {/* Alt Bilgi */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-200">
            Bilgilendirme
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            Tüm içerikler rehberlik amaçlıdır.
          </p>
          <p className="text-sm text-gray-400">
            Spiritüel yolculuğunuzda bilinçli seçimler yapmanız önerilir.
          </p>
        </div>
      </div>

      {/* Alt Çizgi */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © 2026 Ruhsal Enerji • Tüm Hakları Saklıdır
      </div>
    </footer>
  );
};

export default Footer;
