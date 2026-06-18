import { SectionProps } from "@/types/invitation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const HeroSection = ({ data, theme, images }: SectionProps) => {
  const heroImage = images?.find((img: any) => img.type === 'COVER') || images?.[0];

  return (
    <section className="relative w-full aspect-[3/4] md:aspect-[9/16] overflow-hidden bg-slate-100">
      {heroImage ? (
        <Image
          src={heroImage.url}
          alt={data.eventName || "Hero Banner"}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 500px"
        />
      ) : (
        /* Fallback nếu chưa upload ảnh */
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
          <p className="font-serif text-2xl">{data.brideName} & {data.groomName}</p>
          <p className="text-sm mt-2">Vui lòng tải ảnh bìa thiết kế tại mục quản lý hình ảnh</p>
        </div>
      )}

      {/* Hiệu ứng phủ (Overlay) nhẹ theo theme để ảnh sang hơn */}
      <div className={cn(
        "absolute inset-0 bg-black/0 transition-colors",
        theme === "korean_wedding" && "bg-rose-900/10",
        theme === "dark_luxury" && "bg-black/20"
      )} />
      
      {/* Nếu bồ muốn giữ một chút thông tin nhỏ đè lên ảnh (tùy chọn) */}
      <div className="absolute bottom-8 left-0 right-0 text-center px-6">
         {/* Để trống nếu bồ muốn ảnh thiết kế của bồ hiển thị full 100% không text */}
      </div>
    </section>
  );
};