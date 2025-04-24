import { useEffect, useState } from 'react';
import '../styles/Loader.scss';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="loader">
      <div className="loader-content">
        <div className="ubuntu-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1>Tensae Aschalew</h1>
        <h2>Credentials Gallery</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>Loading my achievements in 3D space...</p>
      </div>
    </div>
  );
};

export default Loader;
