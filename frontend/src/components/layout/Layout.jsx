import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => (
  <div className="min-h-screen flex flex-col font-sans">
    <Navbar />
    <main className="flex-grow pt-16 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;
