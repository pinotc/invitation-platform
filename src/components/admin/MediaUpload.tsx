"use client";

import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { uploadMedia } from "@/app/actions/upload";

interface MediaUploadProps {
  invitationId: string;
  type: "COVER" | "GALLERY" | "AUDIO"; // Thêm type AUDIO
  label: string;
}

export const MediaUpload = ({ invitationId, type, label }: MediaUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("invitationId", invitationId);
    formData.append("type", type);

    try {
      await uploadMedia(formData);
      e.target.value = "";
      alert("Tải lên thành công!");
    } catch (error) {
      alert("Tải lên thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  // Tự động lọc đuôi file theo định dạng chuẩn mobile
  const acceptTypes = type === "AUDIO" ? "audio/*" : "image/*";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <label className="relative flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-sky-400 transition cursor-pointer group">
        <input 
          type="file" 
          accept={acceptTypes} 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <div className="flex items-center gap-2 text-slate-500 group-hover:text-sky-600">
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {isUploading ? "Đang xử lý dữ liệu..." : "Bấm để chọn tệp tin"}
          </span>
        </div>
      </label>
    </div>
  );
};