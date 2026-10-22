"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  HeartPulse,
  Phone,
  ShieldCheck,
  Award,
  Edit2,
  Save,
  CheckCircle2,
  MapPin,
  Mail,
  Loader2,
  AlertCircle,
  Camera,
  LocateFixed,
  Compass,
} from "lucide-react";
import { userApi, uploadImage, UserProfileData } from "@/app/lib/api";
import { useAuth } from "@/app/context/AuthContext";
import { reverseGeocodeNominatim, formatAddress } from "@/app/lib/nominatim";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccessMsg, setGpsSuccessMsg] = useState<string | null>(null);

  // Profile data matching DB user_profiles + users
  const [profile, setProfile] = useState<Partial<UserProfileData>>({
    hovaten: "",
    soDienThoai: "",
    diaChi: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userApi.getMyProfile();
        if (data) {
          setProfile({
            hovaten: data.hovaten || user?.hovaten || "",
            soDienThoai: data.soDienThoai || "",
            diaChi: data.diaChi || "",
            avatar: data.avatar || user?.avatar || "",
          });
        }
      } catch (err: any) {
        // Fallback to user data from auth context if profile not loaded yet
        if (user) {
          setProfile({
            hovaten: user.hovaten || "",
            soDienThoai: "",
            diaChi: "",
            avatar: user.avatar || "",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // LẤY ĐỊA CHỈ TỰ ĐỘNG TỪ GPS THIẾT BỊ VÀ OPENSTREETMAP NOMINATIM
  const handleGetAddressFromGPS = () => {
    if (!navigator.geolocation) {
      setError("Trình duyệt không hỗ trợ lấy vị trí GPS.");
      return;
    }

    setGpsLoading(true);
    setError(null);
    setGpsSuccessMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude, accuracy } = pos.coords;
          const lat = parseFloat(latitude.toFixed(6));
          const lng = parseFloat(longitude.toFixed(6));

          // Dịch tọa độ sang địa chỉ đường phố cụ thể qua OpenStreetMap Nominatim
          const geoResult = await reverseGeocodeNominatim(lat, lng);
          const resolvedAddress = geoResult
            ? formatAddress(geoResult)
            : `Tọa độ GPS: ${lat}, ${lng}`;

          setProfile((prev) => ({
            ...prev,
            diaChi: resolvedAddress,
          }));

          // Tự động mở chế độ chỉnh sửa để người dùng xem và lưu
          setIsEditing(true);
          setGpsSuccessMsg(
            `Đã định vị thành công (Sai số ~${Math.round(accuracy)}m): ${resolvedAddress}`
          );
          setTimeout(() => setGpsSuccessMsg(null), 6000);
        } catch (err: any) {
          setError("Lỗi phân giải địa chỉ GPS: " + err.message);
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        let msg = "Không thể lấy tọa độ GPS.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Quyền truy cập GPS bị từ chối. Vui lòng cho phép quyền vị trí trên trình duyệt.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Không nhận được tín hiệu định vị GPS.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Quá thời gian chờ định vị GPS.";
        }
        setError(msg);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSave = async () => {
    if (!user) {
      setError("Vui lòng đăng nhập tài khoản trước khi cập nhật hồ sơ.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await userApi.updateMyProfile({
        hovaten: profile.hovaten,
        soDienThoai: profile.soDienThoai,
        diaChi: profile.diaChi,
        avatar: profile.avatar,
      });
      setSaved(true);
      setIsEditing(false);
      await refreshUser();
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      setError(err.message || "Lỗi lưu thông tin cá nhân.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaving(true);
      const res = await uploadImage(file);
      setProfile((prev) => ({ ...prev, avatar: res.url }));
      if (user) {
        await userApi.updateMyProfile({ avatar: res.url });
        await refreshUser();
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Tải ảnh đại diện thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400">
        <Loader2 size={32} className="animate-spin text-red-500 mx-auto mb-3" />
        <p className="text-sm">Đang tải hồ sơ cá nhân...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
            <User size={16} />
            Hồ Sơ An Toàn Thành Viên
          </div>
          <h1 className="text-3xl font-extrabold text-white">Hồ Sơ Cá Nhân</h1>
          <p className="text-slate-300 text-sm mt-1">
            Thông tin này được đồng bộ trực tiếp với hệ thống bảo hộ và cứu nạn khẩn cấp.
          </p>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
            isEditing
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          }`}
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isEditing ? (
            <Save size={16} />
          ) : (
            <Edit2 size={16} />
          )}
          <span>{saving ? "Đang lưu..." : isEditing ? "Lưu thông tin" : "Chỉnh sửa hồ sơ"}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-sm shadow-lg">
          <CheckCircle2 size={18} />
          Hồ sơ và thông tin cá nhân của bạn đã được cập nhật an toàn vào hệ thống!
        </div>
      )}

      {gpsSuccessMsg && (
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-2 text-xs shadow-lg">
          <LocateFixed size={18} className="shrink-0 text-cyan-400" />
          <span>{gpsSuccessMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2 text-sm shadow-lg">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!user && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between text-xs">
          <span>Bạn chưa đăng nhập. Hãy đăng nhập để lưu trữ thông tin cá nhân vĩnh viễn.</span>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
          >
            Đăng nhập ngay
          </Link>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-800">
          <div className="relative group">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-red-500/50 shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl">
                {profile.hovaten ? profile.hovaten.charAt(0).toUpperCase() : "U"}
              </div>
            )}

            <label className="absolute bottom-1 right-1 p-2 rounded-xl bg-slate-900/90 text-white hover:bg-red-600 cursor-pointer transition shadow border border-slate-700">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-white">
              {profile.hovaten || user?.hovaten || "Thành viên An Toàn"}
            </h2>
            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail size={14} className="text-red-400" />
              <span>{user?.email || "Chưa xác thực email"}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                user?.role === "admin"
                  ? "bg-red-950 text-red-400 border-red-800"
                  : "bg-slate-800 text-slate-300 border-slate-700"
              }`}>
                Vai trò: {user?.role || "user"}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Đã đồng bộ cơ sở dữ liệu
              </span>
            </div>
          </div>
        </div>

        {/* Form Fields matching DB user_profiles */}
        <div className="grid sm:grid-cols-2 gap-6 pt-8">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Họ và tên
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.hovaten || ""}
                onChange={(e) =>
                  setProfile({ ...profile, hovaten: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none"
              />
            ) : (
              <p className="text-white font-medium text-sm p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                {profile.hovaten || "Chưa cập nhật"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Số điện thoại liên hệ
            </label>
            {isEditing ? (
              <input
                type="tel"
                placeholder="VD: 0912 345 678"
                value={profile.soDienThoai || ""}
                onChange={(e) =>
                  setProfile({ ...profile, soDienThoai: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none"
              />
            ) : (
              <p className="text-white font-medium text-sm p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                {profile.soDienThoai || "Chưa cập nhật số điện thoại"}
              </p>
            )}
          </div>

          {/* ĐỊA CHỈ THƯỜNG TRÚ + NÚT CẬP NHẬT QUA GPS */}
          <div className="sm:col-span-2 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-semibold text-slate-400">
                Địa chỉ thường trú / Nơi ở
              </label>

              {/* NÚT LẤY ĐỊA CHỈ TỪ GPS */}
              <button
                type="button"
                onClick={handleGetAddressFromGPS}
                disabled={gpsLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 text-xs font-semibold transition active:scale-95 disabled:opacity-50"
              >
                {gpsLoading ? (
                  <Loader2 size={13} className="animate-spin text-cyan-400" />
                ) : (
                  <LocateFixed size={13} className="text-cyan-400" />
                )}
                <span>
                  {gpsLoading ? "Đang dò GPS..." : "📍 Lấy địa chỉ hiện tại từ GPS"}
                </span>
              </button>
            </div>

            {isEditing ? (
              <textarea
                rows={2}
                placeholder="Số nhà, đường phố, phường/xã, quận/huyện... (hoặc bấm nút lấy từ GPS ở trên)"
                value={profile.diaChi || ""}
                onChange={(e) =>
                  setProfile({ ...profile, diaChi: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none"
              />
            ) : (
              <div className="flex items-start justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <p className="text-white font-medium text-sm">
                  {profile.diaChi || "Chưa cập nhật địa chỉ"}
                </p>
                {profile.diaChi && (
                  <MapPin size={16} className="text-red-400 shrink-0 ml-2 mt-0.5" />
                )}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40 transition"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
