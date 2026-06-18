import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TemplateRenderer } from "@/components/invite/TemplateRender";
import { OpeningWrapper } from "@/components/invite/OpeningWrapper";
import { EventData, TemplateConfig } from "@/types/invitation";

export default async function PublicInvitationPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug: slug },
    include: { 
      images: true,
      music: true,
      template: true // <-- Nạp thêm bảng liên kết template gốc
    }
  });

  if (!invitation) notFound();

  const eventData = invitation.eventData as unknown as EventData;
  const themeConfig = invitation.themeConfig as unknown as TemplateConfig;

  // 1. TÌM ẢNH BÌA (HERO BANNER) TỪ DANH SÁCH ẢNH
  const heroImageObj = invitation.images.find(img => img.type === 'COVER');
  const heroImageUrl = heroImageObj?.url;

  // CƠ CHẾ QUYẾT ĐỊNH HIỆU ỨNG THÔNG MINH TOÀN DIỆN:
  // Nếu template chỉ định rõ là rèm cửa, hoặc admin chọn rèm cửa -> Bật rèm cửa (curtain). Ngược lại là phong bì (envelope)
  const baseTemplateConfig = invitation.template?.defaultConfig as any;
  
  const activeAnimation = 
    invitation.openingAnimation === "curtain" || 
    themeConfig?.openingAnimation === "curtain" || 
    baseTemplateConfig?.openingAnimation === "curtain"
      ? "curtain" 
      : "envelope";

  const displayTitle = eventData.brideName && eventData.groomName 
    ? `${eventData.brideName} & ${eventData.groomName}` 
    : eventData.eventName;

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-start sm:py-8">
      <div className="w-full sm:rounded-[2.5rem] sm:overflow-hidden sm:border-8 border-slate-800 shadow-2xl relative bg-white" style={{ maxWidth: '430px' }}>
        
        {/* 2. TRUYỀN HERO BANNER VÀ NGÀY THÁNG VÀO WRAPPER */}
        <OpeningWrapper 
          animationType={activeAnimation} 
          title={displayTitle}
          musicUrl={invitation.music?.url || undefined}
          heroImage={heroImageUrl} // <--- Thêm dòng này
          date={eventData.eventDate} // <--- Thêm ngày tổ chức để hiện trên phong bì
        >
          <TemplateRenderer 
            config={themeConfig} 
            data={eventData} 
            invitationId={invitation.id}
            images={invitation.images} 
          />
        </OpeningWrapper>
        
      </div>
    </main>
  );
}