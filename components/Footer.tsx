
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 px-4 border-t border-gray-700/50">
      <div className="container mx-auto text-center text-xs text-gray-500">
        <p className="font-bold text-red-400/80 mb-2">RISK DISCLAIMER</p>
        <p>
          Trading binary options is highly speculative, carries a high level of risk, and may not be suitable for all investors. You may lose some or all of your invested capital, therefore, you should not speculate with capital that you cannot afford to lose. The information provided by this AI tool is for informational purposes only and does not constitute financial advice. Past performance is not indicative of future results. Use this tool at your own risk.
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} QuantumEdge AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
