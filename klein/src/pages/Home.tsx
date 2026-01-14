import React from 'react';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">
        Ruhsal Enerji Sitesine Hoşgeldiniz
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Kahve Falı" />
        <Card title="Tarot" />
        <Card title="Rüyalar" />
        <Card title="Şamanik" />
      </div>
    </div>
  );
};

export default Home;
export {};
