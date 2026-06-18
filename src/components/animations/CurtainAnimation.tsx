"use client";
import { useRef, useState } from "react";
import gsap from "gsap";

export const CurtainAnimation = ({ onComplete, title }: { onComplete: () => void; title: string }) => {
  const leftCurtain = useRef(null);
  const rightCurtain = useRef(null);
  const sealRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({ onComplete });
    tl.to(sealRef.current, { scale: 0, rotation: 180, duration: 0.6, ease: "back.in" })
      .to(leftCurtain.current, { x: "-100%", duration: 1.4, ease: "power3.inOut" }, "-=0.2")
      .to(rightCurtain.current, { x: "100%", duration: 1.4, ease: "power3.inOut" }, "-=1.4");
  };

  return (
    <div className="absolute inset-0 z-[100] flex overflow-hidden bg-slate-950 select-none">
      {/* Rèm nhung trái */}
      <div ref={leftCurtain} className="w-1/2 h-full bg-[#8B0000] relative border-r border-yellow-600/20 shadow-[10px_0_30px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
      </div>
      
      {/* Rèm nhung phải */}
      <div ref={rightCurtain} className="w-1/2 h-full bg-[#8B0000] relative border-l border-yellow-600/20 shadow-[-10px_0_30px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
      </div>
      
      {/* Con dấu Hỷ dập nổi phong cách hoàng gia bằng Pure CSS */}
      <div ref={sealRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer" onClick={handleOpen}>
        <div className="w-28 h-28 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-[0_10px_30px_rgba(212,175,55,0.4)] relative active:scale-95 transition-transform animate-bounce">
          <div className="absolute inset-1.5 border border-yellow-200/30 rounded-full"></div>
          {/* Chữ Song Hỷ truyền thống */}
          <span className="font-serif font-black text-4xl text-amber-950 drop-shadow-md select-none">囍</span>
        </div>
        <p className="mt-4 text-yellow-400 font-serif italic text-xs tracking-widest bg-slate-950/40 px-4 py-1.5 rounded-full backdrop-blur-xs shadow-sm">
          Chạm để mở thiệp
        </p>
      </div>
    </div>
  );
};