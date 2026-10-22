"use client";

import { useState } from "react";
import { Mail, Phone, ShieldAlert, Ambulance, Flame, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { feedbackApi } from "@/app/lib/api";

export default function ContactPage() {
  const [hovaten, setHovaten] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await feedbackApi.create({ hovaten, email, content });
      setSuccess(true);
      setHovaten("");
      setEmail("");
      setContent("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Gửi phản hồi thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white pt-28">
        {/* Hero */}
        <section className="text-center px-6">
          <h1 className="text-5xl font-bold text-red-500 mb-4">Liên Hệ & Đóng Góp Ý Kiến</h1>

          <p className="max-w-2xl mx-auto text-slate-300">
            Nếu bạn cần hỗ trợ, góp ý hoặc báo cáo thông tin liên quan đến an
            toàn cộng đồng, hãy liên hệ với chúng tôi qua email hoặc số điện
            thoại khẩn cấp bên dưới.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Email Contact */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-bold">Liên Hệ Qua Email</h2>
              </div>

              <p className="text-slate-300 mb-6">
                Gửi thắc mắc, đóng góp hoặc phản hồi chất lượng dịch vụ an toàn cho ban điều hành cộng đồng.
              </p>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Email hỗ trợ tiếp nhận</p>
                <p className="text-lg font-semibold text-yellow-400">
                  support@protectingyourlife.com
                </p>
              </div>

              <div className="mt-4 bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Thời gian phản hồi trực tuyến</p>
                <p className="font-semibold">08:00 - 22:00 mỗi ngày (Trực 24/7 đối với sự cố khẩn cấp)</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 border border-red-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="text-red-500" size={32} />
                <h2 className="text-2xl font-bold">Tổng Đài Cứu Hộ Khẩn Cấp</h2>
              </div>

              <p className="text-slate-300 mb-6">
                Trong trường hợp nguy hiểm trực tiếp đến tính mạng hoặc cháy nổ lớn, hãy bấm gọi ngay:
              </p>

              <div className="space-y-4">
                <a
                  href="tel:113"
                  className="bg-red-600 hover:bg-red-700 transition rounded-xl p-4 flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <Phone />
                    <span className="font-medium">Cảnh sát phản ứng nhanh</span>
                  </div>
                  <span className="font-bold text-xl">113</span>
                </a>

                <a
                  href="tel:114"
                  className="bg-orange-500 hover:bg-orange-600 transition rounded-xl p-4 flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <Flame />
                    <span className="font-medium">Cảnh sát PCCC & Cứu nạn</span>
                  </div>
                  <span className="font-bold text-xl">114</span>
                </a>

                <a
                  href="tel:115"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black transition rounded-xl p-4 flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <Ambulance />
                    <span className="font-medium">Cấp cứu y tế</span>
                  </div>
                  <span className="font-bold text-xl">115</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Contact (Feedback Table in DB) */}
        <section className="container mx-auto px-6 pb-20">
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2 text-yellow-400">
              Gửi Ý Kiến Phản Hồi / Đóng Góp
            </h2>
            <p className="text-slate-400 text-center text-sm mb-8">
              Mọi ý kiến đóng góp của bạn sẽ được chuyển thẳng đến ban quản trị hệ thống.
            </p>

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
                <CheckCircle2 size={20} className="shrink-0" />
                <p className="text-sm">
                  Cảm ơn bạn! Phản hồi của bạn đã được gửi và lưu trữ an toàn trong hệ thống.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của bạn"
                  value={hovaten}
                  onChange={(e) => setHovaten(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Địa chỉ email nhận phản hồi"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nội dung phản hồi / góp ý
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Nhập nội dung bạn muốn đóng góp hoặc chia sẻ..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 transition py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 text-white"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Đang gửi phản hồi..." : "Gửi Phản Hồi Ngay"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
