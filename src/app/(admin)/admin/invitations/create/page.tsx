import { prisma } from "@/lib/prisma";
import { createInvitation } from "@/app/actions/invitation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateInvitationPage() {
  const templates = await prisma.template.findMany();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/invitations" className="p-2 hover:bg-slate-200 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tạo thiệp mời mới</h2>
          <p className="text-sm text-slate-500">Khởi tạo thông tin cơ bản cho sự kiện.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        {/* Form gọi trực tiếp đến Server Action createInvitation */}
        <form action={createInvitation} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên sự kiện / Tên thiệp</label>
            <input 
              type="text" 
              name="title" 
              required
              placeholder="VD: Đám cưới Linh & Hùng"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-900 bg-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn tùy chỉnh (Slug)</label>
            <div className="flex items-center">
              <span className="bg-slate-50 border border-r-0 border-slate-300 text-slate-500 px-3 py-2 rounded-l-lg text-sm">
                /invite/
              </span>
              <input 
                type="text" 
                name="slug" 
                required
                placeholder="wedding-linh-hung"
                className="w-full px-4 py-2 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-slate-900 bg-white placeholder-slate-400"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Viết liền không dấu, ngăn cách bằng dấu gạch ngang.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Loại sự kiện</label>
              <select name="category" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition text-slate-900 bg-white placeholder-slate-400">
                <option value="WEDDING">Đám cưới</option>
                <option value="BIRTHDAY">Sinh nhật</option>
                <option value="ANNIVERSARY">Kỷ niệm</option>
                <option value="GRADUATION">Lễ tốt nghiệp</option>
                <option value="GRAND_OPENING">Khai trương</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mẫu giao diện (Template)</label>
              <select name="templateId" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition text-slate-900 bg-white placeholder-slate-400">
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm"
            >
              Tạo mới và Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}