"use client";
import { useState, useEffect } from "react";
import { addGuestbookEntry, getGuestbookEntries } from "@/app/actions/guestbook";

export const GuestbookBlock = ({ invitationId }: { invitationId: string }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<any[]>([]);

  // Load lời chúc từ DB
  useEffect(() => {
    getGuestbookEntries(invitationId).then(setWishes);
  }, [invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addGuestbookEntry(invitationId, name, message);
    setName(""); setMessage("");
    const updated = await getGuestbookEntries(invitationId);
    setWishes(updated);
  };

  return (
    <section className="py-12 px-6 bg-transparent">
      <h2 className="text-center font-serif text-[#2d4628] text-xl font-bold mb-6 uppercase tracking-widest">Sổ Lưu Bút</h2>
      
      {/* Danh sách lời chúc */}
      <div className="space-y-4 mb-8">
        {wishes.map((w) => (
          <div key={w.id} className="bg-white/70 backdrop-blur p-4 rounded-xl border border-[#2d4628]/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm text-[#2d4628]">{w.name}</span>
              <span className="text-[10px] text-slate-400">{new Date(w.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-700 italic">{w.message}</p>
          </div>
        ))}
      </div>

      {/* Form nhập */}
      <form onSubmit={handleSubmit} className="bg-white/80 p-6 rounded-2xl border border-[#2d4628]/10">
        <input 
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn..."
          className="w-full bg-transparent border-b border-slate-200 py-2 mb-4 text-sm text-black placeholder:text-slate-400"
          required
        />
        <textarea 
          value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Lời chúc gửi đến chủ tiệc..."
          className="w-full bg-transparent border-b border-slate-200 py-2 mb-4 text-sm text-black placeholder:text-slate-400"
          rows={3} required
        />
        <button type="submit" className="w-full py-3 bg-[#2d4628] text-white rounded-xl font-bold text-sm hover:bg-[#1e301a]">
          Gửi lời chúc
        </button>
      </form>
    </section>
  );
};