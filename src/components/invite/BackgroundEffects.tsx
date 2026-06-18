"use client";

import { useEffect, useState } from "react";

export const BackgroundEffects = ({ type }: { type?: "hearts" | "snow" | "none" }) => {
  const [items, setItems] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    if (!type || type === "none") return;
    
    // Khởi tạo ngẫu nhiên 20 phần tử rơi tự do
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (type === "hearts" ? 16 : 8) + 8}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 4}s`
    }));
    setItems(generated);
  }, [type]);

  if (!type || type === "none") return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute top-[-20px] animate-fall block"
          style={{
            left: item.left,
            width: item.size,
            height: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
            opacity: Math.random() * 0.6 + 0.3,
          }}
        >
          {type === "hearts" ? (
            <svg viewBox="0 0 24 24" fill="#f43f5e"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <span className="w-full h-full bg-white rounded-full block shadow-sm"></span>
          )}
        </span>
      ))}
      
      {/* Inject Keyframe CSS trực tiếp để chạy diễn hoạt mượt mà */}
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(105vh) rotate(360deg); }
        }
        .animate-fall { animation-name: fall; animation-iteration-count: infinite; animation-timing-function: linear; }
      `}</style>
    </div>
  );
};