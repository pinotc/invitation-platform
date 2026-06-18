import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon, FileText, Users } from "lucide-react";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { EditEventForm } from "@/components/admin/EditEventForm";
import { EventData } from "@/types/invitation";

export default async function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!invitation) return <div>Không tìm thấy thiệp mời</div>;

  const galleryImages = invitation.images.filter(img => img.type === "GALLERY");
  const heroImages = invitation.images?.filter((img: any) => img.type === 'COVER') || [];
  const eventData = invitation.eventData as unknown as EventData;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/invitations" className="p-2 hover:bg-slate-200 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Quản lý thiệp: {invitation.title}</h2>
            <Link href={`/invite/${invitation.slug}`} target="_blank" className="text-sm text-sky-600 hover:underline">
              /invite/{invitation.slug}
            </Link>
          </div>
        </div>
        
        {/* Nút sang trang xem danh sách khách mời */}
        <Link 
          href={`/admin/invitations/${invitation.id}/rsvps`} 
          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg font-medium flex items-center transition"
        >
          <Users className="w-5 h-5 mr-2" />
          Danh sách khách (RSVP)
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột 1: Chỉnh sửa thông tin sự kiện (Chiếm 2 phần) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800 mb-6 pb-4 border-b border-slate-100">
            <FileText className="w-5 h-5 text-sky-500" />
            Thông tin chi tiết
          </h3>
          <EditEventForm 
            invitationId={invitation.id} 
            initialData={eventData} 
            currentAnimation={invitation.openingAnimation || ""} 
            themeConfig={invitation.themeConfig}
          />
        </div>
        {/* Cột 2: Upload Media (Chiếm 1 phần) */}
        <div className="space-y-6">
          
          {/* 1. KHUNG HIỂN THỊ HERO BANNER */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-slate-800 flex items-center justify-between">
              <span>Ảnh bìa (Hero)</span>
              <span className="bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full text-xs">{heroImages.length}/1</span>
            </h3>
            
            {/* Dùng grid-cols-1 vì ảnh bìa thường chỉ có 1 tấm và cần hiện to */}
            <div className="grid grid-cols-1 gap-2">
              {heroImages.length > 0 ? (
                heroImages.map((img: any) => (
                  <div key={img.id} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="Hero Banner" className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-400">Chưa có ảnh bìa</p>
                </div>
              )}
            </div>
          </div>

          {/* 2. KHUNG HIỂN THỊ ALBUM GALLERY */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-slate-800 flex items-center justify-between">
              <span>Gallery</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{galleryImages.length}</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {galleryImages.map((img: any) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}