import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TemplateRenderer } from "@/components/invite/TemplateRender";
import { OpeningWrapper } from "@/components/invite/OpeningWrapper";
import { EventData, TemplateConfig } from "@/types/invitation";
import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react";

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const template = await prisma.template.findUnique({
    where: { id }
  });

  if (!template) notFound();

  const themeConfig = template.defaultConfig as unknown as TemplateConfig;
  
  // ĐỌC ĐỘNG HIỆU ỨNG TỪ TEMPLATE GỐC (Sửa lỗi hardcode envelope)
  const activeAnimation = (themeConfig as any).openingAnimation || "envelope";

  const mockEventData: EventData = {
    eventName: `Mẫu thử: ${template.name}`,
    brideName: "Pudy Phạm",
    groomName: "Kevin Nguyễn",
    eventDate: "2026-12-25", 
    eventTime: "18:00",
    location: "Trung tâm Hội nghị White Palace, Hoàng Văn Thụ, TP. Hồ Chí Minh",
    googleMapsUrl: "https://maps.google.com",
    hostName: "Gia đình hai họ Trần & Nguyễn",
    bankAccount: "099999999999", 
    bankId: "MB",
    bankName: "Ngân hàng Quân Đội (MB Bank)",
    storyText: "Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người không hoàn hảo.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  const mockImages = [
    { id: "1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500", type: "GALLERY" },
    { id: "2", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500", type: "GALLERY" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <div className="w-full bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between z-50 text-white">
        <Link href="/admin/templates" className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Quay lại kho mẫu
        </Link>
        <span className="text-sm font-semibold tracking-wide text-sky-400 flex items-center gap-2">
          <Smartphone className="w-4 h-4" /> CHẾ ĐỘ XEM THỬ MOBILE ({activeAnimation.toUpperCase()})
        </span>
        <div className="w-28"></div>
      </div>

      <div className="w-full max-w-[420px] sm:my-6 sm:rounded-[2.5rem] sm:overflow-hidden sm:border-[10px] border-slate-800 shadow-2xl relative bg-white min-h-[840px]">
        {/* Truyền động hiệu ứng activeAnimation vào đây */}
        <OpeningWrapper 
          animationType={activeAnimation} 
          title={`${mockEventData.groomName} & ${mockEventData.brideName}`}
        >
          <TemplateRenderer 
            config={themeConfig} 
            data={mockEventData} 
            invitationId="demo-id"
            images={mockImages}
          />
        </OpeningWrapper>
      </div>
    </div>
  );
}