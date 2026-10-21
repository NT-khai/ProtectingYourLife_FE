"use client";

import { useState } from "react";
import {
  Siren,
  Phone,
  MapPin,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  Flame,
  HeartPulse,
  Shield,
  Volume2,
  Users,
} from "lucide-react";

export default function EmergencyPage() {
  const [copied, setCopied] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [alarmPlaying, setAlarmPlaying] = useState(false);

  const coordinates = "10.7769° N, 106.7009° E (Quận 1, TP. Hồ Chí Minh)";

  const handleCopyLocation = () => {
    navigator.clipboard?.writeText(coordinates);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emergencyContacts = [
    { name: "Mẹ (Nguyễn Thị Mai)", phone: "0908 123 456", relation: "Gia đình" },
    { name: "Anh trai (Nguyễn Văn Hùng)", phone: "0912 345 678", relation: "Gia đình" },
    { name: "Bác sĩ gia đình (BS. Tuấn)", phone: "0987 654 321", relation: "Y tế" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-red-950/60 border border-red-800/60">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Siren size={16} className="animate-spin" />
            Trung Tâm Ứng Phó Khẩn Cấp 24/7
          </div>
          <h1 className="text-3xl font-extrabold text-white">Khẩn Cấp & Cứu Hộ</h1>
          <p className="text-slate-300 text-sm mt-1">
            Nhấn nút SOS bên dưới nếu bạn đang ở trong tình huống nguy hiểm đến tính mạng hoặc tài sản.
          </p>
        </div>

        {/* Alarm button */}
        <button
          onClick={() => setAlarmPlaying(!alarmPlaying)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition ${
            alarmPlaying
              ? "bg-yellow-400 text-black animate-pulse shadow-lg shadow-yellow-500/40"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          }`}
        >
          <Volume2 size={18} />
          {alarmPlaying ? "Đang phát còi hú (Tắt)" : "Phát còi báo động tại chỗ"}
        </button>
      </div>

      {/* BIG SOS SECTION */}
      <div className="p-8 md:p-12 rounded-3xl bg-slate-950 border border-red-900/60 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <p className="text-sm text-red-400 font-semibold mb-6 uppercase tracking-wider">
            {sosActive ? "TÍN HIỆU SOS ĐÃ ĐƯỢC KÍCH HOẠT" : "Chạm để kích hoạt SOS ngay lập tức"}
          </p>

          <button
            onClick={() => setSosActive(!sosActive)}
            className={`w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center font-extrabold text-white shadow-2xl transition-all duration-300 ${
              sosActive
                ? "bg-yellow-400 text-black scale-105 shadow-yellow-500/50 animate-bounce"
                : "bg-gradient-to-tr from-red-700 to-red-500 hover:scale-105 shadow-red-600/50 hover:shadow-red-500/70"
            }`}
          >
            <Siren size={48} className={sosActive ? "animate-spin mb-1" : "mb-2"} />
            <span className="text-3xl md:text-4xl font-black">
              {sosActive ? "ĐÃ GỬI" : "SOS"}
            </span>
            <span className="text-[11px] font-medium opacity-90 mt-1">
              {sosActive ? "Chạm để hủy" : "Cứu hộ khẩn cấp"}
            </span>
          </button>

          {sosActive && (
            <div className="mt-6 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 text-yellow-300 text-xs text-center w-full">
              ⚠️ Tọa độ GPS của bạn cùng thông tin cá nhân đã được gửi đến 3 liên hệ khẩn cấp và đưa vào danh sách ưu tiên tiếp nhận.
            </div>
          )}

          <p className="text-xs text-slate-400 mt-6 max-w-sm">
            Hệ thống sẽ tự động gửi tin nhắn SMS chứa tọa độ chính xác của bạn đến người thân và định vị trạm cứu hộ gần nhất.
          </p>
        </div>

        {/* Ambient pulse effect */}
        <div className="absolute inset-0 bg-radial from-red-600/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* GPS Location & Live Coordinates Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Tọa độ định vị hiện tại của bạn:</span>
            <span className="text-sm md:text-base font-bold text-white">{coordinates}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyLocation}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Đã chép" : "Sao chép tọa độ"}</span>
          </button>
          <a
            href={`sms:?body=Khang cap! Toi can ho tro tai toa do: ${encodeURIComponent(coordinates)}`}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white transition"
          >
            <Share2 size={14} />
            <span>Gửi SMS Tọa độ</span>
          </a>
        </div>
      </div>

      {/* 4 HOTLINES DIRECT CALL */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Các Đầu Số Khẩn Cấp Quốc Gia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="tel:114"
            className="p-5 rounded-3xl bg-gradient-to-b from-red-950/80 to-slate-900 border border-red-800/50 hover:border-red-500 transition group block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center">
                <Flame size={20} />
              </div>
              <span className="text-xs font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded-full border border-red-800">
                Gọi Miễn Phí
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-red-400 transition">Cứu Hỏa & Cứu Nạn</h3>
            <p className="text-xs text-slate-400 mt-1">Hỏa hoạn, mắc kẹt thang máy, sập đổ</p>
            <div className="mt-4 pt-4 border-t border-red-900/40 flex items-center justify-between">
              <span className="text-2xl font-black text-red-500">114</span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-semibold bg-red-600/30 px-3 py-1 rounded-lg">
                <Phone size={12} /> Bấm Gọi
              </span>
            </div>
          </a>

          <a
            href="tel:115"
            className="p-5 rounded-3xl bg-gradient-to-b from-amber-950/80 to-slate-900 border border-yellow-800/50 hover:border-yellow-500 transition group block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-yellow-500 text-black flex items-center justify-center">
                <HeartPulse size={20} />
              </div>
              <span className="text-xs font-bold text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded-full border border-yellow-800">
                Gọi Miễn Phí
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition">Cấp Cứu Y Tế</h3>
            <p className="text-xs text-slate-400 mt-1">Tai nạn thương tích, đột quỵ, ngộ độc</p>
            <div className="mt-4 pt-4 border-t border-yellow-900/40 flex items-center justify-between">
              <span className="text-2xl font-black text-yellow-400">115</span>
              <span className="flex items-center gap-1 text-xs text-black font-semibold bg-yellow-400 px-3 py-1 rounded-lg">
                <Phone size={12} /> Bấm Gọi
              </span>
            </div>
          </a>

          <a
            href="tel:113"
            className="p-5 rounded-3xl bg-gradient-to-b from-blue-950/80 to-slate-900 border border-blue-800/50 hover:border-blue-500 transition group block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Shield size={20} />
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800">
                Gọi Miễn Phí
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">Cảnh Sát 113</h3>
            <p className="text-xs text-slate-400 mt-1">Tội phạm, gây rối trật tự, cướp giật</p>
            <div className="mt-4 pt-4 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-2xl font-black text-blue-400">113</span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-semibold bg-blue-600/30 px-3 py-1 rounded-lg">
                <Phone size={12} /> Bấm Gọi
              </span>
            </div>
          </a>

          <a
            href="tel:112"
            className="p-5 rounded-3xl bg-gradient-to-b from-orange-950/80 to-slate-900 border border-orange-800/50 hover:border-orange-500 transition group block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <span className="text-xs font-bold text-orange-400 bg-orange-950 px-2 py-0.5 rounded-full border border-orange-800">
                Gọi Miễn Phí
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition">Cứu Nạn Quốc Gia</h3>
            <p className="text-xs text-slate-400 mt-1">Bão lũ, sạt lở đất, cứu nạn biển</p>
            <div className="mt-4 pt-4 border-t border-orange-900/40 flex items-center justify-between">
              <span className="text-2xl font-black text-orange-400">112</span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-semibold bg-orange-600/30 px-3 py-1 rounded-lg">
                <Phone size={12} /> Bấm Gọi
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* EMERGENCY CONTACTS LIST */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Liên Hệ Khẩn Cấp Của Bạn</h2>
          </div>
          <span className="text-xs text-slate-400">3 liên hệ đã lưu</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] text-yellow-400 font-semibold uppercase">{contact.relation}</span>
                <h4 className="text-sm font-bold text-white">{contact.name}</h4>
                <p className="text-xs text-slate-400">{contact.phone}</p>
              </div>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition shadow-md"
                title={`Gọi ${contact.name}`}
              >
                <Phone size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
