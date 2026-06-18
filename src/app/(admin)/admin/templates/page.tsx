import { prisma } from "@/lib/prisma";
import { Layout, Layers, Calendar } from "lucide-react";
// Import nút bấm Client Component mới tạo vào đây:
import { TemplateStyleButton } from "@/components/admin/TemplateStyleButton";
import Link from "next/link"; // <-- Thêm dòng này lên trên cùng file

export default async function TemplatesPage() {
  // Lấy danh sách template từ Database (Vẫn chạy mượt mà trên Server)
  const templates = await prisma.template.findMany({
    include: {
      _count: {
        select: { invitations: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "WEDDING":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "BIRTHDAY":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-sky-50 text-sky-700 border-sky-100";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Layout className="w-6 h-6 text-sky-500" />
          Kho mẫu giao diện (Templates)
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Quản lý và cấu hình các mẫu thiết kế thiệp mời hệ thống hỗ trợ.
        </p>
      </div>

      {/* Grid Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.length === 0 ? (
          <div className="col-span-full bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-400">
            Chưa có mẫu giao diện nào trong Database. Bạn cần chạy lệnh `npx prisma db seed`.
          </div>
        ) : (
          templates.map((template) => {
            const config = (template.defaultConfig as any) || {};
            const sectionCount = Array.isArray(config.sections) ? config.sections.length : 0;

            return (
              <div 
                key={template.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
              >
                {/* Preview Banner */}
                <div 
                  className="h-32 w-full relative flex items-end p-4 transition-colors group-hover:opacity-95"
                  style={{ backgroundColor: config.styles?.backgroundColor || '#f0f9ff' }}
                >
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                  
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-slate-700">
                    <Layers className="w-5 h-5" style={{ color: config.styles?.primaryColor }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-sky-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">ID: {template.id.substring(0, 8)}...</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-center">
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Cấu trúc khối</span>
                      <span className="text-sm font-bold text-slate-700 mt-0.5">{sectionCount} Sections</span>
                    </div>
                    <div className="bg-sky-50/50 p-2.5 rounded-xl border border-sky-100/40 flex flex-col justify-center">
                      <span className="text-[11px] font-medium text-sky-500 uppercase tracking-wider">Đang sử dụng</span>
                      <span className="text-sm font-black text-sky-700 mt-0.5">{template._count.invitations} thiệp</span>
                    </div>
                  </div>

                  {/* Ordering lists */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-1.5">Trình tự hiển thị:</span>
                    <div className="flex flex-wrap gap-1">
                      {(() => {
                        // Ép kiểu config.sections thành mảng an toàn
                        const rawSections = config.sections;
                        const sectionArray = Array.isArray(rawSections) 
                          ? rawSections 
                          : (rawSections && typeof rawSections === 'object') 
                            ? Object.values(rawSections) 
                            : [];

                        return sectionArray.length > 0 ? (
                          sectionArray.map((sec: any, idx: number) => {
                            // Lấy giá trị chuỗi (ví dụ: 'hero') từ object block nếu cần
                            const label = typeof sec === 'string' ? sec : (sec?.type || "unknown");
                            return (
                              <span key={idx} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-md capitalize">
                                {label}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-400 italic">Trống</span>
                        );
                      })()}
                    </div>
                  </div>

                  <hr className="border-slate-100 !my-4" />

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(template.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    
                    {/* Cụm nút bấm tương tác */}
                    <div className="flex items-center gap-3">
                        {/* Thêm link Xem Demo động */}
                        <Link href={`/admin/templates/preview/${template.id}`}className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors py-1 px-2 hover:bg-emerald-50 rounded-md">Xem Demo</Link>
                        <TemplateStyleButton 
                        primaryColor={config.styles?.primaryColor || '#000000'} 
                        backgroundColor={config.styles?.backgroundColor || '#ffffff'} 
                        />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}