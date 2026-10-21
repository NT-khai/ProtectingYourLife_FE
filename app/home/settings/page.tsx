"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Volume2,
  MapPin,
  Lock,
  Smartphone,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    loudAlarm: true,
    gpsAlerts: true,
    smsAutoSend: true,
    radius: "10",
    twoFactor: false,
    language: "vi",
    emailNotifications: true,
  });

  const [passwordState, setPasswordState] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [passUpdated, setPassUpdated] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.current || !passwordState.newPass) return;
    setPassUpdated(true);
    setPasswordState({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPassUpdated(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Settings size={16} />
          Tùy Chỉnh Hệ Thống & Cảnh Báo
        </div>
        <h1 className="text-3xl font-extrabold text-white">Cài Đặt</h1>
        <p className="text-slate-300 text-sm mt-1">
          Quản lý quyền nhận cảnh báo khẩn cấp, âm thanh báo động và bảo mật tài khoản cá nhân.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-sm">
          <CheckCircle2 size={18} />
          Các thiết lập cảnh báo của bạn đã được lưu thành công!
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* EMERGENCY NOTIFICATIONS SETTINGS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell size={20} className="text-red-500" />
            Cấu Hình Cảnh Báo Khẩn Cấp
          </h2>

          <div className="space-y-4 text-xs">
            {/* Loud Alarm */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-yellow-400" />
                  <span className="font-bold text-white text-sm">Còi hú âm lượng tối đa khi có nguy hiểm</span>
                </div>
                <p className="text-slate-400">
                  Phát chuông báo động lớn ngay cả khi thiết bị của bạn đang để chế độ Im lặng / Rung.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.loudAlarm}
                onChange={(e) => setSettings({ ...settings, loudAlarm: e.target.checked })}
                className="w-5 h-5 accent-red-600 rounded cursor-pointer"
              />
            </div>

            {/* GPS Alerts */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-400" />
                  <span className="font-bold text-white text-sm">Cảnh báo tự động theo vị trí GPS</span>
                </div>
                <p className="text-slate-400">
                  Tự động gửi thông báo khi có cháy nổ, ngập lụt hoặc thời tiết nguy hiểm gần bạn.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.gpsAlerts}
                onChange={(e) => setSettings({ ...settings, gpsAlerts: e.target.checked })}
                className="w-5 h-5 accent-red-600 rounded cursor-pointer"
              />
            </div>

            {/* SMS Auto Send */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-emerald-400" />
                  <span className="font-bold text-white text-sm">Tự động gửi SMS tọa độ khi nhấn SOS</span>
                </div>
                <p className="text-slate-400">
                  Gửi vị trí định vị tức thì đến danh sách người thân đã thiết lập khi bạn bấm nút SOS.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsAutoSend}
                onChange={(e) => setSettings({ ...settings, smsAutoSend: e.target.checked })}
                className="w-5 h-5 accent-red-600 rounded cursor-pointer"
              />
            </div>

            {/* Alert Radius */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <label className="font-bold text-white text-sm block">Bán kính quét sự cố quanh bạn</label>
              <p className="text-slate-400 text-xs">
                Chỉ hiển thị các cảnh báo xảy ra trong bán kính bạn chọn:
              </p>
              <div className="grid grid-cols-4 gap-2 pt-2">
                {["5", "10", "25", "50"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSettings({ ...settings, radius: r })}
                    className={`py-2 rounded-xl font-bold border transition ${
                      settings.radius === r
                        ? "bg-red-600 text-white border-red-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg transition"
            >
              <Save size={16} />
              Lưu Cấu Hình Cảnh Báo
            </button>
          </div>
        </div>
      </form>

      {/* ACCOUNT SECURITY SECTION */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock size={20} className="text-yellow-400" />
          Bảo Mật Tài Khoản
        </h2>

        {passUpdated && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            Mật khẩu của bạn đã được thay đổi thành công!
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3 text-xs max-w-md">
          <div>
            <label className="text-slate-400 block mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.current}
              onChange={(e) => setPasswordState({ ...passwordState, current: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.newPass}
              onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordState.confirm}
              onChange={(e) => setPasswordState({ ...passwordState, confirm: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
          >
            Cập nhật mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
