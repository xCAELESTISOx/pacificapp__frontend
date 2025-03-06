'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DarkModeProvider from '../ui/DarkModeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DarkModeProvider>
        <main className="flex-grow container mx-auto py-6 px-4">
          {children}
        </main>
      </DarkModeProvider>
      <Footer />
    </div>
  );
};

export default MainLayout; 