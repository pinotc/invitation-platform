export const StorySection = ({ data }: { data: any }) => {
  return (
    <section className="py-16 px-8 bg-[#fffaf0] italic font-serif text-slate-700 leading-relaxed text-center space-y-8">
      <div className="relative">
        <div className="text-4xl text-rose-200 absolute -top-4 -left-2">“</div>
        <p className="relative z-10 px-4">{data.storyText || "Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người không hoàn hảo."}</p>
        <div className="text-4xl text-rose-200 absolute -bottom-8 -right-2">”</div>
      </div>
      <div className="w-16 h-[1px] bg-rose-200 mx-auto"></div>
    </section>
  );
};