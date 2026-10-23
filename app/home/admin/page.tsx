"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Users,
  MessageSquare,
  FileWarning,
  RefreshCw,
  Search,
  Lock,
} from "lucide-react";
import {
  incidentApi,
  feedbackApi,
  userApi,
  IncidentData,
  IncidentStatus,
  FeedbackData,
  UserData,
} from "@/app/lib/api";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "incidents" | "feedback" | "users"
  >("incidents");
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    try {
      const [incData, fbData, uData] = await Promise.all([
        incidentApi.getAll().catch(() => []),
        feedbackApi.getAll().catch(() => []),
        userApi.getAll().catch(() => []),
      ]);
      setIncidents(incData || []);
      setFeedbacks(fbData || []);
      setUsers(uData || []);
    } catch (err: any) {
      console.error("Lỗi tải dữ liệu admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAdmin) {
      void Promise.resolve().then(() => loadData());
    }
  }, [authLoading, isAdmin]);

  // NẾU LÀ USER HOẶC CHƯA ĐĂNG NHẬP: CHẶN TRUY CẬP VÀ ẨN NỘI DUNG ADMIN
  if (authLoading) {
    return (
      <div className="p-16 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Đang xác minh phân quyền...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-950 border border-red-900/60 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-700 text-red-500 flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-white">
            Quyền Truy Cập Bị Từ Chối
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Trang Quản trị hệ thống này chỉ dành riêng cho tài khoản có vai trò{" "}
            <strong>Quản trị viên (Admin)</strong>. Tài khoản hiện tại của bạn
            là <strong>{user?.role || "user"}</strong>.
          </p>
          <div className="pt-2">
            <Link
              href="/home"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-900/40 transition"
            >
              Quay lại Bảng điều khiển
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  // 1-Click Approve for Urgent Incident
  const handleApproveUrgent = async (id: number) => {
    try {
      await incidentApi.approve(id);
      showNotification(
        `⚡ Đã duyệt ngay sự cố #${id}! Chuyển sang trạng thái Đang xử lý.`,
      );
      setIncidents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, trangThai: "Dang xu ly" } : item,
        ),
      );
    } catch (err: any) {
      alert("Lỗi khi duyệt: " + err.message);
    }
  };

  // Update Status
  const handleUpdateStatus = async (id: number, status: IncidentStatus) => {
    try {
      await incidentApi.updateStatus(id, status);
      showNotification(`Đã chuyển trạng thái sự cố #${id} sang "${status}"`);
      setIncidents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, trangThai: status } : item,
        ),
      );
    } catch (err: any) {
      alert("Lỗi cập nhật trạng thái: " + err.message);
    }
  };

  // Delete Incident
  const handleDeleteIncident = async (id: number) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa sự cố #${id}?`)) return;
    try {
      await incidentApi.delete(id);
      showNotification(`Đã xóa sự cố #${id}`);
      setIncidents((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Lỗi khi xóa: " + err.message);
    }
  };

  // Delete Feedback
  const handleDeleteFeedback = async (id: number) => {
    if (!confirm(`Bạn có chắc muốn xóa phản hồi #${id}?`)) return;
    try {
      await feedbackApi.delete(id);
      showNotification(`Đã xóa phản hồi #${id}`);
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Lỗi khi xóa: " + err.message);
    }
  };

  // Toggle User Role
  const handleToggleUserRole = async (u: UserData) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (
      !confirm(
        `Chuyển quyền tài khoản ${u.email} sang vai trò "${newRole.toUpperCase()}"?`,
      )
    )
      return;
    try {
      await userApi.updateRole(u.id, newRole);
      showNotification(`Đã cập nhật quyền của ${u.email} thành ${newRole}`);
      setUsers((prev) =>
        prev.map((item) =>
          item.id === u.id ? { ...item, role: newRole } : item,
        ),
      );
    } catch (err: any) {
      alert("Lỗi cập nhật vai trò: " + err.message);
    }
  };

  // Delete User
  const handleDeleteUser = async (id: number) => {
    if (!confirm(`Bạn có chắc muốn xóa người dùng #${id}?`)) return;
    try {
      await userApi.delete(id);
      showNotification(`Đã xóa người dùng #${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Lỗi xóa người dùng: " + err.message);
    }
  };

  // Stats calculation
  const totalIncidents = incidents.length;
  const urgentCount = incidents.filter((i) => i.mucDo === "Cap bach").length;
  const pendingCount = incidents.filter(
    (i) => i.trangThai === "Cho xu ly",
  ).length;
  const inProgressCount = incidents.filter(
    (i) => i.trangThai === "Dang xu ly",
  ).length;
  const resolvedCount = incidents.filter(
    (i) => i.trangThai === "Da xu ly",
  ).length;

  // Filtered incidents
  const filteredIncidents = incidents.filter((i) => {
    if (statusFilter !== "all" && i.trangThai !== statusFilter) return false;
    if (severityFilter !== "all" && i.mucDo !== severityFilter) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      const matchTitle = i.tieuDe?.toLowerCase().includes(s);
      const matchAddr = i.diaChi?.toLowerCase().includes(s);
      const matchType = i.loaiSuCo?.toLowerCase().includes(s);
      if (!matchTitle && !matchAddr && !matchType) return false;
    }
    return true;
  });

  // Urgent list needing attention
  const urgentPendingList = incidents.filter(
    (i) => i.mucDo === "Cap bach" && i.trangThai === "Cho xu ly",
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert size={16} />
            Hệ Thống Trung Tâm Điều Hành & Duyệt Sự Cố Khẩn Cấp
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Bảng Quản Trị Hệ Thống (Admin Panel)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Quản lý và tiếp nhận sự cố cộng đồng, điều phối cứu nạn khẩn cấp,
            xem phản hồi và phân quyền tài khoản.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition shrink-0"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Làm mới dữ liệu</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center gap-3 shadow-lg">
          <CheckCircle2 size={20} className="shrink-0" />
          <p className="text-sm font-medium">{actionMessage}</p>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Tổng sự cố</p>
          <p className="text-2xl font-black text-white mt-1">
            {totalIncidents}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 shadow-lg shadow-red-950/30">
          <div className="flex items-center justify-between">
            <p className="text-xs text-red-300 font-bold">Cấp bách</p>
            <Zap size={14} className="text-yellow-400 animate-pulse" />
          </div>
          <p className="text-2xl font-black text-red-400 mt-1">{urgentCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-900/40">
          <p className="text-xs text-amber-400 font-medium">Chờ xử lý</p>
          <p className="text-2xl font-black text-amber-300 mt-1">
            {pendingCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-900/40">
          <p className="text-xs text-cyan-400 font-medium">Đang xử lý</p>
          <p className="text-2xl font-black text-cyan-300 mt-1">
            {inProgressCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-900/40">
          <p className="text-xs text-emerald-400 font-medium">Đã giải quyết</p>
          <p className="text-2xl font-black text-emerald-300 mt-1">
            {resolvedCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Phản hồi</p>
          <p className="text-2xl font-black text-yellow-400 mt-1">
            {feedbacks.length}
          </p>
        </div>
      </div>

      {/* SPECIAL SECTION: URGENT INCIDENTS (CẤP BÁCH - DUYỆT NGAY) */}
      {urgentPendingList.length > 0 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/90 via-red-900/50 to-slate-950 border-2 border-red-600 shadow-2xl shadow-red-950/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-600 text-white animate-bounce">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <span>
                    CẢNH BÁO: CÓ {urgentPendingList.length} SỰ CỐ CẤP BÁCH CHỜ
                    DUYỆT!
                  </span>
                </h2>
                <p className="text-xs text-red-200 mt-0.5">
                  Vui lòng bấm &quot;Duyệt ngay&quot; để ngay lập tức điều phối
                  lực lượng chức năng đến hiện trường.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {urgentPendingList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950/90 border border-red-600/60 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-red-400 mb-1">
                    <span>
                      #SC-{item.id} • {item.loaiSuCo}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold uppercase text-[9px]">
                      CẤP BÁCH
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">
                    {item.tieuDe}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.moTaChiTiet || "Không có mô tả chi tiết."}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    📍 {item.diaChi}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${item.latitude}&mlon=${item.longitude}#map=16/${item.latitude}/${item.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Xem vị trí OSM</span>
                    <ExternalLink size={10} />
                  </a>

                  <button
                    onClick={() => item.id && handleApproveUrgent(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/50 transition active:scale-95"
                  >
                    <Zap size={14} className="text-yellow-300" />
                    <span>DUYỆT NGAY</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("incidents")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "incidents"
              ? "border-red-500 text-red-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <FileWarning size={16} />
          <span>Quản Lý Sự Cố ({incidents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("feedback")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "feedback"
              ? "border-red-500 text-red-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <MessageSquare size={16} />
          <span>Hòm Thư Phản Hồi ({feedbacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "users"
              ? "border-red-500 text-red-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Users size={16} />
          <span>Người Dùng Hệ Thống ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: INCIDENTS MANAGEMENT */}
      {activeTab === "incidents" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm theo tiêu đề, địa chỉ, loại sự cố..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Cho xu ly">Chờ xử lý</option>
                <option value="Dang xu ly">Đang xử lý</option>
                <option value="Da xu ly">Đã giải quyết</option>
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="Cap bach">Cấp bách</option>
                <option value="Trung binh">Trung bình</option>
                <option value="Thap">Thấp</option>
              </select>
            </div>
          </div>

          {/* Table / Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Mã / Tiêu đề</th>
                    <th className="p-4">Mức độ</th>
                    <th className="p-4">Vị trí & GPS</th>
                    <th className="p-4">Ảnh</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredIncidents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-slate-500"
                      >
                        Không tìm thấy sự cố nào phù hợp bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredIncidents.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-800/40 transition"
                      >
                        <td className="p-4 max-w-xs">
                          <p className="font-mono text-[10px] text-slate-500">
                            #SC-{item.id} • {item.loaiSuCo}
                          </p>
                          <p className="font-bold text-white text-sm mt-0.5">
                            {item.tieuDe}
                          </p>
                          {item.moTaChiTiet && (
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                              {item.moTaChiTiet}
                            </p>
                          )}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {item.mucDo === "Cap bach" ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                              Cấp bách
                            </span>
                          ) : item.mucDo === "Trung binh" ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Trung bình
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Thấp
                            </span>
                          )}
                        </td>

                        <td className="p-4 max-w-xs">
                          <p className="text-slate-300 line-clamp-2">
                            {item.diaChi}
                          </p>
                          <a
                            href={`https://www.openstreetmap.org/?mlat=${item.latitude}&mlon=${item.longitude}#map=16/${item.latitude}/${item.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-cyan-400 hover:underline font-mono mt-1 inline-flex items-center gap-1"
                          >
                            <span>
                              {Number(item.latitude).toFixed(4)},{" "}
                              {Number(item.longitude).toFixed(4)}
                            </span>
                            <ExternalLink size={9} />
                          </a>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {item.imageUrl ? (
                            <a
                              href={item.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="block"
                            >
                              <img
                                src={item.imageUrl}
                                alt="Hiện trường"
                                className="w-12 h-12 rounded-lg object-cover border border-slate-700 hover:scale-105 transition"
                              />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-500">
                              Không có
                            </span>
                          )}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <select
                            value={item.trangThai || "Cho xu ly"}
                            onChange={(e) =>
                              item.id &&
                              handleUpdateStatus(
                                item.id,
                                e.target.value as IncidentStatus,
                              )
                            }
                            className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${
                              item.trangThai === "Dang xu ly"
                                ? "bg-cyan-950/80 text-cyan-300 border-cyan-700"
                                : item.trangThai === "Da xu ly"
                                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700"
                                  : "bg-amber-950/80 text-amber-300 border-amber-700"
                            }`}
                          >
                            <option value="Cho xu ly">Chờ xử lý</option>
                            <option value="Dang xu ly">Đang xử lý</option>
                            <option value="Da xu ly">Đã giải quyết</option>
                          </select>
                        </td>

                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* Duyệt ngay button if not yet in progress */}
                            {item.trangThai === "Cho xu ly" && (
                              <button
                                onClick={() =>
                                  item.id && handleApproveUrgent(item.id)
                                }
                                title="Duyệt ngay sự cố này"
                                className="p-1.5 rounded-lg bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition flex items-center gap-1"
                              >
                                <Zap size={12} className="text-yellow-400" />
                                <span>Duyệt</span>
                              </button>
                            )}

                            <button
                              onClick={() =>
                                item.id && handleDeleteIncident(item.id)
                              }
                              title="Xóa sự cố"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FEEDBACK MANAGEMENT */}
      {activeTab === "feedback" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Người gửi</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Nội dung phản hồi</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Chưa có phản hồi nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  feedbacks.map((fb) => (
                    <tr
                      key={fb.id}
                      className="hover:bg-slate-800/40 transition"
                    >
                      <td className="p-4 font-mono text-slate-500">#{fb.id}</td>
                      <td className="p-4 font-bold text-white">{fb.hovaten}</td>
                      <td className="p-4 text-slate-300">{fb.email}</td>
                      <td className="p-4 max-w-md text-slate-200">
                        {fb.content}
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {fb.createdAt
                          ? new Date(fb.createdAt).toLocaleString("vi-VN")
                          : "Vừa xong"}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => fb.id && handleDeleteFeedback(fb.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition"
                          title="Xóa phản hồi"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USERS MANAGEMENT */}
      {activeTab === "users" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Họ và tên</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Vai trò (Role)</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Không có người dùng nào.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono text-slate-500">#{u.id}</td>
                      <td className="p-4 font-bold text-white">{u.hovaten}</td>
                      <td className="p-4 text-slate-300">{u.email}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            u.role === "admin"
                              ? "bg-red-500/20 text-red-400 border border-red-500/40"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {u.ngaytao
                          ? new Date(u.ngaytao).toLocaleDateString("vi-VN")
                          : "N/A"}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleUserRole(u)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-semibold border border-slate-700 transition"
                          >
                            {u.role === "admin" ? "Hạ xuống User" : "Lên Admin"}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition"
                            title="Xóa tài khoản"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
