import Link from "next/link";
import {
  Siren,
  FileWarning,
  MapPin,
  HeartPulse,
  BookOpen,
  Phone,
  AlertTriangle,
  ShieldCheck,
  Flame,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Chỉ số an toàn khu vực",
      value: "92/100",
      change: "Mức Tốt",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      icon: ShieldCheck,
    },
    {
      title: "Cảnh báo đang hoạt động",
      value: "3",
      change: "2 khẩn, 1 chú ý",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      icon: AlertTriangle,
    },
    {
      title: "Sự cố bạn đã báo cáo",
      value: "4",
      change: "3 đã xử lý",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      icon: FileWarning,
    },
    {
      title: "Kỹ năng sơ cứu đã học",
      value: "8/12",
      change: "67% hoàn thành",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      icon: HeartPulse,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      title: "Cảnh báo cháy cỏ khô diện rộng",
      location: "Quận 12, TP. Hồ Chí Minh",
      time: "15 phút trước",
      severity: "Cao",
      severityColor: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: Flame,
    },
    {
      id: 2,
      title: "Triều cường dâng cao gây ngập cục bộ",
      location: "Đường Trần Xuân Soạn, Quận 7",
      time: "1 giờ trước",
      severity: "Trung bình",
      severityColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: AlertTriangle,
    },
    {
      id: 3,
      title: "Sửa chữa trụ điện cao thế - Chú ý an toàn",
      location: "Khu vực P. Thảo Điền, TP. Thủ Đức",
      time: "3 giờ trước",
      severity: "Thông báo",
      severityColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-900/80 via-slate-900 to-slate-900 border border-red-800/40 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/30 text-red-300 border border-red-500/30 mb-4">
            <Siren size={14} className="animate-bounce" />
            Trung tâm Giám sát An toàn Cá nhân & Cộng đồng
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Xin chào, Thành viên An Toàn! 👋
          </h1>
          <p className="mt-2 text-slate-300 leading-relaxed text-sm md:text-base">
            Hệ thống luôn túc trực hỗ trợ bạn. Khi gặp sự cố bất ngờ, kích hoạt báo động khẩn cấp hoặc gọi trực tiếp các đầu số cứu hộ bên dưới.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/home/emergency"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-900/40 transition"
            >
              <Siren size={18} />
              Kích hoạt Báo Động SOS
            </Link>
            <Link
              href="/home/reports"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
            >
              <FileWarning size={18} />
              Báo cáo Sự cố Mới
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Emergency Hotlines Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <a
          href="tel:114"
          className="bg-slate-900/90 border border-red-900/40 hover:border-red-500 p-4 rounded-2xl flex items-center justify-between group transition"
        >
          <div>
            <span className="text-xs text-slate-400 block font-medium">Cứu Hỏa & Cứu Nạn</span>
            <span className="text-2xl font-bold text-red-500 group-hover:scale-105 inline-block transition">114</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition">
            <Phone size={18} />
          </div>
        </a>

        <a
          href="tel:115"
          className="bg-slate-900/90 border border-amber-900/40 hover:border-yellow-500 p-4 rounded-2xl flex items-center justify-between group transition"
        >
          <div>
            <span className="text-xs text-slate-400 block font-medium">Cấp Cứu Y Tế</span>
            <span className="text-2xl font-bold text-yellow-400 group-hover:scale-105 inline-block transition">115</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition">
            <HeartPulse size={18} />
          </div>
        </a>

        <a
          href="tel:113"
          className="bg-slate-900/90 border border-blue-900/40 hover:border-blue-500 p-4 rounded-2xl flex items-center justify-between group transition"
        >
          <div>
            <span className="text-xs text-slate-400 block font-medium">Cảnh Sát 113</span>
            <span className="text-2xl font-bold text-blue-400 group-hover:scale-105 inline-block transition">113</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
            <ShieldCheck size={18} />
          </div>
        </a>

        <a
          href="tel:112"
          className="bg-slate-900/90 border border-orange-900/40 hover:border-orange-500 p-4 rounded-2xl flex items-center justify-between group transition"
        >
          <div>
            <span className="text-xs text-slate-400 block font-medium">Cứu Nạn Thiên Tai</span>
            <span className="text-2xl font-bold text-orange-400 group-hover:scale-105 inline-block transition">112</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition">
            <AlertTriangle size={18} />
          </div>
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-slate-900/80 border ${s.borderColor} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{s.title}</span>
                <div className={`p-2 rounded-xl ${s.bgColor} ${s.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two columns: Recent Alerts & Quick Feature Shortcuts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Alerts Feed (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-xl font-bold text-white">Cảnh Báo Khu Vực Trực Tiếp</h2>
            </div>
            <Link
              href="/home/map"
              className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-medium"
            >
              Xem trên bản đồ <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-750 hover:bg-slate-800 transition flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-slate-700/50 text-yellow-400 shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white text-sm truncate">{alert.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase ${alert.severityColor}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-400" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Bạn đang nhận cảnh báo trong bán kính 10km quanh vị trí hiện tại.
            </span>
            <Link href="/home/settings" className="text-yellow-400 hover:underline">
              Cài đặt bán kính
            </Link>
          </div>
        </div>

        {/* Quick Tools & Shortcuts (1 col) */}
        <div className="space-y-6">
          {/* Quick Access Grid */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Lối Tắt Hữu Ích</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/home/first-aid"
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-red-500 hover:bg-slate-800 transition text-center group"
              >
                <HeartPulse size={26} className="mx-auto text-red-400 group-hover:scale-110 transition mb-2" />
                <span className="text-xs font-semibold text-white block">Sơ Cứu Nhanh</span>
                <span className="text-[10px] text-slate-400">CPR, Bỏng, Vết thương</span>
              </Link>

              <Link
                href="/home/map"
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-yellow-500 hover:bg-slate-800 transition text-center group"
              >
                <MapPin size={26} className="mx-auto text-yellow-400 group-hover:scale-110 transition mb-2" />
                <span className="text-xs font-semibold text-white block">Bản Đồ Điểm Tránh</span>
                <span className="text-[10px] text-slate-400">Khu vực an toàn</span>
              </Link>

              <Link
                href="/home/knowledge"
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500 hover:bg-slate-800 transition text-center group"
              >
                <BookOpen size={26} className="mx-auto text-blue-400 group-hover:scale-110 transition mb-2" />
                <span className="text-xs font-semibold text-white block">Cẩm Nang PCCC</span>
                <span className="text-[10px] text-slate-400">Quy trình thoát hiểm</span>
              </Link>

              <Link
                href="/home/profile"
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500 hover:bg-slate-800 transition text-center group"
              >
                <ShieldCheck size={26} className="mx-auto text-emerald-400 group-hover:scale-110 transition mb-2" />
                <span className="text-xs font-semibold text-white block">Hồ Sơ Y Tế</span>
                <span className="text-[10px] text-slate-400">Nhóm máu, Liên hệ SOS</span>
              </Link>
            </div>
          </div>

          {/* Safety Tip of the Day */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30 rounded-3xl p-6">
            <span className="text-xs uppercase tracking-wider font-bold text-yellow-400 block mb-2">
              💡 Mẹo an toàn hôm nay
            </span>
            <h3 className="font-bold text-white text-base mb-2">
              Thoát hiểm đám cháy trong nhà cao tầng
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Tuyệt đối không sử dụng thang máy khi có chuông báo cháy. Hãy dùng thang bộ thoát hiểm, dùng khăn ướt bịt mũi miệng và hạ thấp người để tránh ngạt khói độc CO.
            </p>
            <Link
              href="/home/knowledge"
              className="inline-block mt-3 text-xs text-yellow-400 hover:underline font-semibold"
            >
              Đọc toàn bộ cẩm nang →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
