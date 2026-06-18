"use client";

import { useState } from "react";
import { EnvelopeAnimation } from "../animations/EnvelopeAnimation";
import { CurtainAnimation } from "../animations/CurtainAnimation";
import { AudioPlayer } from "./AudioPlayer";

interface OpeningWrapperProps {
  animationType: string;
  title: string;
  musicUrl?: string;
  heroImage?: string;
  date?: string;
  children: React.ReactNode;
}

// Chuyển mảng trái tim ra ngoài để tối ưu, tăng thời gian rơi (duration) để tim bay lả lướt chậm rãi hơn
const floatingHearts = [
  { left: "5%", delay: "0s", duration: "8s", size: "14px" },
  { left: "15%", delay: "2s", duration: "10s", size: "18px" },
  { left: "25%", delay: "1s", duration: "9s", size: "12px" },
  { left: "35%", delay: "3s", duration: "11s", size: "20px" },
  { left: "45%", delay: "0.5s", duration: "8.5s", size: "16px" },
  { left: "55%", delay: "2.5s", duration: "10.5s", size: "15px" },
  { left: "65%", delay: "4s", duration: "9.5s", size: "17px" },
  { left: "75%", delay: "1.5s", duration: "8.2s", size: "13px" },
  { left: "85%", delay: "3.5s", duration: "11.5s", size: "19px" },
  { left: "95%", delay: "0.8s", duration: "9.2s", size: "14px" },
  { left: "10%", delay: "1.2s", duration: "8.8s", size: "16px" },
  { left: "20%", delay: "3.2s", duration: "10.2s", size: "14px" },
  { left: "30%", delay: "0.2s", duration: "8.6s", size: "18px" },
  { left: "50%", delay: "1.8s", duration: "9.6s", size: "20px" },
  { left: "70%", delay: "0.6s", duration: "8.4s", size: "15px" },
  { left: "90%", delay: "1.6s", duration: "9.4s", size: "13px" },
];

export const OpeningWrapper = ({ 
  animationType, 
  title, 
  musicUrl, 
  heroImage, 
  date, 
  children 
}: OpeningWrapperProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const renderAnimation = () => {
    if (animationType === "curtain") {
      return <CurtainAnimation title={title} onComplete={() => setIsOpened(true)} />;
    }
    
    return (
      <EnvelopeAnimation 
        heroImage={heroImage || ""} 
        eventName={title} 
        date={date} 
        onOpenComplete={() => setIsOpened(true)} 
      />
    );
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-900">
      {!isOpened && renderAnimation()}

      <div className={`transition-opacity duration-1000 relative ${isOpened ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
        
        {/* --- HIỆU ỨNG TRÁI TIM RƠI XUYÊN SUỐT THIỆP CHÍNH --- */}
        {isOpened && (
          <>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fallHeartGlobal {
                0% { transform: translateY(-10vh) rotate(0deg) scale(0.8); opacity: 0; }
                10% { opacity: 0.6; }
                90% { opacity: 0.4; }
                100% { transform: translateY(110vh) rotate(90deg) scale(1.2); opacity: 0; }
              }
            `}} />
            {/* Dùng fixed để tim bám theo màn hình khi cuộn trang, z-50 để nổi lên trên các thẻ */}
            <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
              {floatingHearts.map((h, i) => (
                <div
                  key={i}
                  className="absolute top-0 text-rose-400 drop-shadow-sm"
                  style={{
                    left: h.left,
                    fontSize: h.size,
                    animation: `fallHeartGlobal ${h.duration} linear ${h.delay} infinite`,
                  }}
                >
                  ♥
                </div>
              ))}
            </div>
          </>
        )}
        {/* --------------------------------------------------- */}

        {/* Đây là nơi hiển thị nội dung thiệp, hình ảnh, timeline... */}
        {children}
      </div>

      <AudioPlayer src={musicUrl} isOpened={isOpened} />
    </div>
  );
};