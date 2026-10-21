import Link from "next/link";
import { ShieldAlert, Mail, Lock } from "lucide-react";

export const metadata = {
  title: "Đăng nhập | Protecting Your Life",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <ShieldAlert size={60} className="mx-auto text-red-500 mb-4" />

          <h1 className="text-4xl font-bold text-white">
            Protecting Your Life
          </h1>

          <p className="text-slate-400 mt-2">Đăng nhập để truy cập hệ thống</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Mật khẩu
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" />
                Ghi nhớ đăng nhập
              </label>

              <Link
                href="/forgot-password"
                className="text-yellow-400 hover:text-yellow-300"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
            >
              Đăng Nhập
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-700" />
            <span className="px-4 text-slate-500 text-sm">HOẶC</span>
            <div className="flex-1 border-t border-slate-700" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full border border-slate-700 rounded-xl py-3 hover:bg-slate-800 transition"
            >
              Đăng nhập với Google
            </button>

            <button
              type="button"
              className="w-full border border-slate-700 rounded-xl py-3 hover:bg-slate-800 transition"
            >
              Đăng nhập với Facebook
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-slate-400 mt-6">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
