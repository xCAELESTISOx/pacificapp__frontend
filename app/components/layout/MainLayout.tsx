'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Simple error boundary component
class ThemeErrorBoundary extends React.Component<{children: React.ReactNode}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: any, info: any) {
    console.error("Theme error caught:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      // Fallback UI when theme error occurs
      return <div className="flex flex-col min-h-screen">{this.props.children}</div>;
    }
    
    return this.props.children;
  }
}

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto">
          <div className='pt-20 md:pt-6 pb-12'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeErrorBoundary>
  );
};

export default MainLayout; 