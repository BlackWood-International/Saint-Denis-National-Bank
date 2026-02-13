import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const PageWelcome: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text fade in
      gsap.from(".fade-text", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out"
      });

      // Signature drawing effect
      if (signatureRef.current) {
        const paths = signatureRef.current.querySelectorAll("path");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power1.inOut",
            delay: 1
          });
        });
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={textRef} className="h-full flex flex-col justify-center items-center text-center space-y-8 p-4">
      <div className="fade-text w-full border-b border-[#2b2b2b] pb-4 mb-4">
        <h2 className="font-western text-4xl text-[#3e2723]">Bienvenue</h2>
        <p className="font-serif italic text-[#5a5a5a] mt-2">Au cœur de la prospérité</p>
      </div>

      <div className="fade-text space-y-4 font-serif text-lg leading-relaxed text-[#2b2b2b]">
        <p>
          Messieurs, Mesdames,
        </p>
        <p>
          C'est avec une fierté non dissimulée que la <span className="font-bold">Banque Nationale de Saint-Denis</span> vous ouvre ses portes blindées. Depuis près d'un demi-siècle, nous gardons les fortunes des plus grands bâtisseurs de ce nouveau monde.
        </p>
        <p>
          Que vous cherchiez à sécuriser votre or ou à investir dans le chemin de fer, nos coffres sont impénétrables et nos taux, ma foi, fort raisonnables.
        </p>
      </div>

      <div className="fade-text mt-12 pt-8 w-full flex flex-col items-center">
        <p className="font-serif text-sm uppercase tracking-widest text-[#5a5a5a] mb-4">Le Directeur</p>
        
        {/* Signature SVG */}
        <div ref={signatureRef} className="w-64 h-24 relative">
          <svg viewBox="0 0 300 100" className="w-full h-full text-[#1a237e] opacity-90 rotate-[-5deg]">
             <path 
               d="M20,80 C50,20 80,90 110,50 S150,10 180,60 C200,90 220,20 250,50 S290,90 300,40" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="3" 
               strokeLinecap="round"
             />
             <path 
               d="M30,65 L280,65" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2" 
               strokeLinecap="round"
               className="opacity-50"
             />
          </svg>
        </div>
        <p className="font-script text-2xl mt-2 text-[#2b2b2b]">Archibald Cornwall</p>
      </div>
      
      <div className="fade-text absolute bottom-4 left-0 w-full text-center">
         <span className="inline-block w-2 h-2 bg-[#2b2b2b] rounded-full mx-1"></span>
         <span className="inline-block w-2 h-2 bg-[#2b2b2b] rounded-full mx-1"></span>
         <span className="inline-block w-2 h-2 bg-[#2b2b2b] rounded-full mx-1"></span>
      </div>
    </div>
  );
};
