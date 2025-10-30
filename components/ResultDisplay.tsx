
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const SignalCard: React.FC<{ signal: 'CALL' | 'PUT' }> = ({ signal }) => {
  const isCall = signal === 'CALL';
  const bgColor = isCall ? 'bg-green-500/20' : 'bg-red-500/20';
  const textColor = isCall ? 'text-green-400' : 'text-red-400';
  const ringColor = isCall ? 'ring-green-500' : 'ring-red-500';

  return (
    <div className={`p-8 rounded-2xl ${bgColor} ring-2 ${ringColor} flex flex-col items-center justify-center shadow-2xl`}>
      <h3 className="text-lg font-space-grotesk text-gray-300 mb-2">AI PREDICTED SIGNAL</h3>
      <p className={`font-space-grotesk font-bold text-7xl md:text-8xl ${textColor} tracking-widest`}>{signal}</p>
    </div>
  );
};

const ConfidenceMeter: React.FC<{ confidence: number }> = ({ confidence }) => {
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (confidence / 100) * circumference;
    const strokeColor = confidence > 90 ? "stroke-green-400" : "stroke-blue-400";
  
    return (
      <div className="p-8 bg-gray-800/50 rounded-2xl ring-1 ring-gray-700 flex flex-col items-center justify-center shadow-xl">
        <h3 className="text-lg font-space-grotesk text-gray-300 mb-4">CONFIDENCE LEVEL</h3>
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              className="stroke-current text-gray-700"
              strokeWidth="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              className={`transform -rotate-90 origin-center ${strokeColor} transition-all duration-1000 ease-out`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-space-grotesk text-3xl font-bold text-white">
            {confidence}%
          </span>
        </div>
      </div>
    );
  };
  

const ReasoningCard: React.FC<{ reasoning: string }> = ({ reasoning }) => (
  <div className="md:col-span-2 p-8 bg-gray-800/50 rounded-2xl ring-1 ring-gray-700 shadow-xl">
    <h3 className="text-lg font-space-grotesk text-gray-300 mb-4 border-b border-gray-700 pb-2">AI Analysis & Reasoning</h3>
    <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{reasoning}</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="w-full max-w-4xl mt-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SignalCard signal={result.signal} />
        <ConfidenceMeter confidence={result.confidence} />
        <ReasoningCard reasoning={result.reasoning} />
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity here, we can add it in index.html, but ideally in tailwind.config.js
const animationStyle = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
`;

// Inject styles into head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = animationStyle;
document.head.appendChild(styleSheet);
