import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export default async function RsvpsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const rsvps = await prisma.rsvp.findMany({
    where: { invitationId: id },
    orderBy: { createdAt: 'desc' }
  });

  const totalGuests = rsvps
    .filter(r => r.status === "ATTENDING")
    .reduce((sum, r) => sum + r.guestsCount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ATTENDING": return <span className="flex items-center text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-xs font-medium"><CheckCircle2 className="w-3 h-3 mr-1" /> Tham dự</span>;
      case "DECLINED": return <span className="flex items-center text-rose-700 bg-rose-100 px-2 py-1 rounded text-xs font-medium"><XCircle className="w-3 h-3 mr-1" /> Từ chối</span>;
      default: return <span className="flex items-center text-amber-700 bg-amber-100 px-2 py-1 rounded text-xs font-medium"><HelpCircle className="w-3 h-3 mr-1" /> Chưa chắc</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/invitations/${id}`} className="p-2 hover:bg-slate-200 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-sky-500" /> Danh sách khách xác nhận
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-sm text-slate-500">Tổng lượt phản hồi</p>
          <p className="text-2xl font-bold text-slate-800">{rsvps.length}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm text-center">
          <p className="text-sm text-emerald-600">Tổng số người tham dự (Ước tính)</p>
          <p className="text-2xl font-bold text-emerald-700">{totalGuests}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4">Tên khách mời</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Số lượng</th>
              <th className="px-6 py-4">Số điện thoại</th>
              <th className="px-6 py-4">Lời chúc</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Chưa có phản hồi nào</td></tr>
            ) : (
              rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{rsvp.name}</td>
                  <td className="px-6 py-4">{getStatusBadge(rsvp.status)}</td>
                  <td className="px-6 py-4 text-center font-bold">{rsvp.guestsCount}</td>
                  <td className="px-6 py-4">{rsvp.phone || '-'}</td>
                  <td className="px-6 py-4 max-w-xs truncate" title={rsvp.message || ''}>{rsvp.message || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}