"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Gọi hàm signIn của NextAuth
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // Để tự kiểm soát việc chuyển trang
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin/invitations"); // Đăng nhập thành công -> Vào thẳng trang quản lý
      router.refresh(); // Làm mới session
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Chào mừng trở lại</h1>
          <p className="text-sm text-slate-500 mt-2">Đăng nhập để quản lý thiệp mời</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-colors placeholder:text-slate-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input 
              type="password" required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-colors placeholder:text-slate-400"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-xl transition-colors mt-2"
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Chưa có tài khoản? <Link href="/register" className="text-sky-500 font-medium hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}