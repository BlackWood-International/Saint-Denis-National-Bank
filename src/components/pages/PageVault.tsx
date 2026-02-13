import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
// import { LucideLock } from 'lucide-react';

export const PageVault: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const doorRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const gearsRef = useRef<HTMLDivElement>(null);

    const toggleVault = () => {
        if (isOpen) {
            // Close
            const tl = gsap.timeline({
                onComplete: () => setIsOpen(false)
            });
            tl.to(contentRef.current, { opacity: 0, duration: 0.5 });
            tl.to(doorRef.current, { x: 0, duration: 1.5, ease: "power2.inOut" }, "-=0.3");
            tl.to(handleRef.current, { rotation: 0, duration: 1, ease: "back.out(1.7)" }, "-=1");
            tl.to(gearsRef.current, { rotation: 0, duration: 1.5, ease: "power1.inOut" }, "<");
        } else {
            // Open
            const tl = gsap.timeline({
                onComplete: () => setIsOpen(true)
            });
            tl.to(handleRef.current, { rotation: 180, duration: 1, ease: "back.in(1.7)" });
            tl.to(gearsRef.current, { rotation: 360, duration: 2, ease: "power1.in" }, "<");
            tl.to(doorRef.current, { x: -300, duration: 2, ease: "power2.inOut" }, "-=0.5");
            tl.to(contentRef.current, { opacity: 1, duration: 1, stagger: 0.2 }, "-=1");
        }
    };

    return (
        <div className="h-full relative overflow-hidden bg-[#1a1a1a] border-4 border-[#3e2723] rounded-lg shadow-inner">
            
            {/* Background (Inside Vault) */}
            <div className="absolute inset-0 bg-black flex items-center justify-center">
                 <div ref={contentRef} className="opacity-0 grid grid-cols-2 gap-4 p-8 transform scale-90">
                     {/* Gold Bars */}
                     {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-24 h-8 bg-gradient-to-b from-[#ffd700] via-[#f7dfa5] to-[#b8860b] rounded-sm shadow-[0_0_15px_rgba(255,215,0,0.6)] transform rotate-[-5deg] border border-[#b8860b]">
                             <div className="w-full h-full flex items-center justify-center opacity-50 font-western text-[10px] tracking-widest text-[#8b4500]">999.9</div>
                         </div>
                     ))}
                     <div className="col-span-2 text-center text-[#ffd700] font-serif mt-4 text-sm opacity-80">
                         RÉSERVES: $1,250,000
                     </div>
                 </div>
            </div>

            {/* Vault Door */}
            <div 
                ref={doorRef}
                className="absolute inset-0 bg-[#2c2c2c] flex items-center justify-center z-10 texture-metal"
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/brushed-alum.png")',
                    boxShadow: 'inset 0 0 50px black'
                }}
            >
                {/* Decorative Rivets */}
                <div className="absolute inset-4 border-2 border-dashed border-[#555] opacity-50 pointer-events-none"></div>
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#111] shadow-[1px_1px_0_#444]"></div>
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#111] shadow-[1px_1px_0_#444]"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#111] shadow-[1px_1px_0_#444]"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#111] shadow-[1px_1px_0_#444]"></div>

                {/* Central Mechanism */}
                <div className="relative w-48 h-48 rounded-full bg-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center border-4 border-[#444]">
                    
                    {/* Gears Animation Layer */}
                    <div ref={gearsRef} className="absolute inset-0 w-full h-full rounded-full opacity-20 pointer-events-none border-4 border-dashed border-[#777]"></div>

                    {/* Handle */}
                    <div 
                        ref={handleRef}
                        onClick={toggleVault}
                        className="w-32 h-8 bg-gradient-to-r from-[#555] via-[#888] to-[#555] rounded-full cursor-pointer shadow-lg hover:brightness-110 transition-all active:scale-95 flex items-center justify-center z-20"
                    >
                         <div className="w-24 h-2 bg-[#333] rounded-full inner-shadow"></div>
                         {/* Hub */}
                         <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#666] to-[#333] shadow-md border border-[#222]"></div>
                    </div>

                    <div className="absolute -bottom-16 text-[#888] font-western text-xs tracking-[0.2em] pointer-events-none">
                        {isOpen ? 'OUVERT' : 'FERMÉ'}
                    </div>
                </div>
            </div>
        </div>
    );
};
