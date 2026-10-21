import Link from "next/link";
import { ShieldAlert, Mail, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Quên mật khẩu | Protecting Your Life",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <ShieldAlert size={60} className="mx-auto text-red-500 mb-4" />

          <h1 className="text-4xl font-bold text-white">
            Khôi Phục Mật Khẩu
          </h1>

          <p className="text-slate-400 mt-2">
            Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-slate-300">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
            >
              Gửi Liên Kết Khôi Phục
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 font-medium"
            >
              <ArrowLeft size={16} />
              Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
