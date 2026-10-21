"use client";

import { useState } from "react";
import {
  FileWarning,
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle,
  Camera,
  Send,
  ExternalLink,
  LocateFixed,
  Globe,
} from "lucide-react";
import IncidentLocationPicker from "@/app/components/reports/IncidentLocationPicker";

interface ReportItem {
  id: string;
  title: string;
  category: string;
  severity: string;
  severityColor: string;
  location: string;
  coordinates?: { lat: number; lng: number } | null;
  locationMethod?: "gps" | "nominatim" | "map_click" | "manual";
  date: string;
  status: string;
  statusColor: string;
  responseNote?: string;
}

export default function ReportsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    category: "fire",
    severity: "high",
    title: "",
    location: "Khu vực P. Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    coordinates: { lat: 10.7769, lng: 106.7009 } as {
      lat: number;
      lng: number;
    } | null,
    locationMethod: "gps" as "gps" | "nominatim" | "map_click" | "manual",
    description: "",
    anonymous: false,
  });

  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: "BC-1042",
      title: "Chập điện tại cột biến áp đầu hẻm 45",
      category: "Sự cố điện",
      severity: "Cao",
      severityColor: "text-red-400 bg-red-500/10 border-red-500/20",
      location: "Hẻm 45 Nguyễn Văn Cừ, Phường 1, Quận 5",
      coordinates: { lat: 10.7584, lng: 106.6821 },
      locationMethod: "gps",
      date: "21/10/2026 - 14:15",
      status: "Đang xử lý",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      responseNote:
        "Điện lực TP đã cử tổ kỹ thuật đến hiện trường ngắt cầu dao an toàn.",
    },
    {
      id: "BC-1038",
      title: "Cây xanh cổ thụ nghiêng nguy cơ gãy đổ sau mưa lớn",
      category: "Nguy cơ sụp đổ",
      severity: "Trung bình",
      severityColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      location: "Đường Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3",
      coordinates: { lat: 10.7852, lng: 106.6914 },
      locationMethod: "nominatim",
      date: "20/10/2026 - 18:30",
      status: "Đã giải quyết",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      responseNote:
        "Công ty Công viên Cây xanh đã tỉa cành và giằng chống an toàn.",
    },
    {
      id: "BC-1025",
      title: "Nắp cống thoát nước bị mất gây nguy hiểm người đi đường",
      category: "Hạ tầng",
      severity: "Trung bình",
      severityColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      location: "Ngã tư Hàng Xanh, Phường 25, Bình Thạnh",
      coordinates: { lat: 10.8016, lng: 106.7118 },
      locationMethod: "nominatim",
      date: "19/10/2026 - 09:10",
      status: "Đã giải quyết",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      responseNote: "Đã lắp đặt nắp cống gang thay thế và đặt rào cảnh báo.",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newReport: ReportItem = {
      id: `BC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      category:
        formData.category === "fire"
          ? "Hỏa hoạn / Khói lạ"
          : formData.category === "flood"
            ? "Ngập lụt / Triều cường"
            : formData.category === "electric"
              ? "Sự cố điện lưới"
              : "Sự cố hạ tầng",
      severity:
        formData.severity === "high"
          ? "Cao"
          : formData.severity === "medium"
            ? "Trung bình"
            : "Thấp",
      severityColor:
        formData.severity === "high"
          ? "text-red-400 bg-red-500/10 border-red-500/20"
          : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      location: formData.location,
      coordinates: formData.coordinates,
      locationMethod: formData.locationMethod,
      date: "Vừa xong",
      status: "Đang xác minh",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      responseNote:
        "Hệ thống đã tiếp nhận tọa độ OpenStreetMap & thông báo cho đội phản ứng nhanh.",
    };

    setReports([newReport, ...reports]);
    setSubmitted(true);
    setFormData({
      category: "fire",
      severity: "high",
      title: "",
      location: "Khu vực P. Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      coordinates: { lat: 10.7769, lng: 106.7009 },
      locationMethod: "gps",
      description: "",
      anonymous: false,
    });

    setTimeout(() => setSubmitted(false), 4500);
  };

  const filteredReports = reports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "pending")
      return r.status === "Đang xử lý" || r.status === "Đang xác minh";
    if (filter === "resolved") return r.status === "Đã giải quyết";
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
          <FileWarning size={16} />
          Báo Cáo Cộng Đồng & Tiếp Nhận Sự Cố (OpenStreetMap + GPS)
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Báo Cáo Sự Cố An Toàn
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Gửi thông tin sự cố an toàn kèm tọa độ định vị GPS thiết bị của bạn và định vị trên nền bản đồ OpenStreetMap chuẩn.
        </p>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 shadow-lg">
          <CheckCircle size={20} className="shrink-0 text-emerald-400" />
          <p className="text-sm">
            <strong>Báo cáo của bạn đã được gửi thành công!</strong> Tọa độ vị
            trí đã được chuyển đến trung tâm cứu hộ và định vị trên bản đồ
            OpenStreetMap.
          </p>
        </div>
      )}

      {/* Main Grid: Form on Left, List on Right */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* FORM (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PlusCircle size={18} className="text-red-500" />
            Tạo Báo Cáo Mới
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Loại sự cố
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              >
                <option value="fire">Hỏa hoạn / Khói lạ / Cháy cỏ</option>
                <option value="flood">Ngập lụt sâu / Triều cường</option>
                <option value="collapse">
                  Cây gãy đổ / Sạt lở / Công trình
                </option>
                <option value="electric">
                  Rò rỉ điện / Đứt dây cáp / Khí gas
                </option>
                <option value="traffic">Tai nạn giao thông nghiêm trọng</option>
                <option value="other">Mối nguy hiểm khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mức độ khẩn cấp
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "high",
                    label: "Cấp bách",
                    color: "hover:border-red-500",
                  },
                  {
                    id: "medium",
                    label: "Trung bình",
                    color: "hover:border-yellow-500",
                  },
                  { id: "low", label: "Thấp", color: "hover:border-blue-500" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, severity: s.id })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      formData.severity === s.id
                        ? "bg-red-600 text-white border-red-500 shadow"
                        : `bg-slate-900 text-slate-400 border-slate-800 ${s.color}`
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tiêu đề sự cố
              </label>
              <input
                type="text"
                required
                placeholder="VD: Cháy bụi tre gần đường dây điện..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            {/* BỘ CHỌN VỊ TRÍ VỚI 2 LỰA CHỌN: GPS VÀ NOMINATIM OPENSTREETMAP */}
            <IncidentLocationPicker
              locationText={formData.location}
              coordinates={formData.coordinates}
              locationMethod={formData.locationMethod}
              onChange={({ location, coordinates, method }) => {
                setFormData((prev) => ({
                  ...prev,
                  location,
                  coordinates,
                  locationMethod: method,
                }));
              }}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mô tả chi tiết
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả mức độ nguy hiểm, số người ảnh hưởng, lối tiếp cận cho xe cứu hỏa..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            <div className="border border-dashed border-slate-700 rounded-xl p-3 text-center cursor-pointer hover:border-slate-500 transition">
              <Camera size={20} className="mx-auto text-slate-400 mb-1" />
              <p className="text-xs text-slate-300 font-medium">
                Đính kèm ảnh hoặc video hiện trường
              </p>
              <p className="text-[10px] text-slate-500">
                Hỗ trợ PNG, JPG, MP4 tối đa 25MB
              </p>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.anonymous}
                onChange={(e) =>
                  setFormData({ ...formData, anonymous: e.target.checked })
                }
                className="rounded text-red-600 focus:ring-0"
              />
              <span>Gửi báo cáo ẩn danh (không công khai tên)</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition"
            >
              <Send size={16} />
              Gửi Báo Cáo Ngay
            </button>
          </form>
        </div>

        {/* LIST OF REPORTS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-yellow-400" />
              Lịch Sử & Tình Trạng Báo Cáo
            </h2>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  filter === "all"
                    ? "bg-red-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  filter === "pending"
                    ? "bg-red-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Đang xử lý
              </button>
              <button
                type="button"
                onClick={() => setFilter("resolved")}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  filter === "resolved"
                    ? "bg-red-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Đã giải quyết
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {report.id} • {report.category}
                      </span>
                      {report.locationMethod === "gps" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                          <LocateFixed size={10} /> GPS Thiết Bị
                        </span>
                      )}
                      {report.locationMethod === "nominatim" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-400 border border-purple-800">
                          <Globe size={10} /> OpenStreetMap
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-base mt-0.5">
                      {report.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase shrink-0 ${report.statusColor}`}
                  >
                    {report.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-red-400 shrink-0" />
                    <span>{report.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {report.date}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${report.severityColor}`}
                  >
                    Mức {report.severity}
                  </span>
                </div>

                {/* Tọa độ và liên kết OpenStreetMap */}
                {report.coordinates && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                    <span className="font-mono text-[11px] text-cyan-400">
                      Tọa độ: {report.coordinates.lat.toFixed(4)},{" "}
                      {report.coordinates.lng.toFixed(4)}
                    </span>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${report.coordinates.lat}&mlon=${report.coordinates.lng}#map=16/${report.coordinates.lat}/${report.coordinates.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-slate-300 hover:text-white font-medium flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                    >
                      <span>Xem trên OSM</span>
                      <ExternalLink size={11} className="text-yellow-400" />
                    </a>
                  </div>
                )}

                {report.responseNote && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="text-yellow-400 font-semibold">
                      Cập nhật phản hồi:{" "}
                    </span>
                    {report.responseNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
