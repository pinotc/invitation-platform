"use client";

import { SectionProps } from "@/types/invitation";
import { useState } from "react";
import { submitRsvp } from "@/app/actions/rsvp";
import { CheckCircle2, Loader2 } from "lucide-react";

export const RsvpSection = ({ data, config, invitationId }: SectionProps & { invitationId?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!invitationId) return;
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("invitationId", invitationId);

    try {
      await submitRsvp(formData);
      setIsSuccess(true);
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-16 px-6 bg-sky-50 flex flex-col items-center text-center min-h-[400px] justify-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cảm ơn bạn!</h2>
        <p className="text-slate-600">Phản hồi của bạn đã được gửi đến chủ tiệc.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-white flex flex-col items-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Xác nhận tham dự</h2>
      <p className="text-slate-500 text-sm mb-8 text-center">Vui lòng phản hồi trước ngày sự kiện để chúng tôi chuẩn bị chu đáo nhất.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input type="text" name="name" required placeholder="Tên của bạn" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none transition text-slate-900 bg-white placeholder-slate-400" />
        
        <input type="tel" name="phone" placeholder="Số điện thoại (Tuỳ chọn)" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none transition text-slate-900 bg-white placeholder-slate-400" />
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select name="status" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none transition appearance-none text-slate-900 bg-white placeholder-slate-400">
            <option value="ATTENDING">Sẽ tham dự</option>
            <option value="DECLINED">Rất tiếc không thể đến</option>
            <option value="UNSURE">Chưa chắc chắn</option>
          </select>
          <select name="guestsCount" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none transition appearance-none text-slate-900 bg-white placeholder-slate-400">
            <option value="1">Đi 1 mình</option>
            <option value="2">Đi 2 người</option>
            <option value="3">Đi 3 người</option>
          </select>
        </div>

        <textarea name="message" rows={3} placeholder="Lời chúc gửi đến chủ tiệc..." className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-200 outline-none transition resize-none text-slate-900 bg-white placeholder-slate-400"></textarea>

        <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition flex justify-center items-center">
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gửi xác nhận"}
        </button>
      </form>
    </section>
  );
};