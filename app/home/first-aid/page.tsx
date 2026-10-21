"use client";

import { useState, useEffect } from "react";
import {
  HeartPulse,
  Play,
  Square,
  Phone,
  CheckCircle,
  XCircle,
  Flame,
  Droplets,
  Bone,
  Wind,
} from "lucide-react";

export default function FirstAidPage() {
  const [activeTab, setActiveTab] = useState("cpr");
  const [cprRunning, setCprRunning] = useState(false);
  const [beat, setBeat] = useState(false);

  // 110 beats per minute = ~545ms per beat
  useEffect(() => {
    if (!cprRunning) return;
    const interval = setInterval(() => {
      setBeat((prev) => !prev);
    }, 545);
    return () => clearInterval(interval);
  }, [cprRunning]);

  const toggleCpr = () => {
    if (cprRunning) {
      setCprRunning(false);
      setBeat(false);
    } else {
      setCprRunning(true);
    }
  };

  const topics = [
    { id: "cpr", title: "Hồi sinh tim phổi (CPR)", icon: HeartPulse },
    { id: "bleeding", title: "Cầm máu vết thương", icon: Droplets },
    { id: "burns", title: "Xử lý bỏng nhiệt", icon: Flame },
    { id: "choking", title: "Dị vật đường thở (Heimlich)", icon: Wind },
    { id: "fracture", title: "Gãy xương chi", icon: Bone },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HeartPulse size={16} />
            Cẩm Nang Sơ Cứu Sinh Tồn (First Aid 101)
          </div>
          <h1 className="text-3xl font-extrabold text-white">Kỹ Năng Sơ Cứu Khẩn Cấp</h1>
          <p className="text-slate-300 text-sm mt-1">
            4 phút đầu tiên là thời gian vàng để cứu sống người bệnh. Hãy giữ bình tĩnh và thực hiện đúng kỹ thuật.
          </p>
        </div>

        <a
          href="tel:115"
          className="self-start md:self-center flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/30 transition"
        >
          <Phone size={18} />
          Gọi Cấp Cứu 115 Ngay
        </a>
      </div>

      {/* CPR METRONOME WIDGET */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-red-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-150 ${
              beat ? "bg-red-500 scale-110 shadow-lg shadow-red-500/60" : "bg-red-950 text-red-400"
            }`}
          >
            <HeartPulse size={30} className={beat ? "text-white" : "text-red-400"} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Nhịp Đếm Ép Tim Chuẩn (110 nhịp/phút)</h3>
              <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded-full border border-red-800">
                Tiêu chuẩn AHA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ép tim sâu từ 5 - 6 cm vào giữa xương ức theo nhịp đèn nhấp nháy bên cạnh.
            </p>
          </div>
        </div>

        <button
          onClick={toggleCpr}
          className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            cprRunning
              ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              : "bg-red-600 hover:bg-red-500 text-white shadow-lg"
          }`}
        >
          {cprRunning ? <Square size={16} /> : <Play size={16} />}
          {cprRunning ? "Dừng máy đếm nhịp" : "Bắt đầu đếm nhịp ép tim"}
        </button>
      </div>

      {/* TOPIC TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {topics.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition ${
                isActive
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/50"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <Icon size={16} />
              <span>{t.title}</span>
            </button>
          );
        })}
      </div>

      {/* DETAIL CONTENT ACCORDING TO ACTIVE TAB */}
      {activeTab === "cpr" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HeartPulse className="text-red-500" />
              Quy Trình Hồi Sinh Tim Phổi (CPR)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Áp dụng cho nạn nhân bất tỉnh, không phản ứng và ngưng thở hoặc thở ngáp cá.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-bold text-yellow-400 block mb-1">Bước 1: Đánh giá an toàn & Tri hô</span>
                <p className="text-xs text-slate-300">Đảm bảo hiện trường xung quanh an toàn. Vỗ vai nạn nhân gọi to, chỉ đích danh người bên cạnh gọi cấp cứu 115.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-bold text-yellow-400 block mb-1">Bước 2: Vị trí đặt tay chuẩn</span>
                <p className="text-xs text-slate-300">Đặt gót của một bàn tay vào chính giữa lồng ngực (nửa dưới xương ức). Đặt bàn tay kia đan các ngón tay lên trên.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-bold text-yellow-400 block mb-1">Bước 3: Ép tim liên tục (30 lần)</span>
                <p className="text-xs text-slate-300">Giữ thẳng hai cánh tay, dùng trọng lượng nửa thân trên ép xuống sâu 5-6 cm với tốc độ 100-120 lần/phút. Cho lồng ngực phồng lên hoàn toàn sau mỗi lần ép.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-bold text-yellow-400 block mb-1">Bước 4: Thổi ngạt 2 lần (Tỷ lệ 30:2)</span>
                <p className="text-xs text-slate-300">Nâng cằm, ngửa đầu, bịt mũi nạn nhân và thổi hơi 1 giây cho lồng ngực nhô lên. Nếu không thể thổi ngạt, hãy ÉP TIM LIÊN TỤC KHÔNG DỪNG.</p>
              </div>
            </div>
          </div>

          {/* Dos and Don'ts */}
          <div className="space-y-6">
            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-3xl p-6">
              <h4 className="text-emerald-400 font-bold text-base mb-3 flex items-center gap-2">
                <CheckCircle size={18} />
                NÊN LÀM
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">✓ Đặt nạn nhân nằm ngửa trên bề mặt phẳng, cứng (sàn nhà, đất phẳng).</li>
                <li className="flex items-start gap-2">✓ Thay phiên người ép tim sau mỗi 2 phút để tránh kiệt sức làm giảm hiệu quả.</li>
                <li className="flex items-start gap-2">✓ Bật loa ngoài điện thoại khi gọi 115 để nhận hướng dẫn từ nhân viên y tế.</li>
              </ul>
            </div>

            <div className="bg-red-950/30 border border-red-800/40 rounded-3xl p-6">
              <h4 className="text-red-400 font-bold text-base mb-3 flex items-center gap-2">
                <XCircle size={18} />
                TUYỆT ĐỐI TRÁNH
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">✗ KHÔNG đặt nạn nhân nằm trên đệm lò xo êm vì sẽ triệt tiêu lực ép tim.</li>
                <li className="flex items-start gap-2">✗ KHÔNG cho nạn nhân uống nước, ngậm thuốc hay nặn chanh vào miệng.</li>
                <li className="flex items-start gap-2">✗ KHÔNG ngừng ép tim ngắt quãng quá 10 giây trừ khi nạn nhân tự thở lại được.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "bleeding" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Droplets className="text-red-500" />
            Kỹ Thuật Cầm Máu Vết Thương Hở
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-yellow-400">1. Chèn ép trực tiếp</span>
              <p className="text-slate-300 leading-relaxed">
                Dùng gạc sạch hoặc mảnh vải sạch ép chặt trực tiếp lên vết thương đang chảy máu ít nhất 5-10 phút không buông tay ra kiểm tra.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-yellow-400">2. Nâng cao vùng tổn thương</span>
              <p className="text-slate-300 leading-relaxed">
                Nếu nạn nhân bị thương ở tay hoặc chân và không gãy xương, hãy nâng chi bị thương cao hơn mức của tim để giảm lưu lượng máu chảy đến.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-yellow-400">3. Băng cố định gạc</span>
              <p className="text-slate-300 leading-relaxed">
                Quấn băng thun quanh gạc để duy trì lực ép liên tục. Nếu máu thấm qua lớp gạc đầu tiên, đắp thêm lớp gạc mới lên trên, KHÔNG tháo lớp cũ.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "burns" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="text-yellow-400" />
            Xử Trí Bỏng Nhiệt - Quy Tắc 20 Phút Vàng
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ngay khi bị bỏng (nước sôi, lửa, dầu mỡ), hãy xả nước mát sạch (nhiệt độ 15-20°C) nhẹ nhàng lên vết bỏng liên tục trong 15 đến 20 phút.
          </p>
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-xs text-red-300">
            <strong>Cảnh báo nghiêm cấm:</strong> Tuyệt đối KHÔNG chườm đá lạnh trực tiếp (gây hoại tử lạnh sâu), KHÔNG bôi kem đánh răng, nước mắm, mỡ trăn hay chọc vỡ các bọng nước!
          </div>
        </div>
      )}

      {activeTab === "choking" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="text-cyan-400" />
            Nghiệm Pháp Heimlich Tống Dị Vật Đường Thở
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <p>1. Đứng sau lưng nạn nhân, vòng hai tay ôm quanh eo của họ.</p>
            <p>2. Nắm một bàn tay thành nắm đấm, đặt ngón cái ngay phía trên rốn và dưới mũi ức của nạn nhân.</p>
            <p>3. Bàn tay còn lại ôm chặt lấy nắm đấm, giật mạnh theo hướng <strong>VÀO TRONG VÀ LÊN TRÊN</strong> dứt khoát 5 lần.</p>
            <p>4. Lặp lại chu kỳ 5 lần vỗ lưng giữa 2 bả vai và 5 lần đẩy bụng cho đến khi dị vật bật ra.</p>
          </div>
        </div>
      )}

      {activeTab === "fracture" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Bone className="text-slate-300" />
            Cố Định Tạm Thời Khi Nghi Ngờ Gãy Xương
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nguyên tắc hàng đầu là <strong>BẤT ĐỘNG KHU VỰC TỔN THƯƠNG</strong>. Dùng nẹp gỗ hoặc bìa cứng cố định cả 2 khớp lân cận (khớp trên và khớp dưới ổ gãy). Tuyệt đối không tự ý nắn kéo hoặc đẩy đoạn xương trồi vào trong.
          </p>
        </div>
      )}
    </div>
  );
}
