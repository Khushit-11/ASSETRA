import React, { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Container } from '../common/Layout';

interface OwnerLayoutProps {
  children: ReactNode;
}

export const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 overflow-auto">
        <main className="p-6 lg:pl-8">
          <Container>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
};