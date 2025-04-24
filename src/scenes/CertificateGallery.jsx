import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Import all certificate images
import certificate1 from '../assets/images/certificates/certificate1.png';
import certificate2 from '../assets/images/certificates/certificate2.png';
import certificate3 from '../assets/images/certificates/certificate3.png';
import certificate4 from '../assets/images/certificates/certificate4.png';
import certificate5 from '../assets/images/certificates/certificate5.png';
import certificate6 from '../assets/images/certificates/certificate6.png';
import certificate7 from '../assets/images/certificates/certificate7.png';
import certificate8 from '../assets/images/certificates/certificate8.png';
import certificate9 from '../assets/images/certificates/certificate9.png';
import certificate10 from '../assets/images/certificates/certificate10.png';
import certificate11 from '../assets/images/certificates/certificate11.png';
import certificate12 from '../assets/images/certificates/certificate12.png';
import certificate13 from '../assets/images/certificates/certificate13.png';
import certificate14 from '../assets/images/certificates/certificate14.png';
import certificate15 from '../assets/images/certificates/certificate15.png';
import certificate16 from '../assets/images/certificates/certificate16.png';
import certificate17 from '../assets/images/certificates/certificate17.png';
import certificate18 from '../assets/images/certificates/certificate18.png';

// Certificate descriptions
const certificateDescriptions = {
  'My Information System Bachelor Degree': 'A degree showcasing expertise in Information Systems, awarded upon successful completion of a rigorous academic program.',
  'Recommendation Letter From Right Tech CEO': 'A letter of recommendation highlighting exceptional skills and contributions, written by the CEO of Right Tech.',
  'MERN Bootcamp Certificate': 'A certificate awarded for completing an intensive MERN stack bootcamp, demonstrating proficiency in MongoDB, Express, React, and Node.js.',
  'Tech Club Presidency Recognition Certificate': 'A recognition certificate for outstanding leadership and contributions as the President of the Tech Club.',
  'Recommendation Letter From KoderLab CEO': 'A recommendation letter from the CEO of KoderLab, acknowledging exceptional technical and professional abilities.',
  'Appreciation Certificate For My Lead and Mentorship at Tech Club in Bootcamps': 'A certificate of appreciation for exemplary leadership and mentorship during bootcamps organized by the Tech Club.',
  'Grade 8 Result': 'An official document showcasing academic performance and achievements in Grade 8.',
  'Grade 9 & 10 Transcript': 'A transcript detailing academic performance and achievements during Grades 9 and 10.',
  'Grade 10 Result': 'An official document highlighting academic performance and achievements in Grade 10.',
  'Grade 11 & 12 Transcript': 'A transcript summarizing academic performance and achievements during Grades 11 and 12.',
  'Grade 12 Result': 'An official document showcasing academic performance and achievements in Grade 12.',
  'Participation Certificate for Social Inclusion, Gender and Career Development': 'A certificate awarded for active participation in a program focused on social inclusion, gender equality, and career development.',
  'Linux Fundamentals Certificate from Digital Center Ethiopia Director': 'A certificate recognizing foundational knowledge in Linux, awarded by the Director of Digital Center Ethiopia.',
  'Certificate for Intensive Life Skill Training': 'A certificate awarded for completing an intensive training program focused on life skills development.',
  'Software Engineering Certificate From Saylor': 'A certificate recognizing proficiency in software engineering, awarded by Saylor Academy.',
  'My Masters Degree in AI Sponsorship Letter From Addis Ababa University': 'A sponsorship letter from Addis Ababa University supporting the pursuit of a Master’s degree in Artificial Intelligence.',
  'Show case when my students from the bootcamp graduated and When we give them a certificate': 'A certificate commemorating the successful graduation of bootcamp students and the awarding of certificates.',
  'When I give fundamentals of programming training for high school students': 'A certificate recognizing efforts in providing programming fundamentals training to high school students.'
};

// Define which certificates are landscape orientation
const landscapeCertificates = [3, 4, 6, 12, 14, 15, 17, 18];

