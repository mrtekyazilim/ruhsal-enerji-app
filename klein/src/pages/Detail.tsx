import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  return <div className="p-8">Detay Sayfası: {id}</div>;
};

export default Detail;
export {};
