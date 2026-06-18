import { prisma } from "@/lib/prisma";
import { Mail, Users, Eye, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  // Lấy dữ liệu thống kê thật từ database
  const totalInvitations = await prisma.invitation.count();
  const totalRsvps = await prisma.rsvp.count();
  const totalViews = await prisma.view.count();
  const totalTemplates = await prisma.template.count();

  const stats = [
    { title: "Tổng thiệp mời", value: totalInvitations, icon: Mail, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Khách xác nhận (RSVP)", value: totalRsvps, icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Tổng lượt xem", value: totalViews, icon: Eye, color: "text-violet-600", bg: "bg-violet-100" },
    { title: "Mẫu giao diện (Templates)", value: totalTemplates, icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-2">
          Tổng quan về hệ thống thiệp mời trực tuyến của bạn.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm p-6 flex flex-row items-center justify-between hover:shadow-md transition duration-200">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}