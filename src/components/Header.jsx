import { motion } from 'framer-motion';
import '../styles/Header.scss';
import ubuntuLogo from '../assets/images/ubuntu-logo.svg';

const Header = ({ setShowAbout }) => {
  const achievementText = "From my early years in primary school, I consistently excelled academically, proudly earning the top position in my class. At the age of eight, I achieved remarkable scores, and whenever competitions arose between schools, I was selected to represent my class, ultimately leading us to victory. This pattern of success continued into high school, where I again secured the top spot in my class, particularly excelling in mathematics and physics. My love for exploration and learning new things fueled my academic journey. By the time I reached grade 10, I achieved a perfect score of 4 out of 4, and in grade 12, I graduated with an impressive score of 536. This dedication to my studies resulted in my acceptance to Addis Ababa University, the premier institution of higher learning in Ethiopia, established in the capital city. My academic achievements have undoubtedly paved the way for this prestigious opportunity, and I am excited to embark on this new chapter of my educational journey.";

  return (
    <header className="header">
      <div className="logo-container">
        <img src={ubuntuLogo} alt="Ubuntu Logo" className="ubuntu-logo" />
        <h1>Tensae Evidences</h1>
      </div>
      
      <div className="scrolling-text-wrapper">
        <motion.div 
          className="scrolling-text"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {achievementText}
        </motion.div>
      </div>
      
      <motion.div
        className="nav-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button onClick={() => setShowAbout(true)}>About Me</button>
        <a href="https://drive.google.com/file/d/15az6UKSLxswSjT97pE4jNihd64BNeW8t/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          Download All Evidences In PDF
        </a>
        <a href="https://tensae-ubuntu-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
          My Ubuntu Portfolio
        </a>
      </motion.div>
    </header>
  );
};

export default Header;
