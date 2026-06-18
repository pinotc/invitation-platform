import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen relative flex bg-slate-50 overflow-hidden">
      {/* Sidebar cho Desktop */}
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 bg-slate-900">
        <Sidebar />
      </div>
      
      {/* Nội dung chính */}
      <main className="md:pl-64 flex-1 flex flex-col h-full overflow-y-auto">
        <Topbar />
        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}