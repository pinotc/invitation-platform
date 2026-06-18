export const VideoSection = ({ data }: { data: any }) => {
  if (!data.videoUrl) return null;
  // Chuyển link Youtube thường sang link Embed
  const embedUrl = data.videoUrl.replace("watch?v=", "embed/");

  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-center font-serif text-rose-500 mb-6 italic text-xl">Khoảnh khắc tình yêu</h2>
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white">
        <iframe src={embedUrl} className="w-full h-full" allowFullScreen></iframe>
      </div>
    </section>
  );
};