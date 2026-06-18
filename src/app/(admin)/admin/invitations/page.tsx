import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { deleteInvitation } from "@/app/actions/invitation";

export default async function InvitationsPage() {
  const invitations = await prisma.invitation.findMany({
    include: { template: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Thiệp mời</h2>
          <p className="text-slate-500 mt-1">Quản lý các thiệp mời đã tạo trên hệ thống.</p>
        </div>
        <Link 
          href="/admin/invitations/create" 
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo thiệp mới
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Tên thiệp / Đường dẫn</th>
              <th className="px-6 py-4">Chủ đề</th>
              <th className="px-6 py-4">Mẫu giao diện</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {invitations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Chưa có thiệp mời nào. Hãy tạo cái đầu tiên!
                </td>
              </tr>
            ) : (
              invitations.map((invite) => (
                <tr key={invite.id} className="bg-white border-b hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {invite.title}
                    <div className="text-xs text-sky-600 font-normal mt-1 flex items-center">
                      /invite/{invite.slug} <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4">{invite.category}</td>
                  <td className="px-6 py-4">{invite.template.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invite.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {invite.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {/* Đã thay button bằng Link để điều hướng sang trang chỉnh sửa chi tiết */}
                  <Link 
                    href={`/admin/invitations/${invite.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition block"><Edit className="w-4 h-4" />
                  </Link>
                  
                  {/* Form để thực hiện Server Action Xóa */}
                  <form action={async () => {
                    "use server";
                    await deleteInvitation(invite.id);
                  }}>
                    <button type="submit" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}