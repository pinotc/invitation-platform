"use client";

import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";

export const GiftSection = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Nếu trong dữ liệu không thiết lập STK mừng cưới thì ẩn khối này đi
  if (!data.bankAccount) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.bankAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sử dụng API VietQR chuẩn hóa để tự sinh mã QR thanh toán nhanh
  const qrUrl = `https://img.vietqr.io/image/${data.bankId || 'MB'}-${data.bankAccount}-compact.jpg?amount=0&addInfo=Mung%20Cuoi`;

  return (
    <section className="py-16 px-6 bg-amber-50/40 border-b border-amber-100 flex flex-col items-center text-center">
      <div className="p-3 bg-amber-100 rounded-full text-amber-600 mb-4">
        <Gift className="w-6 h-6 animate-bounce" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wider">Hòm mừng đám cưới</h2>
      <p className="text-xs text-slate-500 mb-6 max-w-xs">Sự hiện diện của bạn là niềm vinh hạnh lớn cho gia đình chúng tôi. Nếu muốn gửi lời chúc xa xôi, bạn có thể mừng cưới qua hình thức dưới đây.</p>

      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-white border border-amber-200 text-amber-800 font-semibold rounded-xl text-sm shadow-sm hover:bg-amber-50 transition"
      >
        Gửi Quà Chúc Mừng
      </button>

      {/* Modal Hiện Quà và Mã QR */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Thông tin mừng hỷ</h3>
              <p className="text-xs text-slate-400 mt-1">Ngân hàng & Chuyển khoản QR khoản siêu tốc</p>
            </div>

            {/* Ảnh mã QR */}
            <div className="w-48 h-48 bg-slate-50 border rounded-2xl mx-auto overflow-hidden shadow-inner flex items-center justify-center relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="Mã QR Mừng Cưới" className="w-full h-full object-cover" />
            </div>

            {/* Chi tiết tài khoản */}
            <div className="bg-slate-50 p-4 rounded-2xl text-left text-sm border space-y-2">
              <p className="text-slate-500 text-xs">Chủ tài khoản: <span className="font-bold text-slate-800 uppercase block text-sm mt-0.5">{data.hostName || data.groomName}</span></p>
              <p className="text-slate-500 text-xs">Ngân hàng: <span className="font-semibold text-slate-700 block text-xs mt-0.5">{data.bankName || 'Ngân hàng Quân Đội (MB)'}</span></p>
              
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-500 text-xs block">Số tài khoản</span>
                  <span className="font-mono text-base font-bold text-slate-900">{data.bankAccount}</span>
                </div>
                <button onClick={handleCopy} className="p-2 hover:bg-slate-200 text-slate-600 rounded-lg transition">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button onClick={() => setShowModal(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium text-sm">
              Đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </section>
  );
};