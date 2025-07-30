import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for fade out animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-primary to-primary-glow flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-scale-in">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          MOCIBER
        </h1>
        <div className="relative animate-pulse">
          <img 
            src="/lovable-uploads/0f38020b-7c6c-4774-831b-6ae705aa2837.png" 
            alt="Mociber App Icon" 
            className="w-32 h-32 mx-auto drop-shadow-2xl animate-scale-in"
          />
        </div>
        <div className="mt-8">
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;