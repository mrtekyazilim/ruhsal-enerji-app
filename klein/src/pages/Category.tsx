import React from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { id } = useParams();
  return <div className="p-8">Kategori: {id}</div>;
};

export default Category;
export {};
