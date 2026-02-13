import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

export const PageTelegram: React.FC = () => {
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    
    const keyRef = useRef<HTMLButtonElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!message || !sender) return;
        
        setStatus('sending');
        
        // Animate the key pressing down multiple times
        const tl = gsap.timeline({
            onComplete: () => {
                setStatus('sent');
                setTimeout(() => {
                    setMessage('');
                    setSender('');
                    setStatus('idle');
                }, 3000);
            }
        });

        // Simulate morse code tapping
        for(let i=0; i<5; i++) {
            tl.to(keyRef.current, { y: 2, duration: 0.05, ease: "power1.in" });
            tl.to(keyRef.current, { y: 0, duration: 0.05, ease: "power1.out" });
            tl.to(keyRef.current, { duration: Math.random() * 0.2 }); // Pause
        }
    };

    return (
        <div className="h-full flex flex-col font-mono text-sm bg-[#f4e4bc] p-4 border border-[#d4c5a9] shadow-inner relative">
            {/* Paper Header */}
            <div className="border-b-2 border-black pb-2 mb-4 flex justify-between items-end">
                <div>
                    <h2 className="font-western text-2xl tracking-widest">TÉLÉGRAPHE</h2>
                    <p className="text-[10px] uppercase">Union Western & Co.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px]">No. 8921-B</p>
                    <p className="text-[10px]">1899</p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4 font-typewriter">
                
                <div className="flex gap-2 items-baseline border-b border-dotted border-gray-400 pb-1">
                    <label className="uppercase font-bold w-24">DESTINATAIRE:</label>
                    <span className="flex-1 font-bold text-[#3e2723]">BANQUE NATIONALE DE SAINT-DENIS</span>
                </div>

                <div className="flex gap-2 items-baseline border-b border-dotted border-gray-400 pb-1">
                    <label className="uppercase font-bold w-24">EXPÉDITEUR:</label>
                    <input 
                        type="text" 
                        value={sender}
                        onChange={(e) => setSender(e.target.value.toUpperCase())}
                        className="flex-1 bg-transparent outline-none font-typewriter uppercase placeholder-gray-400"
                        placeholder="VOTRE NOM ICI"
                    />
                </div>

                <div className="relative mt-4 h-48 border border-gray-300 bg-[#fffdf5] p-2 shadow-inner">
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value.toUpperCase())}
                        className="w-full h-full bg-transparent outline-none resize-none font-typewriter uppercase leading-loose tracking-widest"
                        placeholder="STOP VOTRE MESSAGE ICI STOP"
                    />
                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                        <span className="font-western text-6xl rotate-[-15deg] block">URGENT</span>
                    </div>
                </div>

                <div className="text-xs text-center opacity-60 mt-2">
                    PRIX PAR MOT: 0.05$
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="mt-4 pt-4 border-t-2 border-black flex justify-between items-center">
                <div ref={statusRef} className="font-bold text-red-800">
                    {status === 'sending' && "TRANSMISSION EN COURS..."}
                    {status === 'sent' && "MESSAGE REÇU STOP"}
                </div>
                
                <button
                    ref={keyRef}
                    onClick={handleSend}
                    disabled={status !== 'idle'}
                    className={`
                        relative w-16 h-16 rounded-full bg-[#2b2b2b] border-4 border-[#5a5a5a] shadow-lg
                        flex items-center justify-center text-[#fdf6e3] font-bold text-xs hover:bg-[#3e2723]
                        active:shadow-none active:translate-y-1 transition-all
                        ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    KEY
                </button>
            </div>
        </div>
    );
};
