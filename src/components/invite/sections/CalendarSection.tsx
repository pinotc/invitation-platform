"use client";
import { SectionProps } from "@/types/invitation";

export const CalendarSection = ({ data }: SectionProps) => {
  const date = new Date(data.eventDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <section className="py-12 px-6 bg-white flex flex-col items-center">
      <div className="w-full max-w-sm border-2 border-rose-100 rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="font-serif text-rose-500 text-xl uppercase tracking-widest">Tháng {month} / {year}</h3>
          <div className="h-0.5 w-12 bg-rose-200 mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-medium text-slate-400">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => <div key={d}>{d}</div>)}
          {/* Mockup nhanh 1 tháng - Trong thực tế bồ có thể dùng thư viện date-fns để tính toán */}
          {Array.from({ length: 31 }).map((_, i) => {
            const currentDay = i + 1;
            const isWeddingDay = currentDay === day;
            return (
              <div key={i} className="relative py-2 text-slate-700">
                {currentDay}
                {isWeddingDay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Vòng tròn tô màu xanh lá thẫm */}
                    <div className="w-8 h-8 bg-[#2d4628] rounded-full flex items-center justify-center text-white shadow-lg">
                      {currentDay}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};