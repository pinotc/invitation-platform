"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EnvelopeAnimationProps {
  heroImage: string;
  eventName?: string;
  date?: string;
  onOpenComplete?: () => void; 
}

export const EnvelopeAnimation = ({ heroImage, eventName = "Wedding Invitation", date, onOpenComplete }: EnvelopeAnimationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Đợi hiệu ứng chạy xong (khoảng 1.5s - 2s) rồi gọi hàm onOpenComplete (ví dụ: cuộn trang, ẩn phong bì...)
    if (onOpenComplete) {
      setTimeout(() => onOpenComplete(), 1800);
    }
  };


  return (
    <div className="relative w-full h-screen bg-[#fafaf8] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Khung viền và Text trang trí */}
      <div className="absolute top-10 w-full text-center space-y-4 z-10">
        <div className="flex justify-center gap-12 text-xs tracking-[0.2em] text-slate-500 uppercase">
          <span>You Are</span>
          <span>The Love Of</span>
          <span>My Life</span>
        </div>
        <h1 className="font-serif text-5xl text-slate-800 tracking-wider mt-4">
          {eventName}
        </h1>
        {!isOpen && (
          <p className="text-sm font-light text-slate-500 italic animate-pulse mt-12">
            Chạm để mở thiệp
          </p>
        )}
      </div>

      {/* KHU VỰC PHONG BÌ & ẢNH */}
      <div 
        className="relative w-[320px] h-[220px] mt-20 cursor-pointer perspective-[1200px]"
        onClick={handleOpen}
      >
        {/* 1. Mặt sau của phong bì */}
        <div className="absolute inset-0 bg-[#d9d0c5] rounded-md shadow-md" />

        {/* 2. Tấm thẻ (Hero Image) - Sẽ rút lên khi mở */}
        <div 
          className={cn(
            "absolute bottom-2 left-2 right-2 h-[260px] bg-white p-2 rounded shadow-lg transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
            isOpen ? "-translate-y-[160px] z-20 scale-105" : "translate-y-0 z-10"
          )}
        >
          <div className="relative w-full h-full bg-slate-100 overflow-hidden rounded-[2px]">
            {heroImage ? (
              <Image 
                src={heroImage} 
                alt="Hero Banner" 
                fill 
                className="object-contain drop-shadow-sm"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                Chưa có ảnh bìa
              </div>
            )}
          </div>
        </div>

        {/* 3. Mặt trước của phong bì (Phần túi dưới) */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-md">
          <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[130px] border-l-transparent border-r-transparent border-b-[#e3dbd1] drop-shadow-md" />
          <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[110px] border-b-[110px] border-l-[160px] border-t-transparent border-b-transparent border-l-[#ded6cb]" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[110px] border-b-[110px] border-r-[160px] border-t-transparent border-b-transparent border-r-[#ded6cb]" />
        </div>

        {/* 4. Nắp phong bì (Top Flap) - Sẽ lật lên */}
        <div 
          className={cn(
            "absolute top-0 left-0 w-full h-[140px] origin-top transition-all duration-700 ease-in-out",
            isOpen ? "[transform:rotateX(180deg)] z-0 opacity-0" : "[transform:rotateX(0deg)] z-40"
          )}
        >
          <div className="absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[130px] border-l-transparent border-r-transparent border-t-[#e8e1d7] drop-shadow-md" />
          <div className="absolute left-1/2 bottom-[10px] -translate-x-1/2 w-10 h-10 bg-[#a67c52] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.2)] flex items-center justify-center border-2 border-[#8a6541]">
             <span className="text-white/80 font-serif text-xs">♡</span>
          </div>
        </div>
      </div>

      {/* Thông tin phía dưới */}
      <div className={cn(
        "absolute bottom-12 text-center transition-opacity duration-1000",
        isOpen ? "opacity-100" : "opacity-30"
      )}>
        <p className="text-sm font-serif text-slate-600">TRÂN TRỌNG KÍNH MỜI</p>
        <div className="mt-6 font-serif text-3xl text-[#bca586]">
          {date || "25.10.2025"}
        </div>
      </div>

    </div>
  );
};