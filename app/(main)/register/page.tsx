import Link from "next/link";
import { ShieldAlert, User, Mail, Lock } from "lucide-react";

export const metadata = {
  title: "Đăng ký | Protecting Your Life",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-22">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <ShieldAlert size={60} className="mx-auto text-red-500 mb-4" />

          <h1 className="text-4xl font-bold text-white">
            Protecting Your Life
          </h1>

          <p className="text-slate-400 mt-2">
            Tạo tài khoản để tham gia cộng đồng an toàn
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Họ và tên
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Xác nhận mật khẩu
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-slate-400">
              <input type="checkbox" className="mt-1" />

              <span>
                Tôi đồng ý với{" "}
                <Link
                  href="/privacy-policy"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Chính sách bảo mật
                </Link>{" "}
                và điều khoản sử dụng.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
            >
              Đăng Ký Tài Khoản
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-700"></div>
            <span className="px-4 text-slate-500 text-sm">HOẶC</span>
            <div className="flex-1 border-t border-slate-700"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full border border-slate-700 rounded-xl py-3 hover:bg-slate-800 transition"
            >
              Đăng ký với Google
            </button>

            <button
              type="button"
              className="w-full border border-slate-700 rounded-xl py-3 hover:bg-slate-800 transition"
            >
              Đăng ký với Facebook
            </button>
          </div>

          {/* Login */}
          <p className="text-center text-slate-400 mt-6">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
