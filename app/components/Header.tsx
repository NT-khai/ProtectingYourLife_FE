import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#B91C1C] shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert size={32} className="text-yellow-400" />

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
                Liên Hệ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-white px-4 py-2 text-white transition hover:bg-white hover:text-red-700"
          >
            Đăng Nhập
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
          >
            Đăng Ký
          </Link>
        </div>
      </div>
    </header>
  );
}
