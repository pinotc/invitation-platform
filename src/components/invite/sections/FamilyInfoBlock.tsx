import { SectionProps } from "@/types/invitation";

export const FamilyInfoBlock = ({ data, settings }: SectionProps) => {
  const showAddress = settings?.showAddress !== false;
  const isStacked = settings?.layout === "stacked";

  const commonTitle = "text-[#2d4628] font-serif text-xl font-bold mb-4 uppercase tracking-widest";
  const nameStyle = "text-slate-800 font-serif text-lg font-semibold leading-tight";
  const addressStyle = "text-slate-500 text-[11px] mt-1 italic leading-relaxed max-w-[150px] mx-auto";

  return (
    <section className="py-20 px-8 bg-transparent text-center">
      <div className={`grid ${isStacked ? 'grid-cols-1 gap-16' : 'grid-cols-2 gap-6'}`}>
        {/* Nhà trai */}
        <div className="space-y-5">
          <h3 className={commonTitle}>Nhà Trai</h3>
          <div className="space-y-1">
            <p className="text-[9px] text-rose-400 uppercase tracking-widest mb-1">Ông Bà</p>
            <p className={nameStyle}>{data.groomFatherName || "Tên Bố"}</p>
            <p className={nameStyle}>{data.groomMotherName || "Tên Mẹ"}</p>
            {showAddress && <p className={addressStyle}>{data.groomAddress || "Địa chỉ nhà trai"}</p>}
          </div>
        </div>

        {/* Nhà gái */}
        <div className="space-y-5">
          <h3 className={commonTitle}>Nhà Gái</h3>
          <div className="space-y-1">
            <p className="text-[9px] text-rose-400 uppercase tracking-widest mb-1">Ông Bà</p>
            <p className={nameStyle}>{data.brideFatherName || "Tên Bố"}</p>
            <p className={nameStyle}>{data.brideMotherName || "Tên Mẹ"}</p>
            {showAddress && <p className={addressStyle}>{data.brideAddress || "Địa chỉ nhà gái"}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};