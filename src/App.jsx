import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CertificateGallery from './scenes/CertificateGallery';
import Loader from './components/Loader';
import Header from './components/Header';
import AboutPanel from './components/AboutPanel';
import InfoPanel from './components/InfoPanel';
import './styles/App.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header setShowAbout={setShowAbout} />
          {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}

          <InfoPanel />
          <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <color attach="background" args={['#2c001e']} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Suspense fallback={null}>
                <CertificateGallery />
                <Environment preset="sunset" />
                <EffectComposer>
                  <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
                </EffectComposer>
              </Suspense>
              <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                enableRotate={true} 
                zoomSpeed={0.5}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
          <div className="instructions">
            <p>Drag to rotate • Scroll to zoom • Right-click to pan</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
