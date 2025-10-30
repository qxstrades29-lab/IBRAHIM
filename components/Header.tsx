
import React from 'react';

const BrainIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6.5a3.5 3.5 0 013.5-3.5h0a3.5 3.5 0 013.5 3.5V19M9 19c-1.105 0-2-.895-2-2V9.5a3.5 3.5 0 013.5-3.5h0a3.5 3.5 0 013.5 3.5V17c0 1.105-.895 2-2 2M9 19c-2.21 0-4-1.79-4-4V9.5a3.5 3.5 0 013.5-3.5h0a3.5 3.5 0 013.5 3.5V15" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <BrainIcon />
        <h1 className="ml-3 text-2xl md:text-3xl font-bold font-space-grotesk text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-blue-400">
          QuantumEdge Signal AI
        </h1>
      </div>
    </header>
  );
};
