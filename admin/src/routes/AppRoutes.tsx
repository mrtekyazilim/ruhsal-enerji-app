import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Detail from '../pages/Detail';
import Admin from '../pages/AdminPanel'; // Admin sayfası

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:name" element={<Category />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
