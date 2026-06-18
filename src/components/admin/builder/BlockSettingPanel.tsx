"use client";

import { BlockInstance } from "@/types/block";
import { Blocks } from "@/registry/BlockRegistry";
import { Plus, Trash2, Clock, MapPin } from "lucide-react";

interface BlockSettingsPanelProps {
  activeBlock: BlockInstance;
  onUpdateSettings: (newSettings: any) => void;
}

export const BlockSettingsPanel = ({ activeBlock, onUpdateSettings }: BlockSettingsPanelProps) => {
  const blockDef = Blocks[activeBlock.type];
  const settings = activeBlock.settings || {};

  const handleChange = (key: string, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  if (!blockDef) return <div className="text-sm text-slate-500">Block không hợp lệ.</div>;

  return (
    <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 1. Cấu hình cho Block GALLERY */}
      {activeBlock.type === "gallery" && (
        <div className="space-y-5">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Bố cục lưới</h5>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Số cột hiển thị</label>
              <select 
                value={settings.columns || 2} 
                onChange={(e) => handleChange("columns", Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-900"
              >
                <option value={2}>2 Cột (Thư giãn, to rõ)</option>
                <option value={3}>3 Cột (Lưới Instagram)</option>
                <option value={4}>4 Cột (Dành cho màn hình ngang)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Khoảng cách ảnh (Gap)</label>
              <select 
                value={settings.gap || "md"} 
                onChange={(e) => handleChange("gap", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-900"
              >
                <option value="none">Không viền (Dính liền nhau)</option>
                <option value="sm">Nhỏ (Gọn gàng)</option>
                <option value="md">Trung bình (Thoáng đãng)</option>
                <option value="lg">Lớn (Nghệ thuật)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Kiểu dáng khung ảnh</h5>
            
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Tỷ lệ khung hình (Shape)</label>
              <select 
                value={settings.shape || "arch"} 
                onChange={(e) => handleChange("shape", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-900"
              >
                <option value="arch">Vòm cửa (Lãng mạn, Cổ điển)</option>
                <option value="square">Vuông 1:1 (Hiện đại)</option>
                <option value="portrait">Dọc 3:4 (Chân dung)</option>
                <option value="landscape">Ngang 4:3 (Phong cảnh)</option>
              </select>
            </div>

            {settings.shape !== "arch" && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Độ bo góc (Border Radius)</label>
                <select 
                  value={settings.borderRadius || "xl"} 
                  onChange={(e) => handleChange("borderRadius", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-900"
                >
                  <option value="none">Vuông vức (0px)</option>
                  <option value="md">Nhẹ nhàng (8px)</option>
                  <option value="xl">Bo tròn vừa (12px)</option>
                  <option value="2xl">Bo tròn nhiều (16px)</option>
                  <option value="full">Tròn xoe (Circle)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Hiệu ứng nổi (Box Shadow)</label>
              <select 
                value={settings.boxShadow || "md"} 
                onChange={(e) => handleChange("boxShadow", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-900"
              >
                <option value="none">Phẳng (Không bóng)</option>
                <option value="sm">Đổ bóng mờ (Nhẹ nhàng)</option>
                <option value="md">Đổ bóng vừa (Tiêu chuẩn)</option>
                <option value="xl">Nổi bật (Shadow XL)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 2. Cấu hình cho Block HERO */}
      {activeBlock.type === "hero" && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Lớp phủ đen nền (Overlay)</label>
            <input 
              type="range" min="0" max="100" step="10"
              value={settings.overlayOpacity || 30}
              onChange={(e) => handleChange("overlayOpacity", Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="text-right text-xs font-mono text-sky-600">{settings.overlayOpacity || 30}%</div>
          </div>
        </div>
      )}

      {/* Fallback */}
      {!["gallery", "hero"].includes(activeBlock.type) && (
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
          <p className="text-sm text-slate-500">Block này hiện chưa có thuộc tính cài đặt riêng.</p>
        </div>
      )}

      {/* CẤU HÌNH CHO BLOCK TIMELINE (LỊCH TRÌNH) */}
      {activeBlock.type === "timeline" && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <h5 className="text-xs font-bold text-slate-800 uppercase mb-4 flex justify-between items-center">
              Các mốc thời gian
              <button 
                type="button" // <--- THÊM DÒNG NÀY VÀO ĐỂ CHẶN SUBMIT
                onClick={() => {
                  const currentItems = settings.items || [];
                  handleChange("items", [...currentItems, { time: "18:00", label: "Tiêu đề mới" }]);
                }}
                className="p-1.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </h5>

            <div className="space-y-3">
              {(settings.items || []).map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 relative group">
                  <button
                    type="button" // <--- THÊM DÒNG NÀY VÀO ĐỂ CHẶN SUBMIT
                    onClick={() => {
                      const newItems = settings.items.filter((_: any, i: number) => i !== idx);
                      handleChange("items", newItems);
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  
                  <div className="flex gap-2">
                    <div className="w-20">
                      <input 
                        type="text" 
                        value={item.time} 
                        onChange={(e) => {
                          const newItems = [...settings.items];
                          newItems[idx].time = e.target.value;
                          handleChange("items", newItems);
                        }}
                        placeholder="18:00"
                        className="w-full px-2 py-1.5 border border-slate-100 rounded bg-slate-50 text-xs font-mono outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={item.label} 
                        onChange={(e) => {
                          const newItems = [...settings.items];
                          newItems[idx].label = e.target.value;
                          handleChange("items", newItems);
                        }}
                        placeholder="Tên sự kiện"
                        className="w-full px-2 py-1.5 border border-slate-100 rounded bg-slate-50 text-xs font-medium outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {(settings.items || []).length === 0 && (
                <p className="text-[11px] text-slate-400 text-center py-4 italic">Bấm dấu + để thêm lịch trình</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CẤU HÌNH CHO BLOCK FAMILY_INFO (THÔNG TIN GIA ĐÌNH) */}
      {activeBlock.type === "family_info" && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-slate-800 uppercase mb-2">Tùy chỉnh hiển thị</h5>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Kiểu trình bày</label>
              <select 
                value={settings.layout || "classic"} 
                onChange={(e) => handleChange("layout", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
              >
                <option value="classic">Cổ điển (2 Cột)</option>
                <option value="stacked">Hiện đại (Dọc)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={settings.showAddress !== false}
                onChange={(e) => handleChange("showAddress", e.target.checked)}
                className="w-4 h-4 accent-sky-500"
              />
              <span className="text-xs text-slate-700">Hiển thị địa chỉ gia đình</span>
            </div>
          </div>
          <p className="text-[10px] text-rose-500 italic px-2">
            * Lưu ý: Tên cha mẹ và địa chỉ được lấy từ mục "Thông tin sự kiện" ở tab bên cạnh.
          </p>
        </div>
      )}
    </div>
  );
};