import React, { ReactNode } from 'react';
import { RenterNavbar } from './RenterNavbar';

interface RenterLayoutProps {
  children: ReactNode;
  onChatToggle?: () => void;
}

export const RenterLayout: React.FC<RenterLayoutProps> = ({ children, onChatToggle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RenterNavbar onChatToggle={onChatToggle} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0 pb-20 lg:pb-0 px-4 lg:px-8 py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};