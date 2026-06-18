import { SectionProps } from "@/types/invitation";

export const TimelineBlock = ({ settings }: SectionProps) => {
  // Ưu tiên lấy từ settings do người dùng nhập, nếu không có mới dùng demo
  const timelineItems = settings?.items || [
    { time: "17:30", label: "Đón khách" },
    { time: "18:30", label: "Khai tiệc" },
    { time: "21:00", label: "Kết thúc tiệc" },
  ];

  return (
    <section className="py-16 px-10 bg-transparent">
      <h2 className="text-center font-serif text-[#2d4628] text-2xl font-bold mb-12 uppercase tracking-[0.2em]">
        Lịch trình
      </h2>
      
      <div className="relative max-w-xs mx-auto">
        {/* Đường kẻ dọc */}
        <div className="absolute left-[52px] top-0 bottom-0 w-[1px] bg-[#2d4628]/20"></div>
        
        <div className="space-y-12">
          {timelineItems.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-10">
              <span className="w-10 text-right text-sm font-serif text-slate-500 font-medium tracking-tighter">
                {item.time}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2d4628] z-10 shadow-[0_0_0_4px_rgba(45,70,40,0.1)]"></div>
              <span className="text-slate-800 font-medium text-sm tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};