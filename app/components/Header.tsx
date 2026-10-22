"use client";

import Link from "next/link";
import { ShieldAlert, User, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#B91C1C] shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldAlert size={32} className="text-yellow-400 group-hover:scale-105 transition" />
          <div>
            <h1 className="font-bold text-xl text-white">
              Protecting Your Life
            </h1>
            <p className="text-xs text-yellow-300">Safety First</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/"
                className="font-medium text-white transition hover:text-yellow-300"
              >
                Trang Chủ
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="font-medium text-white transition hover:text-yellow-300"
              >
                Giới Thiệu
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="font-medium text-white transition hover:text-yellow-300"
              >
                Liên Hệ & Góp Ý
              </Link>
            </li>

            <li>
              <Link
                href="/home/reports"
                className="font-medium text-yellow-300 transition hover:underline flex items-center gap-1.5"
              >
                <span>Báo Cáo Sự Cố</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/home"
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300 text-sm"
              >
                <User size={16} />
                <span>Dashboard ({user.hovaten || user.email})</span>
              </Link>

              <button
                onClick={() => logout()}
                className="p-2 rounded-lg border border-white/60 text-white hover:bg-white/10 transition"
                title="Đăng xuất"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-white px-4 py-2 text-white transition hover:bg-white hover:text-red-700 text-sm font-medium"
              >
                Đăng Nhập
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300 text-sm"
              >
                Đăng Ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
