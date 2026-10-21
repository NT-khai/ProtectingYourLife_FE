"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const menuItems = [
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
  {
    title: "Cài đặt",
    href: "/home/settings",
    icon: Settings,
  },
];

export default function HomeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/home" className="flex items-center gap-3 group">
          <ShieldAlert size={34} className="text-red-500 group-hover:scale-110 transition" />

          <div>
            <h2 className="font-bold text-lg group-hover:text-yellow-400 transition">Protecting Your Life</h2>
            <p className="text-xs text-slate-400">Safety Dashboard</p>
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
                    flex items-center gap-3
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
                  <Icon size={20} className={isActive ? "text-white" : "text-slate-400 group-hover:text-yellow-400"} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
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

        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
        >
          <LogOut size={16} />
          <span>Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}
