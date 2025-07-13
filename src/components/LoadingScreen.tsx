import { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-primary z-[9999] flex items-center justify-center transition-opacity duration-500">
      <div className="text-center text-white">
        <div className="spinner mx-auto mb-6"></div>
        <h2 className="text-3xl font-bold mb-2">COMMIT</h2>
        <p className="text-xl opacity-90">로딩 중...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 