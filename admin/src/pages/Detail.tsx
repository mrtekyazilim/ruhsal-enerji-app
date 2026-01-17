import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      {product.image && <img src={product.image} alt={product.title} className="mb-4" />}
      <p className="mb-2">{product.description}</p>
      <p className="font-semibold">Fiyat: {product.price} TL</p>
    </div>
  );
};

export default Detail;
