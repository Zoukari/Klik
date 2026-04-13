import React, { useEffect, useState } from 'react';

const LOADING_TEXTS = [
  'Initialisation des systèmes...',
  'Chargement des modules quantiques...',
  'Connexion aux serveurs distants...',
  'Optimisation des flux de données...',
  "Préparation de l'interface...",
  'Synchronisation terminée...',
] as const;

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState<string>(LOADING_TEXTS[0]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowWelcome(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => {
        const currentIndex = LOADING_TEXTS.findIndex((text) => text === prev);
        const nextIndex = (currentIndex + 1) % LOADING_TEXTS.length;
        return LOADING_TEXTS[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="loading-grid"></div>
        <div className="loading-particles"></div>
        <div className="loading-rings"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-cyan-400 mb-4 loading-title">
            KLIK
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 mx-auto loading-line"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mx-auto mb-8">
          <div className="loading-progress-container">
            <div className="loading-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-violet-400 text-sm mt-2 font-mono">{progress}%</div>
        </div>

        {/* Loading Text */}
        <div className="text-white/80 text-lg md:text-xl mb-8 min-h-[2rem]">
          <span className="loading-text">{currentText}</span>
        </div>

        {/* Welcome Message */}
        {showWelcome && (
          <div className="welcome-message">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-purple-600 mb-4">
              BIENVENUE DANS LE FUTUR
            </h2>
            <p className="text-xl text-cyan-300 animate-pulse">L'avenir commence maintenant...</p>
          </div>
        )}
      </div>

      {/* Corner Effects */}
      <div className="loading-corners">
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
