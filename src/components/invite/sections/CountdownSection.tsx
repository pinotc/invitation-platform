"use client";

import { useEffect, useState } from "react";
import { SectionProps } from "@/types/invitation";

export const CountdownSection = ({ data }: SectionProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEventOver, setIsEventOver] = useState(false);

  useEffect(() => {
    const targetString = `${data.eventDate}T${data.eventTime || "00:00"}:00`;
    const targetDate = new Date(targetString).getTime();

    if (isNaN(targetDate)) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsEventOver(true);
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, [data.eventDate, data.eventTime]);

  return (
    <section className="py-16 bg-white flex flex-col items-center justify-center border-b border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-8 uppercase tracking-wider">Đếm ngược sự kiện</h2>
      
      {isEventOver ? (
        <div className="text-md font-medium text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full">
          ✨ Sự kiện đã được diễn ra thành công! ✨
        </div>
      ) : (
        <div className="flex gap-3 text-center">
          {[
            { label: "Ngày", value: timeLeft.days },
            { label: "Giờ", value: timeLeft.hours },
            { label: "Phút", value: timeLeft.minutes },
            { label: "Giây", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center w-16 h-18 bg-sky-50/50 rounded-2xl border border-sky-100/60 shadow-sm">
              <span className="text-2xl font-black text-slate-800">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};