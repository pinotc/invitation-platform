"use client"; // Khai báo đây là Client Component để dùng được onClick

import { Eye } from "lucide-react";

interface TemplateStyleButtonProps {
  primaryColor: string;
  backgroundColor: string;
}

export const TemplateStyleButton = ({ primaryColor, backgroundColor }: TemplateStyleButtonProps) => {
  return (
    <button 
      onClick={() => alert(`Cấu hình CSS mặc định:\n\nMàu chủ đạo: ${primaryColor}\nMàu nền: ${backgroundColor}`)} 
      className="inline-flex items-center gap-1.5 font-semibold text-sky-600 hover:text-sky-700 transition"
    >
      <Eye className="w-3.5 h-3.5" />
      Xem Style gốc
    </button>
  );
};