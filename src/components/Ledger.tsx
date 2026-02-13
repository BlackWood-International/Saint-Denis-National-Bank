import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { PageWelcome } from './pages/PageWelcome';
import { PageSimulator } from './pages/PageSimulator';
import { PageVault } from './pages/PageVault';
import { PageTelegram } from './pages/PageTelegram';
import { LucideFeather, LucideCoins, LucideLock, LucideSend } from 'lucide-react';

type Section = 'welcome' | 'simulator' | 'vault' | 'telegram';

export const Ledger = () => {
  const [activeSection, setActiveSection] = useState<Section>('welcome');
  const [isFlipping, setIsFlipping] = useState(false);
  
  const rightPageRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  const changeSection = (section: Section) => {
    if (section === activeSection || isFlipping) return;
    
    setIsFlipping(true);
    
    // Animate page turn
    const timeline = gsap.timeline({
      onComplete: () => {
        setActiveSection(section);
        setIsFlipping(false);
        // Animate content in
        gsap.fromTo(rightPageRef.current, 
          { opacity: 0, x: 20 }, 
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });

    // Simple "flip" effect simulation
    timeline.to(rightPageRef.current, {
      rotationY: -90,
      duration: 0.4,
      ease: "power1.in",
      transformOrigin: "left center"
    });
    
    timeline.set(rightPageRef.current, { rotationY: 0 }); // Reset for re-entry
  };

  const navItems = [
    { id: 'welcome', label: 'Accueil', icon: LucideFeather },
    { id: 'simulator', label: 'Prêts', icon: LucideCoins },
    { id: 'vault', label: 'Coffre-fort', icon: LucideLock },
    { id: 'telegram', label: 'Télégraphe', icon: LucideSend },
  ];

  return (
    <div className="relative w-full h-full max-h-[800px] aspect-[1.4/1] flex shadow-2xl perspective-1000">
      
      {/* Back Cover / Leather Base */}
      <div className="absolute inset-0 bg-[#3e2723] rounded-lg transform translate-y-2 translate-x-2 -z-10 shadow-2xl texture-leather border-2 border-[#1a110d]"></div>
      
      {/* Left Page (Navigation) */}
      <div 
        ref={leftPageRef}
        className="relative w-1/2 h-full bg-[#fdf6e3] rounded-l-md texture-paper border-r border-[#d4c5a9] overflow-hidden z-10"
        style={{ transformOrigin: "right center" }}
      >
        <div className="absolute inset-0 p-8 border-4 border-transparent border-r-0">
          <div className="h-full border-double-ornate p-6 flex flex-col justify-between">
            
            {/* Header */}
            <header className="text-center border-b-2 border-[#2b2b2b] pb-6 mb-8">
              <h2 className="font-western text-2xl tracking-widest text-[#3e2723] opacity-80 mb-2">BANQUE NATIONALE</h2>
              <h1 className="font-script text-5xl text-[#2b2b2b] -rotate-2">de Saint-Denis</h1>
              <p className="text-xs font-serif mt-2 tracking-widest text-[#5a5a5a] uppercase">Établie en 1845</p>
            </header>

            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => changeSection(item.id as Section)}
                    className={`
                      group relative w-full text-left px-6 py-4 flex items-center gap-4 transition-all duration-300
                      ${isActive ? 'bg-[#e6dcc3] shadow-inner' : 'hover:bg-[#f3ead3]'}
                    `}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-[#3e2723]' : 'text-[#8d7b68]'}`} strokeWidth={1.5} />
                    <span className={`
                      font-serif text-xl tracking-wide
                      ${isActive ? 'text-[#2b2b2b] font-semibold' : 'text-[#5a5a5a]'}
                    `}>
                      {item.label}
                    </span>
                    
                    {/* Handwritten underline for active state */}
                    {isActive && (
                      <span className="absolute bottom-2 left-16 w-1/2 h-0.5 bg-[#3e2723] opacity-60 transform -rotate-1 skew-x-12" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <footer className="text-center mt-8 opacity-60">
              <p className="font-serif text-sm italic text-[#5a5a5a]">
                "La confiance est notre devise,<br/>l'or est notre garantie."
              </p>
            </footer>
          </div>
        </div>
      </div>

      {/* Spine */}
      <div 
        ref={spineRef}
        className="w-12 h-full bg-gradient-to-r from-[#2c1b17] via-[#4e342e] to-[#2c1b17] z-20 relative shadow-inner flex flex-col items-center justify-center gap-12"
      >
        <div className="w-full h-[2px] bg-[#6d4c41] shadow-sm"></div>
        <div className="w-full h-[2px] bg-[#6d4c41] shadow-sm"></div>
        <div className="w-full h-[2px] bg-[#6d4c41] shadow-sm"></div>
      </div>

      {/* Right Page (Content) */}
      <div 
        ref={rightPageRef}
        className="relative w-1/2 h-full bg-[#fdf6e3] rounded-r-md texture-paper border-l border-[#d4c5a9] overflow-hidden z-10 origin-left"
      >
         <div className="absolute inset-0 p-8">
            <div className="h-full border-double-ornate p-8 overflow-y-auto no-scrollbar relative">
              {/* Content Rendering */}
              {activeSection === 'welcome' && <PageWelcome />}
              {activeSection === 'simulator' && <PageSimulator />}
              {activeSection === 'vault' && <PageVault />}
              {activeSection === 'telegram' && <PageTelegram />}
            </div>
            
            {/* Page Number */}
            <div className="absolute bottom-4 right-8 font-serif text-[#8d7b68] italic">
               Page {navItems.findIndex(n => n.id === activeSection) + 1}
            </div>
         </div>
      </div>
    </div>
  );
};
