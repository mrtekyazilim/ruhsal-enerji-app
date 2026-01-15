import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
