import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/InfoPanel.scss';

const InfoPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    "Click on any certificate to view it in detail",
    "Drag to rotate the 3D view",
    "Scroll to zoom in and out",
    "Right-click and drag to pan the view",
    "Click the About Me button to learn more"
  ];
  
  useEffect(() => {
    // Show the panel after a delay
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    // Cycle through tips
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);
    
    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
    };
  }, [tips.length]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="info-panel"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="tip-content">
            <div className="tip-icon">💡</div>
            <p>{tips[currentTip]}</p>
          </div>
          <button className="close-tip" onClick={handleClose}>×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
