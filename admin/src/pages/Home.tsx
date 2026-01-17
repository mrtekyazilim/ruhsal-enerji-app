import React from "react";
import Card from "../components/Card";
import logo from "../assets/FAVİCON.png";
import headerBg from "../assets/header-bg.jpg";

const categories = [
  { title: "Kahve Falı", description: "Kahve falı ile geleceğinizi keşfedin." },
  { title: "Rüyalar", description: "Rüya tabirleri ve analizler." },
  { title: "Şamanik", description: "Şamanik uygulamalar ve enerji çalışmaları." },
  { title: "Büyü", description: "Antik büyü ve sihir uygulamaları." },
  { title: "Cinler ve İfritler", description: "Cin ve ifrit dünyasının sırları." },
  { title: "Tarot", description: "Tarot kartlarıyla rehberlik alın." },
  { title: "Yıldız Haritası", description: "Astroloji ve yıldız haritası analizi." },
  { title: "Nümeroloji", description: "Sayıların gücü ve anlamı." },
  { title: "Theta Healing", description: "Theta Healing teknikleri ve enerji terapisi." }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-50">
      
      {/* Header Banner */}
      <div
        className="relative text-white py-20 px-6 text-center shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto">
          <img 
            src={logo} 
            alt="Ruhsal Enerji" 
            className="w-28 h-28 mx-auto mb-6 drop-shadow-xl"
          />

          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Ruhsal Enerji
          </h1>

          <p className="text-xl text-purple-100 mb-2">
            Ezoterik Bilimler ve Manevi Rehberlik Platformu
          </p>

          <p className="text-purple-200 text-lg">
            Antik bilgelik ve modern anlayışın buluşma noktası
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Intro Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Hizmetlerimiz
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Kahve falından tarot kartlarına, rüya analizinden theta healing'e kadar geniş bir hizmet yelpazesi sunarız. 
            Her kategori, size rehberlik etmek ve hayatınızda netlik kazandırmak için tasarlanmıştır.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Card 
              key={cat.title} 
              title={cat.title} 
              description={cat.description}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-100 to-indigo-100 p-10 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Rehberlik Almaya Hazır mısınız?
          </h3>
          <p className="text-gray-700 mb-6">
            Yukarıdaki kategorilerden birini seçerek, uzmanlarımızdan rehberlik alabilir ve hayatınıza yeni bir perspektif kazandırabilirsiniz.
          </p>
          <p className="text-sm text-gray-600">
            Admin panelinden yeni hizmetler ekleyebilir ve mevcut hizmetleri yönetebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
