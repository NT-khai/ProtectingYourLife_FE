"use client";

import { useState, useEffect, useRef } from "react";
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
  AlertTriangle,
  Loader2,
  X,
  Zap,
  Flame,
} from "lucide-react";
import IncidentLocationPicker from "@/app/components/reports/IncidentLocationPicker";
import {
  incidentApi,
  uploadImage,
  IncidentData,
  IncidentSeverity,
} from "@/app/lib/api";
import { useAuth } from "@/app/context/AuthContext";

export default function ReportsPage() {
  const { user } = useAuth();

  const [reports, setReports] = useState<IncidentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State matching Database
  const [formData, setFormData] = useState({
    loaiSuCo: "Hỏa hoạn / Khói lạ",
    mucDo: "Cap bach" as IncidentSeverity, // Mặc định Cấp bách
    tieuDe: "",
    diaChi: "Khu vực P. Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    coordinates: { lat: 10.7769, lng: 106.7009 } as {
      lat: number;
      lng: number;
    } | null,
    locationMethod: "gps" as "gps" | "nominatim" | "map_click" | "manual",
    moTaChiTiet: "",
  });

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await incidentApi.getAll();
      setReports(data || []);
    } catch (err: any) {
      console.error("Lỗi tải danh sách sự cố:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setErrorMessage(null);
      const res = await uploadImage(file);
      setUploadedImageUrl(res.url);
    } catch (err: any) {
      setErrorMessage(err.message || "Tải ảnh lên thất bại. Vui lòng thử lại.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tieuDe.trim()) {
      setErrorMessage("Vui lòng nhập tiêu đề sự cố");
      return;
    }

    if (!formData.coordinates) {
      setErrorMessage("Vui lòng xác định vị trí GPS hoặc chọn trên bản đồ");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload: IncidentData = {
        userId: user?.id,
        loaiSuCo: formData.loaiSuCo,
        mucDo: formData.mucDo,
        tieuDe: formData.tieuDe,
        latitude: formData.coordinates.lat,
        longitude: formData.coordinates.lng,
        diaChi: formData.diaChi,
        moTaChiTiet: formData.moTaChiTiet,
        imageUrl: uploadedImageUrl || undefined,
      };

      const created = await incidentApi.create(payload);

      let successText = "Báo cáo sự cố của bạn đã được gửi thành công!";
      if (formData.mucDo === "Cap bach") {
        successText =
          "⚡ Sự cố CẤP BÁCH đã được hệ thống DUYỆT NGAY và chuyển sang trạng thái Đang xử lý!";
      }

      setSubmittedMessage(successText);
      setReports((prev) => [created, ...prev]);

      // Reset form
      setFormData({
        loaiSuCo: "Hỏa hoạn / Khói lạ",
        mucDo: "Cap bach",
        tieuDe: "",
        diaChi: "Khu vực P. Bến Nghé, Quận 1, TP. Hồ Chí Minh",
        coordinates: { lat: 10.7769, lng: 106.7009 },
        locationMethod: "gps",
        moTaChiTiet: "",
      });
      setUploadedImageUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => setSubmittedMessage(null), 6000);
    } catch (err: any) {
      setErrorMessage(err.message || "Gửi báo cáo thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReports = reports.filter((r) => {
    if (filter === "all") return true;
    if (filter === "urgent") return r.mucDo === "Cap bach";
    if (filter === "pending") return r.trangThai === "Cho xu ly";
    if (filter === "in_progress") return r.trangThai === "Dang xu ly";
    if (filter === "resolved") return r.trangThai === "Da xu ly";
    return true;
  });

  const getSeverityBadge = (mucDo: string) => {
    if (mucDo === "Cap bach") {
      return {
        label: "Cấp bách",
        badge: "text-red-400 bg-red-500/10 border-red-500/30",
        urgent: true,
      };
    }
    if (mucDo === "Trung binh") {
      return {
        label: "Trung bình",
        badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        urgent: false,
      };
    }
    return {
      label: "Thấp",
      badge: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      urgent: false,
    };
  };

  const getStatusBadge = (trangThai?: string) => {
    if (trangThai === "Dang xu ly") {
      return {
        label: "Đang xử lý (Đã duyệt)",
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      };
    }
    if (trangThai === "Da xu ly") {
      return {
        label: "Đã giải quyết",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      };
    }
    return {
      label: "Chờ xử lý",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    };
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
          <FileWarning size={16} />
          Tiếp Nhận Sự Cố & Định Vị Khẩn Cấp (GPS + OpenStreetMap)
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Báo Cáo Sự Cố An Toàn
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Gửi thông tin sự cố an toàn kèm tọa độ GPS chính xác từ thiết bị và
          ảnh chụp hiện trường để lực lượng cứu nạn tiếp cận nhanh nhất.
        </p>
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center gap-3 shadow-lg">
          <CheckCircle size={22} className="shrink-0 text-emerald-400" />
          <p className="text-sm font-medium">{submittedMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-400 flex items-center gap-3 shadow-lg">
          <AlertTriangle size={22} className="shrink-0 text-red-400" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Main Grid: Form on Left, List on Right */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* FORM (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 shadow-2xl h-fit">
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
                value={formData.loaiSuCo}
                onChange={(e) =>
                  setFormData({ ...formData, loaiSuCo: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              >
                <option value="Hỏa hoạn / Khói lạ">
                  Hỏa hoạn / Cháy nổ / Khói lạ
                </option>
                <option value="Ngập lụt / Triều cường">
                  Ngập lụt sâu / Triều cường dâng
                </option>
                <option value="Cây xanh gãy đổ / Sạt lở">
                  Cây gãy đổ / Sạt lở / Sụp công trình
                </option>
                <option value="Rò rỉ điện / Đứt cáp">
                  Rò rỉ điện / Đứt dây cáp / Rò rỉ khí gas
                </option>
                <option value="Tai nạn giao thông">
                  Tai nạn giao thông nghiêm trọng
                </option>
                <option value="Mối nguy hiểm khác">
                  Mối nguy hiểm an toàn khác
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mức độ khẩn cấp
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "Cap bach",
                    label: "Cấp bách",
                    activeClass:
                      "bg-red-600 text-white border-red-500 shadow-md",
                  },
                  {
                    id: "Trung binh",
                    label: "Trung bình",
                    activeClass:
                      "bg-amber-600 text-white border-amber-500 shadow-md",
                  },
                  {
                    id: "Thap",
                    label: "Thấp",
                    activeClass:
                      "bg-blue-600 text-white border-blue-500 shadow-md",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mucDo: s.id as IncidentSeverity,
                      })
                    }
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition ${
                      formData.mucDo === s.id
                        ? s.activeClass
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Special Urgent Approval Banner */}
              {formData.mucDo === "Cap bach" && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-red-950/60 border border-red-600/40 text-red-300 text-[11px] flex items-center gap-2">
                  <Zap
                    size={14}
                    className="text-yellow-400 shrink-0 animate-pulse"
                  />
                  <span>
                    <strong>Cơ chế khẩn cấp:</strong> Sự cố cấp bách sẽ được hệ
                    thống <strong>tự động duyệt ngay</strong> và kích hoạt cảnh
                    báo cứu trợ!
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tiêu đề sự cố
              </label>
              <input
                type="text"
                required
                placeholder="VD: Cháy bụi rậm gần cột điện, khói đen bốc cao..."
                value={formData.tieuDe}
                onChange={(e) =>
                  setFormData({ ...formData, tieuDe: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            {/* BỘ CHỌN VỊ TRÍ GPS VÀ OPENSTREETMAP */}
            <IncidentLocationPicker
              locationText={formData.diaChi}
              coordinates={formData.coordinates}
              locationMethod={formData.locationMethod}
              onChange={({ location, coordinates, method }) => {
                setFormData((prev) => ({
                  ...prev,
                  diaChi: location,
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
                placeholder="Mô tả cụ thể người bị kẹt, chướng ngại vật, lối tiếp cận cho xe cứu nạn..."
                value={formData.moTaChiTiet}
                onChange={(e) =>
                  setFormData({ ...formData, moTaChiTiet: e.target.value })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            {/* UPLOAD ẢNH HIỆN TRƯỜNG */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Hình ảnh hiện trường sự cố
              </label>

              {uploadedImageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img
                    src={uploadedImageUrl}
                    alt="Hiện trường sự cố"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-white transition"
                    title="Xóa ảnh"
                  >
                    <X size={14} />
                  </button>
                  <div className="p-2 text-[10px] text-emerald-400 bg-slate-950/90 flex items-center gap-1.5 border-t border-slate-800">
                    <CheckCircle size={12} />
                    <span>Ảnh đã sẵn sàng đính kèm</span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-xl p-3 text-center cursor-pointer transition ${
                    uploadingImage
                      ? "border-red-500 bg-red-950/20"
                      : "border-slate-700 hover:border-slate-500 bg-slate-900/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {uploadingImage ? (
                    <div className="flex flex-col items-center justify-center py-2">
                      <Loader2
                        size={22}
                        className="animate-spin text-red-500 mb-1"
                      />
                      <p className="text-xs text-slate-300">
                        Đang tải ảnh lên máy chủ...
                      </p>
                    </div>
                  ) : (
                    <>
                      <Camera
                        size={20}
                        className="mx-auto text-slate-400 mb-1"
                      />
                      <p className="text-xs text-slate-300 font-medium">
                        Bấm để chụp hoặc chọn ảnh hiện trường
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Hỗ trợ JPG, PNG, WEBP tối đa 20MB
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Đang gửi sự cố...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Gửi Báo Cáo Sự Cố</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* LIST OF REPORTS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-yellow-400" />
              Lịch Sử & Tình Trạng Tiếp Nhận ({reports.length})
            </h2>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
              {[
                { id: "all", label: "Tất cả" },
                { id: "urgent", label: "Cấp bách" },
                { id: "pending", label: "Chờ xử lý" },
                { id: "in_progress", label: "Đang xử lý" },
                { id: "resolved", label: "Đã giải quyết" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap ${
                    filter === t.id
                      ? "bg-red-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800">
              <Loader2
                size={28}
                className="animate-spin text-red-500 mx-auto mb-2"
              />
              <p className="text-sm text-slate-400">
                Đang tải danh sách sự cố...
              </p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400">
              <FileWarning size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Chưa có sự cố nào thuộc danh mục này.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredReports.map((report) => {
                const sev = getSeverityBadge(report.mucDo);
                const sta = getStatusBadge(report.trangThai);

                return (
                  <div
                    key={report.id}
                    className={`p-5 rounded-2xl bg-slate-900/80 border transition space-y-3 shadow-lg ${
                      sev.urgent
                        ? "border-red-900/50 hover:border-red-600/70"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            SC-{report.id} • {report.loaiSuCo}
                          </span>
                          {sev.urgent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-700 animate-pulse">
                              <Zap size={10} /> Cấp Bách (Ưu Tiên Duyệt)
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-base mt-0.5">
                          {report.tieuDe}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase shrink-0 ${sta.color}`}
                      >
                        {sta.label}
                      </span>
                    </div>

                    {report.moTaChiTiet && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {report.moTaChiTiet}
                      </p>
                    )}

                    {/* Image Attachment Preview */}
                    {report.imageUrl && (
                      <div className="mt-2">
                        <a
                          href={report.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block group relative rounded-xl overflow-hidden border border-slate-700 max-w-xs"
                        >
                          <img
                            src={report.imageUrl}
                            alt={report.tieuDe}
                            className="h-28 w-48 object-cover group-hover:scale-105 transition"
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 py-0.5 rounded text-white font-medium">
                            Xem ảnh lớn
                          </span>
                        </a>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-red-400 shrink-0" />
                        <span>{report.diaChi}</span>
                      </span>
                      {report.ngayTao && (
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {new Date(report.ngayTao).toLocaleString("vi-VN")}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${sev.badge}`}
                      >
                        Mức {sev.label}
                      </span>
                    </div>

                    {/* Coordinates & OpenStreetMap Link */}
                    {report.latitude && report.longitude && (
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                        <span className="font-mono text-[11px] text-cyan-400">
                          Tọa độ GPS: {Number(report.latitude).toFixed(5)},{" "}
                          {Number(report.longitude).toFixed(5)}
                        </span>
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${report.latitude}&mlon=${report.longitude}#map=16/${report.latitude}/${report.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-300 hover:text-white font-medium flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                        >
                          <span>Xem trên OpenStreetMap</span>
                          <ExternalLink size={11} className="text-yellow-400" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
