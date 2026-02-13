import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

export const PageSimulator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [years, setYears] = useState<number>(5);
  const [rate] = useState<number>(4.5);
  const [result, setResult] = useState<number | null>(null);
  
  const stampRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    // Simple Interest Formula: A = P(1 + rt)
    const total = amount * (1 + (rate / 100) * years);
    setResult(total);

    // Animate Stamp
    if (stampRef.current) {
        gsap.fromTo(stampRef.current, 
            { scale: 2, opacity: 0, rotation: -45 },
            { scale: 1, opacity: 1, rotation: -15, duration: 0.4, ease: "back.out(1.7)" }
        );
    }

    // Animate Result Text
    if (resultRef.current) {
        gsap.fromTo(resultRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
    }
  };

  return (
    <div className="h-full flex flex-col font-serif text-[#2b2b2b]">
      <div className="border-b-2 border-[#2b2b2b] mb-8 pb-2">
        <h2 className="font-western text-3xl">Estimation de Prêt</h2>
        <p className="text-sm italic opacity-70">Conditions Générales de 1899</p>
      </div>

      <div className="space-y-8 flex-1">
        
        {/* Amount Input */}
        <div className="group relative">
          <label className="block text-sm uppercase tracking-widest text-[#5a5a5a] mb-1">Montant désiré ($)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-transparent border-b-2 border-[#8d7b68] focus:border-[#3e2723] outline-none font-script text-3xl py-2 transition-colors text-[#2b2b2b]"
          />
          <div className="absolute right-0 bottom-2 opacity-30 pointer-events-none">
             <span className="font-western text-xl">$</span>
          </div>
        </div>

        {/* Duration Input */}
        <div className="group relative">
          <label className="block text-sm uppercase tracking-widest text-[#5a5a5a] mb-1">Durée (Années)</label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#3e2723] cursor-pointer"
          />
          <div className="mt-2 text-right font-script text-2xl">{years} ans</div>
        </div>

        {/* Rate Display (Fixed/Variable) */}
        <div className="flex justify-between items-center border p-4 border-dashed border-[#8d7b68] bg-[#fdf6e3]/50">
           <span className="font-serif italic text-[#5a5a5a]">Taux d'intérêt en vigueur</span>
           <span className="font-western text-2xl text-[#3e2723]">{rate}%</span>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mt-8">
            <button 
                onClick={calculate}
                className="relative px-8 py-3 bg-[#2b2b2b] text-[#fdf6e3] font-western tracking-widest hover:bg-[#3e2723] transition-colors shadow-lg active:transform active:scale-95 group overflow-hidden"
            >
                <span className="relative z-10">CALCULER</span>
                <div className="absolute inset-0 bg-[#3e2723] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
        </div>

      </div>

      {/* Result Section (Stamp) */}
      <div className="h-40 relative flex items-center justify-center border-t-2 border-double border-[#d4c5a9] mt-8 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]">
         {!result && <p className="opacity-40 italic">En attente de calcul...</p>}
         
         {result && (
             <div className="relative w-full h-full flex items-center justify-center">
                 {/* The Stamp */}
                 <div 
                    ref={stampRef}
                    className="absolute border-4 border-[#8b0000] text-[#8b0000] p-4 rounded-lg transform -rotate-12 opacity-0 mix-blend-multiply pointer-events-none z-10"
                    style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/grunge-wall.png")' }} // Rough texture
                 >
                     <span className="block font-western text-xl text-center uppercase border-b-2 border-[#8b0000] mb-1">Approuvé</span>
                     <span className="block font-bold text-xs text-center">BANQUE NATIONALE</span>
                 </div>
                 
                 {/* The Text */}
                 <div ref={resultRef} className="text-center z-0 opacity-0">
                     <p className="text-sm uppercase text-[#5a5a5a] mb-2">Total à rembourser</p>
                     <p className="font-script text-5xl text-[#2b2b2b] ink-bleed">
                        ${result.toFixed(2)}
                     </p>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};
