import { Mail, Phone, ShieldAlert, Ambulance, Flame } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white pt-28">
        {/* Hero */}
        <section className="text-center px-6">
          <h1 className="text-5xl font-bold text-red-500 mb-4">Liên Hệ</h1>

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
                Gửi thắc mắc, đóng góp hoặc báo cáo các vấn đề liên quan đến an
                toàn cho đội ngũ của chúng tôi.
              </p>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Email hỗ trợ</p>
                <p className="text-lg font-semibold text-yellow-400">
                  support@protectingyourlife.com
                </p>
              </div>

              <div className="mt-4 bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Thời gian phản hồi</p>
                <p className="font-semibold">08:00 - 22:00 mỗi ngày</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 border border-red-900 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="text-red-500" size={32} />
                <h2 className="text-2xl font-bold">Liên Hệ Khẩn Cấp</h2>
              </div>

              <p className="text-slate-300 mb-6">
                Trong trường hợp nguy hiểm đến tính mạng, hãy liên hệ ngay các
                cơ quan chức năng:
              </p>

              <div className="space-y-4">
                <div className="bg-red-600 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone />
                    <span>Cảnh sát</span>
                  </div>

                  <span className="font-bold text-xl">113</span>
                </div>

                <div className="bg-orange-500 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flame />
                    <span>Cứu hỏa</span>
                  </div>

                  <span className="font-bold text-xl">114</span>
                </div>

                <div className="bg-yellow-400 text-black rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ambulance />
                    <span>Cấp cứu y tế</span>
                  </div>

                  <span className="font-bold text-xl">115</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Contact */}
        <section className="container mx-auto px-6 pb-20">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
              Gửi Tin Nhắn Cho Chúng Tôi
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-4 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500"
              />

              <textarea
                rows={5}
                placeholder="Nội dung liên hệ..."
                className="w-full p-4 rounded-xl bg-slate-800 outline-none border border-slate-700 focus:border-red-500"
              />

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 transition py-4 rounded-xl font-semibold"
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