const Certificate = ({ position, rotation, texture, name, index, onClick, active, featured, featuredIndex, isLandscape }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isFeatured = featured && index === featuredIndex;
  
  // Adjust dimensions based on orientation
  const width = isLandscape ? 3.5 : 2.5;
  const height = isLandscape ? 2.5 : 3.5;
  
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);
  
  useEffect(() => {
    if (active) {
      // Full screen view animation
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 5,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.to(meshRef.current.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 1,
        ease: 'power3.out'
      });
    } else if (isFeatured) {
      // Featured animation in center
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 2,
        duration: 1.2,
        ease: 'back.out(1.7)'
      });
      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.to(meshRef.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 1,
        ease: 'back.out(1.7)'
      });
    } else {
      // Return to original position in the circle
      gsap.to(meshRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1,
        ease: 'power3.out'
      });
      gsap.to(meshRef.current.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 1,
        ease: 'power3.out'
      });
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, [active, position, rotation, isFeatured]);

  useFrame((state) => {
    if (!active && !isFeatured && hovered) {
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
    
    if (isFeatured) {
      // Add floating animation for featured certificate
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        onClick={() => onClick(index)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[width, height, 1]} />
        <meshStandardMaterial 
          map={texture} 
          emissive={hovered || active || isFeatured ? new THREE.Color('#E95420') : new THREE.Color('#000000')}
          emissiveIntensity={hovered ? 0.3 : active ? 0.5 : isFeatured ? 0.4 : 0}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      {!active && !isFeatured && (
        <Text
          position={[position[0], position[1] - (isLandscape ? 1.5 : 2), position[2]]}
          rotation={rotation}
          fontSize={0.2}
          color="#E95420"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#300A24"
        >
          {name}
        </Text>
      )}
      {isFeatured && (
        <Text
          position={[0, -2, 2]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#300A24"
          maxWidth={5}
          textAlign="center"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

const FullScreenView = ({ texture, name, onClose, isLandscape }) => {
  const { viewport } = useThree();
  const aspectRatio = viewport.width / viewport.height;
  const imageRef = useRef();
  
  // Adjust dimensions based on orientation
  const width = isLandscape ? aspectRatio * 6 : 4;
  const height = isLandscape ? 4 : aspectRatio * 6;
  
  useEffect(() => {
    gsap.from(imageRef.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }, []);
  
  return (
    <group>
      {/* Semi-transparent background */}
      <mesh position={[0, 0, 3]} onClick={onClose}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
      
      {/* Certificate image */}
      <mesh ref={imageRef} position={[0, 0, 4]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Description panel */}
      <Html position={[0, -4, 4]} transform>
        <div style={{
          background: 'rgba(48, 10, 36, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          width: '600px',
          maxWidth: '80vw',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          border: '2px solid #E95420'
        }}>
          <h2 style={{ 
            color: '#E95420', 
            marginBottom: '10px',
            fontFamily: 'Ubuntu, sans-serif'
          }}>
            {name}
          </h2>
          <p style={{ 
            color: 'white', 
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'Ubuntu, sans-serif'
          }}>
            {certificateDescriptions[name] || 'A prestigious certification earned by Tensae Aschalew.'}
          </p>
          <button 
            onClick={onClose}
            style={{
              background: '#E95420',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              marginTop: '15px',
              cursor: 'pointer',
              fontFamily: 'Ubuntu, sans-serif',
              fontWeight: 'bold'
            }}
          >
            Close
          </button>
        </div>
      </Html>
    </group>
  );
};

const CertificateGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const groupRef = useRef();
  
  const certificatesList = [
    { path: certificate1, name: 'My Information System Bachelor Degree' },
    { path: certificate2, name: 'Recommendation Letter From Right Tech CEO' },
    { path: certificate3, name: 'MERN Bootcamp Certificate' },
    { path: certificate4, name: 'Tech Club Presidency Recognition Certificate' },
    { path: certificate5, name: 'Recommendation Letter From KoderLab CEO' },
    { path: certificate6, name: 'Appreciation Certificate For My Lead and Mentorship at Tech Club in Bootcamps' },
    { path: certificate7, name: 'Grade 8 Result' },
    { path: certificate8, name: 'Grade 9 & 10 Transcript' },
    { path: certificate9, name: 'Grade 10 Result' },
    { path: certificate10, name: 'Grade 11 & 12 Transcript' },
    { path: certificate11, name: 'Grade 12 Result' },
    { path: certificate12, name: 'Participation Certificate for Social Inclusion, Gender and Career Development' },
    { path: certificate13, name: 'Linux Fundamentals Certificate from Digital Center Ethiopia Director' },
    { path: certificate14, name: 'Certificate for Intensive Life Skill Training' },
    { path: certificate15, name: 'Software Engineering Certificate From Saylor' },
    { path: certificate16, name: 'My Masters Degree in AI Sponsorship Letter From Addis Ababa University  ' },
    { path: certificate17, name: 'Show case when my students from the bootcamp graduated and When we give them a certificate' },
    { path: certificate18, name: 'When I give fundamentals of programming training for high school students' },
  ];
  
  const textures = useTexture(certificatesList.map(cert => cert.path));
  
  // Auto-rotate the featured certificate
  useEffect(() => {
    if (!activeIndex && autoRotate) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % certificatesList.length);
      }, 5000); // Change featured certificate every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [activeIndex, autoRotate, certificatesList.length]);
  
  // Rotate the entire gallery
  useFrame((state) => {
    if (groupRef.current && !activeIndex && autoRotate) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  const handleClick = (index) => {
    if (activeIndex === index) {
      // If already active, deactivate it
      setActiveIndex(null);
      setAutoRotate(true);
    } else {
      // If not active, make it active
      setActiveIndex(index);
      setAutoRotate(false);
    }
  };

  // Calculate positions in a circle
  const getPosition = (index, total) => {
    const radius = 10; // Increased radius to accommodate more certificates
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = 0;
    
    return [x, y, z];
  };
  
  const getRotation = (index, total) => {
    const angle = (index / total) * Math.PI * 2;
    return [0, -angle, 0];
  };

    // Check if certificate is landscape orientation
    const isLandscape = (index) => {
        // Adding 1 because our array is 0-indexed but certificate numbers start from 1
        return landscapeCertificates.includes(index + 1);
      };
    
      // Particles for visual effect
      const Particles = () => {
        const particlesCount = 100;
        const positions = useRef(new Float32Array(particlesCount * 3));
        
        useEffect(() => {
          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions.current[i3] = (Math.random() - 0.5) * 20;
            positions.current[i3 + 1] = (Math.random() - 0.5) * 20;
            positions.current[i3 + 2] = (Math.random() - 0.5) * 20;
          }
        }, []);
        
        useFrame((state) => {
          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions.current[i3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.2 + i) * 0.01;
          }
        });
        
        return (
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particlesCount}
                array={positions.current}
                itemSize={3}
                usage={THREE.DynamicDrawUsage}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.1}
              color="#E95420"
              transparent
              opacity={0.6}
              sizeAttenuation
            />
          </points>
        );
      };
    
      return (
        <>
          <Particles />
          <group ref={groupRef}>
            {certificatesList.map((cert, index) => (
              <Certificate
                key={index}
                position={getPosition(index, certificatesList.length)}
                rotation={getRotation(index, certificatesList.length)}
                texture={textures[index]}
                name={cert.name}
                index={index}
                onClick={handleClick}
                active={activeIndex === index}
                featured={!activeIndex}
                featuredIndex={featuredIndex}
                isLandscape={isLandscape(index)}
              />
            ))}
          </group>
          
          {/* Featured certificate description */}
          {!activeIndex && (
            <Html position={[0, -3.5, 2]} transform>
              <div style={{
                background: 'rgba(48, 10, 36, 0.8)',
                padding: '15px',
                borderRadius: '8px',
                width: '400px',
                maxWidth: '80vw',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                border: '1px solid #E95420',
                transform: 'translateX(-50%)'
              }}>
                <p style={{ 
                  color: 'white', 
                  fontSize: '14px',
                  lineHeight: '1.4',
                  fontFamily: 'Ubuntu, sans-serif'
                }}>
                  {certificateDescriptions[certificatesList[featuredIndex].name]}
                </p>
                <p style={{ 
                  color: '#E95420', 
                  fontSize: '12px',
                  marginTop: '10px',
                  fontFamily: 'Ubuntu, sans-serif'
                }}>
                  Click on any certificate to view in detail
                </p>
              </div>
            </Html>
          )}
          
          {/* Spotlight effect for featured certificate */}
          {!activeIndex && (
            <spotLight
              position={[0, 10, 5]}
              angle={0.3}
              penumbra={0.8}
              intensity={1.5}
              color="#E95420"
              castShadow
              target-position={[0, 0, 0]}
            />
          )}
          
          {/* Full screen view when a certificate is clicked */}
          {activeIndex !== null && (
            <FullScreenView 
              texture={textures[activeIndex]} 
              name={certificatesList[activeIndex].name}
              onClose={() => {
                setActiveIndex(null);
                setAutoRotate(true);
              }}
              isLandscape={isLandscape(activeIndex)}
            />
          )}
          
          {/* Animated rings around the gallery */}
          <AnimatedRings />
        </>
      );
    };
    
    // Animated rings component for visual effect
    const AnimatedRings = () => {
      const ring1 = useRef();
      const ring2 = useRef();
      const ring3 = useRef();
      
      useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        
        if (ring1.current) {
          ring1.current.rotation.x = t * 0.1;
          ring1.current.rotation.y = t * 0.2;
        }
        
        if (ring2.current) {
          ring2.current.rotation.x = -t * 0.15;
          ring2.current.rotation.y = t * 0.1;
        }
        
        if (ring3.current) {
          ring3.current.rotation.x = t * 0.2;
          ring3.current.rotation.z = t * 0.1;
        }
      });
      
      return (
        <>
          <mesh ref={ring1} position={[0, 0, 0]}>
            <torusGeometry args={[12, 0.05, 16, 100]} />
            <meshStandardMaterial color="#E95420" emissive="#E95420" emissiveIntensity={0.5} transparent opacity={0.6} />
          </mesh>
          
          <mesh ref={ring2} position={[0, 0, 0]}>
            <torusGeometry args={[13, 0.05, 16, 100]} />
            <meshStandardMaterial color="#772953" emissive="#772953" emissiveIntensity={0.5} transparent opacity={0.4} />
          </mesh>
          
          <mesh ref={ring3} position={[0, 0, 0]}>
            <torusGeometry args={[14, 0.05, 16, 100]} />
            <meshStandardMaterial color="#AEA79F" emissive="#AEA79F" emissiveIntensity={0.3} transparent opacity={0.3} />
          </mesh>
        </>
      );
    };
    
    export default CertificateGallery;
    