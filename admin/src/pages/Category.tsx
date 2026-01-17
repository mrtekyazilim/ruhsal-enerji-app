import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const Category = () => {
  const { name } = useParams<{ name: string }>();

  // Örnek ürün verisi
  const products = [
    { id: 1, name: 'Ürün 1', description: 'Açıklama 1' },
    { id: 2, name: 'Ürün 2', description: 'Açıklama 2' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            description={product.description}
            link={`/detail/${product.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
