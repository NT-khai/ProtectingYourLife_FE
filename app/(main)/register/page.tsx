"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, User, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [hovaten, setHovaten] = useState("");
  const [email, setEmail] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [confirmMatKhau, setConfirmMatKhau] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (matkhau !== confirmMatKhau) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (matkhau.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);

    try {
      await register(hovaten, email, matkhau);
      setSuccess("Đăng ký tài khoản thành công! Đang chuyển hướng sang đăng nhập...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <ShieldAlert size={60} className="mx-auto text-red-500 mb-4 group-hover:scale-105 transition" />
            <h1 className="text-4xl font-bold text-white group-hover:text-yellow-400 transition">
              Protecting Your Life
            </h1>
          </Link>
          <p className="text-slate-400 mt-2">
            Tạo tài khoản để tham gia mạng lưới an toàn cộng đồng
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">
                Họ và tên
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  value={hovaten}
                  onChange={(e) => setHovaten(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">Email</label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">
                Mật khẩu (tối thiểu 6 ký tự)
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  required
                  value={matkhau}
                  onChange={(e) => setMatkhau(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-1.5 text-slate-300">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  required
                  value={confirmMatKhau}
                  onChange={(e) => setConfirmMatKhau(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-red-500 transition text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Đang xử lý..." : "Tạo Tài Khoản"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6 text-sm">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
