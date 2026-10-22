"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Siren,
  FileWarning,
  Map,
  BookOpen,
  HeartPulse,
  User,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export default function HomeSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const baseMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/home",
      icon: Home,
    },
    {
      title: "Khẩn cấp",
      href: "/home/emergency",
      icon: Siren,
    },
    {
      title: "Báo cáo sự cố",
      href: "/home/reports",
      icon: FileWarning,
    },
    {
      title: "Bản đồ khu vực nguy hiểm",
      href: "/home/map",
      icon: Map,
    },
    {
      title: "Kiến thức an toàn",
      href: "/home/knowledge",
      icon: BookOpen,
    },
    {
      title: "Sơ cứu",
      href: "/home/first-aid",
      icon: HeartPulse,
    },
    {
      title: "Hồ sơ cá nhân",
      href: "/home/profile",
      icon: User,
    },
  ];

  // Chỉ hiển thị mục Admin Quản trị nếu user có vai trò admin
  const menuItems: MenuItem[] = isAdmin
    ? [
        ...baseMenuItems,
        {
          title: "Admin Quản Trị",
          href: "/home/admin",
          icon: ShieldCheck,
          badge: "Admin",
        },
        {
          title: "Cài đặt",
          href: "/home/settings",
          icon: Settings,
        },
      ]
    : [
        ...baseMenuItems,
        {
          title: "Cài đặt",
          href: "/home/settings",
          icon: Settings,
        },
      ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/home" className="flex items-center gap-3 group">
          <ShieldAlert size={34} className="text-red-500 group-hover:scale-110 transition" />
          <div>
            <h2 className="font-bold text-lg group-hover:text-yellow-400 transition">Protecting Your Life</h2>
            <p className="text-xs text-slate-400">Hệ Thống An Toàn</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-between
                    px-4 py-3 rounded-xl
                    transition-all duration-200
                    font-medium text-sm
                    ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-yellow-400"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive ? "text-white" : "text-slate-400 group-hover:text-yellow-400"} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-900/80 text-yellow-300 border border-red-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {user && (
          <div className="px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 mb-2">
            <p className="text-xs font-bold text-white truncate">{user.hovaten || user.email}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            <span className={`inline-block mt-1 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
              isAdmin
                ? "bg-red-950 text-red-400 border-red-800"
                : "bg-slate-800 text-slate-300 border-slate-700"
            }`}>
              Vai trò: {user.role || "user"}
            </span>
          </div>
        )}

        <Link
          href="/"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:bg-slate-900 hover:text-white transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={16} />
            Trang chủ Website
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Public</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition text-left"
        >
          <LogOut size={16} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
