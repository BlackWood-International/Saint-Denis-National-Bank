import { useEffect, useRef } from 'react';
import { Ledger } from './components/Ledger';
import { gsap } from 'gsap';

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intro animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".desk-item", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Lamp flicker
      gsap.to(".lamp-glow", {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#2a1b15]"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.9)'
      }}
    >
      {/* Lighting Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/60 z-50"></div>
      
      {/* Warm Lamp Glow */}
      <div className="lamp-glow absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,160,50,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 mix-blend-overlay opacity-60"></div>
      
      {/* Ambient particles or dust could go here */}
      
      <div className="desk-item relative z-10 w-full max-w-7xl h-[90vh] flex items-center justify-center p-4">
        <Ledger />
      </div>

      {/* Decorative Desk Items */}
      <div className="desk-item absolute bottom-10 right-10 w-32 h-32 opacity-80 pointer-events-none mix-blend-multiply">
        {/* Potentially an inkwell or coins image here later */}
      </div>
    </div>
  );
}
