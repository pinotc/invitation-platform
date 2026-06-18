"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/login?registered=true"); // Đăng ký xong đẩy qua trang Login
    } else {
      const data = await res.json();
      setError(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Tạo tài khoản</h1>
          <p className="text-sm text-slate-500 mt-2">Bắt đầu thiết kế thiệp mời của riêng bạn</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
            <input 
              type="text" required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-colors placeholder:text-slate-400"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-colors placeholder:text-slate-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input 
              type="password" required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-colors placeholder:text-slate-400"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-xl transition-colors mt-2"
          >
            {loading ? "Đang xử lý..." : "Đăng ký ngay"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Đã có tài khoản? <Link href="/login" className="text-sky-500 font-medium hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}