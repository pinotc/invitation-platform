import { Menu } from "lucide-react";

export const Topbar = () => {
  return (
    <div className="flex items-center p-4 shadow-sm bg-white h-16 border-b">
      <button className="md:hidden p-2 hover:bg-slate-100 rounded-md transition">
        <Menu className="h-5 w-5 text-slate-600" />
      </button>
      <div className="flex w-full justify-end">
        <div className="flex items-center gap-2">
          {/* Avatar Placeholder */}
          <div className="h-8 w-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center font-bold text-sky-700">
            A
          </div>
        </div>
      </div>
    </div>
  );
};