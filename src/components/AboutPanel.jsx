import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import '../styles/AboutPanel.scss';
import profileImage from '../assets/images/profile.jpg';
import { FaTimes, FaWindowMinimize, FaWindowMaximize } from 'react-icons/fa';

const AboutPanel = ({ onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 600, height: 'auto' });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  useEffect(() => {
    // Center the window on initial render
    if (typeof window !== 'undefined') {
      setPosition({
        x: (window.innerWidth - windowSize.width) / 2,
        y: 50
      });
    }
  }, [windowSize.width]);

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      setWindowSize({ width: 600, height: 'auto' });
    } else {
      setIsMaximized(true);
      setWindowSize({ width: '90vw', height: '80vh' });
      setPosition({ x: (window.innerWidth - window.innerWidth * 0.9) / 2, y: 50 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleClose = () => {
    // Add a fade-out animation before calling onClose
    const backdrop = document.querySelector('.about-panel-backdrop');
    if (backdrop) {
      backdrop.style.opacity = '0';
      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }, 300);
    } else {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };

  return (
    <motion.div
      className="about-panel-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".window-header"
        bounds="parent"
        position={position}
        onStop={handleDragStop}
        disabled={isMaximized}
      >
        <div 
          ref={nodeRef}
          className={`about-window ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`}
          style={{ 
            width: windowSize.width,
            height: isMaximized ? windowSize.height : 'auto'
          }}
        >
          <div className="window-header">
            <div className="window-title">About Tensae Aschalew</div>
            <div className="window-controls">
              <button className="window-button minimize" onClick={handleMinimize}>
                <FaWindowMinimize />
              </button>
              <button className="window-button maximize" onClick={handleMaximize}>
                <FaWindowMaximize />
              </button>
              <button className="window-button close" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="window-content">
            <div className="about-content">
              <div className="profile-section">
                <img src={profileImage} alt="Tensae Aschalew" className="profile-image" />
                <h2>Tensae Aschalew</h2>
                <p className="title">Software Engineer Graduated in 2024</p>
              </div>
              
              <div className="bio-section">
                <h3>My Background</h3>
                <p>
                From my early years in primary school, I consistently excelled academically, proudly earning the top position in my class, even surpassing other classes. In the eighth grade, there was a regional test in which I achieved remarkable scores. Whenever competitions arose between schools, I was selected to represent my class, ultimately leading us to victory. This pattern of success continued into high school, where I again secured the top spot in my class, particularly excelling in mathematics and physics.

My love for exploration and learning new things fueled my academic journey. By the time I reached grade 10, I achieved a perfect score of 4 out of 4, and in grade 12, I graduated with an impressive score of 536. This dedication to my studies resulted in my acceptance to Addis Ababa University, the premier institution of higher learning in Ethiopia, established in the capital city. It is the first and only autonomous university in Ethiopia.

During my university studies, I learned information systems and served as the representative of my class. I was also the founder and president of the Technology Club at my university, which had more than 1,000 members at the time. Additionally, I provided training for high school students, leading software web development boot camps and offering various training sessions.

I graduated in 2024 with a GPA of 3.59, and my academic achievements earned me a sponsorship for a master's degree in artificial intelligence. Currently, I am running my own tech startup and continue to provide training for students and others. Now, I aspire to join Canonical, which represents my first step toward fulfilling my dream.

My academic achievements have undoubtedly paved the way for this prestigious opportunity, and I am excited to embark on this new chapter of my educational journey.
                </p>
              </div>
            </div>
          </div>
          
          <div className="window-statusbar">
            <div className="status-info">Ubuntu 22.04 LTS</div>
            <div className="resize-handle"></div>
          </div>
        </div>
      </Draggable>
    </motion.div>
  );
};

export default AboutPanel;
