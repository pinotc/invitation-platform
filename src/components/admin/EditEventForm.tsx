"use client";

import { updateEventData } from "@/app/actions/invitation";
import { EventData } from "@/types/invitation";
import { BlockInstance } from "@/types/block";
import { useState } from "react";
import { Loader2, Save, Sparkles, Layers } from "lucide-react";
import { TemplateBuilder } from "./builder/TemplateBuilder"; // Nhúng Builder
import { saveAsTemplate } from "@/app/actions/template";
import { GalleryManager } from "./GalleryManager";
import { MediaUpload } from "./MediaUpload";
import { fontOptions } from "@/lib/fonts";

interface EditEventFormProps {
  invitationId: string; 
  initialData: EventData;
  currentAnimation: string;
  themeConfig: any; // Nhận thêm prop này
}

export const EditEventForm = ({ invitationId, initialData, currentAnimation, themeConfig }: EditEventFormProps) => {
  const [isSaving, setIsSaving] = useState(false);

  // Chuẩn hóa dữ liệu cũ (mảng string) thành mảng BlockInstance để Builder hiểu được
  const normalizeInitialBlocks = (sections: any[]): any[] => {
    if (!sections || !Array.isArray(sections) || sections.length === 0) return [];
    if (typeof sections[0] === "string") {
      return sections.map((s, i) => ({ id: `blk_leg_${s}_${i}`, type: s, settings: {} }));
    }
    return sections;
  };
  
  const [isSavingDemo, setIsSavingDemo] = useState(false);
  const [blocks, setBlocks] = useState<BlockInstance[]>(() => normalizeInitialBlocks(themeConfig?.sections || []));
  const images = (initialData as any)?.images || [];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("id", invitationId);
    // Ép mảng blocks thành chuỗi JSON ẩn để gửi lên Server
    formData.append("blocksData", JSON.stringify(blocks));

    await updateEventData(formData);
    setIsSaving(false);
    alert("Đã lưu cấu hình thiệp và cấu trúc giao diện thành công!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. KHU VỰC CẤU HÌNH MEDIA (HERO, GALLERY & AUDIO) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        
        {/* Khu vực Ảnh Bìa */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-700">Ảnh bìa (Hero Banner)</h4>
          <MediaUpload 
            invitationId={invitationId} 
            type="COVER" 
            label="Tải ảnh bìa lên (1 ảnh)" 
          />
        </div>

        {/* Khu vực Gallery */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-700">Thư viện ảnh (Gallery)</h4>
          <GalleryManager 
            initialImages={images.filter((i: any) => i.type === 'GALLERY')} 
          />
          <MediaUpload 
            invitationId={invitationId} 
            type="GALLERY" 
            label="Thêm ảnh vào thư viện" 
          />
        </div>

        {/* Khu vực Nhạc nền (MỚI CHUYỂN VÀO ĐÂY) */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-700">Nhạc nền (Audio)</h4>
          <MediaUpload 
            invitationId={invitationId} 
            type="AUDIO" 
            label="Tải file mp3 lên" 
          />
        </div>
      </div>
      
      {/* 2. KHU VỰC BUILDER: KÉO THẢ GIAO DIỆN */}
      <div className="space-y-3">
        <div className="space-y-0.5">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-500" /> Cấu trúc Giao diện (Block Builder)
          </h4>
          <p className="text-sm text-slate-500">Kéo thả để sắp xếp lại bố cục hiển thị trên thiệp mời của bạn.</p>
        </div>
        
        <TemplateBuilder initialBlocks={blocks} onChange={setBlocks} />
      </div>

      <hr className="border-slate-200" />

      {/* 3. KHU VỰC CẤU HÌNH HIỆU ỨNG VÀ NỀN TOÀN CỤC */}
      <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Khối Animation mở màn */}
        <div className="flex-1 space-y-2 w-full">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" /> Phong cách mở màn
            </h4>
          </div>
          <select 
            name="openingAnimation" 
            defaultValue={currentAnimation || "envelope"} 
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-sm text-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="envelope">✉️ Mở nắp phong bì (Hiện đại)</option>
            <option value="curtain">囍 Kéo rèm đỏ & Con dấu Hỷ (Cổ điển)</option>
          </select>
        </div>

        {/* Khối Ảnh nền toàn cục (MỚI THÊM) */}
        <div className="flex-1 space-y-2 w-full border-t md:border-t-0 md:border-l border-sky-200/50 pt-4 md:pt-0 md:pl-6">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              Hình nền tổng thể (Global Background)
            </h4>
          </div>
          <input 
            type="text" 
            name="globalBgImage" 
            defaultValue={themeConfig?.styles?.backgroundImage || ""}
            placeholder="Dán link ảnh nền hoa lá..." 
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* 4. KHU VỰC DỮ LIỆU NỘI DUNG CHUNG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tên sự kiện</label>
          <input type="text" name="eventName" defaultValue={initialData.eventName} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tên chủ tiệc (Gia đình)</label>
          <input type="text" name="hostName" defaultValue={initialData.hostName} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" placeholder="VD: Nhà trai & Nhà gái" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tên Cô Dâu</label>
          <input type="text" name="brideName" defaultValue={initialData.brideName} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tên Chú Rể</label>
          <input type="text" name="groomName" defaultValue={initialData.groomName} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ngày tổ chức</label>
          <input type="date" name="eventDate" defaultValue={initialData.eventDate} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Giờ đón khách</label>
          <input type="time" name="eventTime" defaultValue={initialData.eventTime} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" required />
        </div>
      </div>

      {/* Thêm phần này vào trong form */}
      <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-6">
        {/* NHÀ TRAI */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase">Nhà Trai</h4>
          <input name="groomFatherName" defaultValue={initialData.groomFatherName} placeholder="Tên Bố Chồng" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" required />
          <input name="groomMotherName" defaultValue={initialData.groomMotherName} placeholder="Tên Mẹ Chồng" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
          <input name="groomAddress" defaultValue={initialData.groomAddress} placeholder="Địa chỉ Nhà Trai" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
        </div>

        {/* NHÀ GÁI */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase">Nhà Gái</h4>
          <input name="brideFatherName" defaultValue={initialData.brideFatherName} placeholder="Tên Bố Vợ" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
          <input name="brideMotherName" defaultValue={initialData.brideMotherName} placeholder="Tên Mẹ Vợ" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
          <input name="brideAddress" defaultValue={initialData.brideAddress} placeholder="Địa chỉ Nhà Gái" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ tổ chức</label>
        <input type="text" name="location" defaultValue={initialData.location} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" required />
      </div>

      <div>
        <label className="block text-xs text-slate-600 mb-1">Đường dẫn Google Maps (Chia sẻ)</label>
        <input 
          type="text" 
          name="googleMapsUrl" 
          defaultValue={initialData.googleMapsUrl} 
          placeholder="Dán link Google Maps tại đây..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" 
        />
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-4">
        <h4 className="text-sm font-semibold text-sky-600">Nội dung câu chuyện & Video Pre-Wedding</h4>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Lời tự sự / Câu chuyện tình yêu</label>
          <textarea name="storyText" rows={3} defaultValue={initialData.storyText} placeholder="Nhập đoạn trích dẫn tình yêu..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-900 bg-white placeholder-slate-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn Video cưới (Youtube Link)</label>
          <input type="url" name="videoUrl" defaultValue={initialData.videoUrl} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-900 bg-white placeholder-slate-400" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-sm font-semibold text-sky-600 mb-3">Cấu hình Hòm Mừng Cưới (QR Code tự động)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mã Ngân hàng (VietQR)</label>
            <select name="bankId" defaultValue={initialData.bankId || "MB"} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400">
              <option value="MB">MB Bank (Quân Đội)</option>
              <option value="VCB">Vietcombank</option>
              <option value="TCB">Techcombank</option>
              <option value="ACB">ACB</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên đầy đủ Ngân hàng</label>
            <input type="text" name="bankName" defaultValue={initialData.bankName} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Số tài khoản nhận mừng</label>
            <input type="text" name="bankAccount" defaultValue={initialData.bankAccount} placeholder="Nhập STK để kích hoạt hòm hỷ" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 bg-white placeholder-slate-400" />
          </div>
        </div>
      </div>

      {/* Nút Submit dính dưới màn hình cho tiện */}
      <div className="sticky bottom-4 z-50 pt-4 flex justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
        {/* Nút Lưu cấu hình thiệp */}
        <button 
          type="submit" 
          disabled={isSaving} 
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition shadow-md disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          Lưu cấu hình thiệp & Giao diện
        </button>

        {/* Nút Lưu làm mẫu Demo */}
        <button
          type="button"
          disabled={isSavingDemo}
          onClick={async () => {
            const name = prompt("Nhập tên cho mẫu demo này:");
            if (name) {
              setIsSavingDemo(true);
              const result = await saveAsTemplate(invitationId, name);
              
              if (result.success) {
                alert("Đã lưu thành mẫu demo!");
              } else {
                alert("Lỗi: " + result.message); // Bồ sẽ thấy thông báo lỗi thực sự ở đây
              }
              setIsSavingDemo(false);
            }
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold flex items-center transition shadow-md disabled:opacity-50"
        >
          {isSavingDemo ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Lưu làm mẫu Demo
        </button>
      </div>
    </form>
  );
};