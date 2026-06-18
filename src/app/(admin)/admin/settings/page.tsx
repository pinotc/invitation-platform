"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu mới không khớp!" });
      return;
    }

    setLoading(true);
    const res = await fetch("/api/user/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage({ type: "success", text: "Đã cập nhật thông tin thành công!" });
      setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
      update(); // Cập nhật lại session hiển thị trên giao diện
    } else {
      setMessage({ type: "error", text: data.message });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Cài đặt tài khoản</h1>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors "
        >
          Đăng xuất
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm text-center ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phần 1: Thông tin cá nhân */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Họ và tên</label>
              <input 
                type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
              <input 
                type="email" className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 outline-none"
                value={formData.email} disabled
              />
              <p className="text-[10px] text-slate-400 mt-1">* Email không thể thay đổi để đảm bảo định danh</p>
            </div>
          </div>
        </div>

        {/* Phần 2: Đổi mật khẩu */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Bảo mật & Mật khẩu</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Mật khẩu hiện tại</label>
              <input 
                type="password" placeholder="Nhập để xác thực nếu muốn đổi mật khẩu mới"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none"
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Mật khẩu mới</label>
                <input 
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Xác nhận mật khẩu mới</label>
                <input 
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" disabled={loading}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}