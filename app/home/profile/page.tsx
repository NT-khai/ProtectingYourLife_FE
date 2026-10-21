"use client";

import { useState } from "react";
import {
  User,
  HeartPulse,
  Phone,
  ShieldCheck,
  Award,
  Edit2,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [medicalInfo, setMedicalInfo] = useState({
    name: "Nguyễn Văn An",
    phone: "0918 888 999",
    email: "an.nguyen@example.com",
    address: "Số 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    bloodType: "O+",
    allergies: "Dị ứng Penicillin, Hải sản",
    chronicConditions: "Hen suyễn nhẹ",
    insuranceNumber: "GD4790123456789",
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: "Nguyễn Thị Mai", relation: "Mẹ", phone: "0908 123 456" },
    { id: 2, name: "Nguyễn Văn Hùng", relation: "Anh trai", phone: "0912 345 678" },
  ]);

  const [newContact, setNewContact] = useState({ name: "", relation: "", phone: "" });
  const [showAddContact, setShowAddContact] = useState(false);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts([
      ...contacts,
      { id: Date.now(), name: newContact.name, relation: newContact.relation || "Người thân", phone: newContact.phone },
    ]);
    setNewContact({ name: "", relation: "", phone: "" });
    setShowAddContact(false);
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
            <User size={16} />
            Hồ Sơ An Toàn & Y Tế Khẩn Cấp
          </div>
          <h1 className="text-3xl font-extrabold text-white">Hồ Sơ Cá Nhân</h1>
          <p className="text-slate-300 text-sm mt-1">
            Thông tin y tế này sẽ được hiển thị khi nhân viên cứu hộ quét mã SOS hoặc tiếp nhận cấp cứu.
          </p>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }
            setIsEditing(!isEditing);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
            isEditing
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          }`}
        >
          {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
          <span>{isEditing ? "Lưu thông tin" : "Chỉnh sửa hồ sơ"}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-sm">
          <CheckCircle2 size={18} />
          Thông tin y tế và hồ sơ cá nhân của bạn đã được cập nhật an toàn!
        </div>
      )}

      {/* EMERGENCY MEDICAL CARD (CRITICAL ID) */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-red-950/70 via-slate-900 to-slate-950 border-2 border-red-800/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-900/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <HeartPulse size={26} />
            </div>
            <div>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                THẺ Y TẾ CẤP CỨU (EMERGENCY MEDICAL ID)
              </span>
              <h2 className="text-2xl font-black text-white">{medicalInfo.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Nhóm máu:</span>
            <span className="text-2xl font-black text-red-500 bg-red-950 px-3 py-1 rounded-xl border border-red-800">
              {medicalInfo.bloodType}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1 font-semibold">Tiền sử dị ứng thuốc & thực phẩm:</span>
            {isEditing ? (
              <input
                type="text"
                value={medicalInfo.allergies}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs mt-1"
              />
            ) : (
              <p className="text-sm font-bold text-yellow-400">{medicalInfo.allergies}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1 font-semibold">Bệnh lý nền cần lưu ý:</span>
            {isEditing ? (
              <input
                type="text"
                value={medicalInfo.chronicConditions}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, chronicConditions: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs mt-1"
              />
            ) : (
              <p className="text-sm font-bold text-white">{medicalInfo.chronicConditions}</p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1 font-semibold">Mã thẻ BHYT:</span>
            {isEditing ? (
              <input
                type="text"
                value={medicalInfo.insuranceNumber}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, insuranceNumber: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs mt-1 font-mono"
              />
            ) : (
              <p className="text-sm font-mono font-bold text-cyan-400">{medicalInfo.insuranceNumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Two columns: User Details & Emergency Contacts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-yellow-400" size={20} />
            Thông Tin Liên Lạc Cá Nhân
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Họ và tên</label>
              <input
                type="text"
                disabled={!isEditing}
                value={medicalInfo.name}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Số điện thoại</label>
              <input
                type="text"
                disabled={!isEditing}
                value={medicalInfo.phone}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={medicalInfo.email}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Địa chỉ thường trú</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={medicalInfo.address}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white disabled:opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contacts Management */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="text-red-500" size={20} />
              Người Thân Khẩn Cấp (SOS)
            </h3>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
            >
              <Plus size={14} /> Thêm người thân
            </button>
          </div>

          {showAddContact && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <p className="font-bold text-white">Thêm người liên hệ khẩn cấp mới</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Họ tên"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Mối quan hệ (Cha, mẹ, bạn...)"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Số điện thoại"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold"
                >
                  Xác nhận thêm
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] text-yellow-400 font-bold uppercase">{c.relation}</span>
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <p className="text-xs text-slate-400">{c.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                    title="Gọi ngay"
                  >
                    <Phone size={14} />
                  </a>
                  <button
                    onClick={() => handleDeleteContact(c.id)}
                    className="p-2 bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 rounded-xl transition"
                    title="Xóa"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Safety Training Certification */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-yellow-400" />
              Chứng Chỉ Đã Hoàn Thành
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                ✓ PCCC Cơ Bản (2025)
              </span>
              <span className="px-3 py-1 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-semibold">
                ✓ Kỹ năng Sơ cứu CPR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
