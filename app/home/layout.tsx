"use client";

import HomeSidebar from "../components/HomeSidebar";
import Link from "next/link";
import { PhoneCall, Globe, Bell, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <HomeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Hệ thống trực thám an toàn hoạt động
            </span>
            {isAdmin && (
              <Link
                href="/home/admin"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-700 uppercase"
              >
                <ShieldAlert size={12} />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Emergency Hotline */}
            <Link
              href="/home/emergency"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-600 hover:text-white transition"
            >
              <PhoneCall size={14} />
              <span>SOS Khẩn Cấp (114)</span>
            </Link>

            {/* Back to Public Web */}
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              title="Về Trang Chủ Website"
            >
              <Globe size={14} />
              <span className="hidden md:inline">Website</span>
            </Link>

            {/* User Profile Mini Badge */}
            <Link
              href="/home/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-90 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                {user?.hovaten
                  ? user.hovaten.charAt(0).toUpperCase()
                  : user?.email
                  ? user.email.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold leading-tight text-white">
                  {user?.hovaten || user?.email || "Người dùng"}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Vai trò: {user?.role || "user"}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
