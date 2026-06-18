"use client";

import { useState } from "react";
import { SectionProps } from "@/types/invitation";
import { X } from "lucide-react";

export const GallerySection = ({ data, images, settings }: SectionProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  // 1. Lấy dữ liệu cấu hình từ DB (có fallback mặc định)
  const columns = Number(settings?.columns) || 2; 
  const gapType = settings?.gap || "md";
  const shape = settings?.shape || "arch";
  const radius = settings?.borderRadius || "xl";
  const shadow = settings?.boxShadow || "md";
  const galleryImages = images?.filter((img: any) => img.type === 'GALLERY') || [];
  // 2. Ánh xạ Class Lưới & Khoảng cách
  const gapClass = gapType === "none" ? "gap-0" : gapType === "sm" ? "gap-2" : gapType === "lg" ? "gap-6 sm:gap-8" : "gap-4 sm:gap-6";
  const gridClass = columns === 3 ? "grid-cols-3" : columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2";

  // 3. Ánh xạ Kiểu dáng khung hình (Aspect Ratio) & Bo góc (Border Radius)
  let aspectClass = "aspect-square";
  let roundedClass = "";

  if (shape === "arch") {
    aspectClass = "aspect-[3/4]";
    roundedClass = "rounded-t-full rounded-b-2xl"; // Vòm thì fix cứng bo góc
  } else {
    // Nếu không phải vòm thì áp dụng tỷ lệ ngang/dọc/vuông
    aspectClass = shape === "portrait" ? "aspect-[3/4]" : shape === "landscape" ? "aspect-[4/3]" : "aspect-square";
    // Áp dụng độ bo góc người dùng chọn
    const radiusMap: Record<string, string> = {
      none: "rounded-none",
      md: "rounded-md",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full"
    };
    roundedClass = radiusMap[radius] || "rounded-xl";
  }

  // 4. Ánh xạ Bóng đổ (Box Shadow)
  const shadowMap: Record<string, string> = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    xl: "shadow-xl"
  };
  const shadowClass = shadowMap[shadow] || "shadow-md";

  return (
    <section className="py-20 px-6 bg-[#fffaf0] relative">
      <div className="text-center mb-14">
        <h2 className="font-serif text-4xl font-bold text-rose-800 mb-4 italic tracking-wide">
          Khoảnh Khắc
        </h2>
        <div className="h-[1px] w-24 bg-rose-300 mx-auto mb-4"></div>
        <p className="text-xs text-slate-500 font-light tracking-[0.2em] uppercase">
          Lưu giữ yêu thương
        </p>
      </div>

      <div className={`grid ${gridClass} ${gapClass} max-w-5xl mx-auto`}>
        {galleryImages.map((img, index) => (
          <div 
            key={img.id || index} 
            onClick={() => setSelectedImg(img.url)}
            // Áp dụng DYNAMIC CLASSES vào đây
            className={`${aspectClass} ${roundedClass} ${shadowClass} relative overflow-hidden bg-slate-100 group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ring-1 ring-black/5`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.url} 
              alt={`Gallery Image ${index + 1}`} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 group-hover:to-black/40 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={selectedImg} 
            alt="Zoomed Event Image"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};