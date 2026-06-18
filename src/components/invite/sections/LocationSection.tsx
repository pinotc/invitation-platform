import { SectionProps } from "@/types/invitation";

export const LocationSection = ({ data }: SectionProps) => {
  // Hàm này giúp biến link Google Maps bình thường thành link nhúng (embed)
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    // Nếu đã là link embed thì trả về luôn, nếu là link share thì đổi sang embed
    if (url.includes("embed")) return url;
    return url.replace("/maps/", "/maps/embed/");
  };

  const mapUrl = getEmbedUrl(data.googleMapsUrl);

  return (
    <section className="py-12 px-6 bg-transparent">
      <h2 className="text-center font-serif text-[#2d4628] text-xl font-bold mb-6 uppercase tracking-widest">
        Địa điểm tổ chức
      </h2>
      
      <div className="bg-white/70 p-4 rounded-2xl border border-[#2d4628]/10 shadow-sm">
        <p className="text-center text-sm text-[#2d4628] font-medium mb-4">
          {data.location || "Chưa cập nhật địa điểm"}
        </p>
        
        {mapUrl ? (
          <div className="w-full h-64 rounded-xl overflow-hidden border border-[#2d4628]/10">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
            Chưa có bản đồ
          </div>
        )}
      </div>
    </section>
  );
};