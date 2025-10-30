
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <p className="text-blue-300 font-space-grotesk text-lg">AI is analyzing the market patterns...</p>
    </div>
  );
};
