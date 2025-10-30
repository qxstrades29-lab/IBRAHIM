
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { analyzeChartImage } from './services/geminiService';
import { AnalysisResult } from './types';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalysis = useCallback(async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const result = await analyzeChartImage(imageFile);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          <ImageUploader onImageUpload={handleImageUpload} previewUrl={imagePreviewUrl} />

          <div className="text-center">
            <button
              onClick={handleAnalysis}
              disabled={!imageFile || isLoading}
              className="font-space-grotesk font-bold text-lg px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isLoading ? 'ANALYZING...' : 'ANALYZE CHART'}
            </button>
          </div>

          {isLoading && <Loader />}
          
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {analysisResult && !isLoading && <ResultDisplay result={analysisResult} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
