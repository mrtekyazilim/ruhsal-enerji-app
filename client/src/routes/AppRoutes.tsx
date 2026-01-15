import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Detail from '../pages/Detail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
};

export default AppRoutes;
export {};
