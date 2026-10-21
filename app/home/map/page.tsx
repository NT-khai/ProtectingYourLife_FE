"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Map,
  Flame,
  AlertTriangle,
  Building2,
  Navigation,
  Compass,
  Phone,
  ShieldCheck,
  LocateFixed,
} from "lucide-react";
import { calculateDistance } from "@/app/lib/nominatim";

// Dynamic import Leaflet component with ssr: false
const HazardLeafletMap = dynamic(
  () => import("@/app/components/map/HazardLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Đang tải bản đồ OpenStreetMap & Tín hiệu GPS...</p>
      </div>
    ),
  }
);

interface UserGPSLocation {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

export default function HazardMapPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeMarker, setActiveMarker] = useState<number | null>(1);
  const [userLocation, setUserLocation] = useState<UserGPSLocation | null>(null);

  const baseHazardPoints = useMemo(
    () => [
      {
        id: 1,
        title: "Cảnh báo cháy cỏ ven sông",
        type: "fire",
        typeName: "Hỏa hoạn",
        location: "Bờ kênh Thanh Đa, Bình Thạnh",
        severity: "Cao",
        distance: "1.8 km",
        time: "Cập nhật 20 phút trước",
        advice: "Không tiếp cận khu vực có khói dày đặc. Người dân xung quanh đóng kín cửa sổ.",
        icon: Flame,
        color: "bg-red-500",
        textColor: "text-red-400",
        borderColor: "border-red-500",
        lat: "10.8123",
        lng: "106.7214",
      },
      {
        id: 2,
        title: "Ngập úng do triều cường dâng",
        type: "flood",
        typeName: "Ngập lụt",
        location: "Đoạn đường Huỳnh Tấn Phát, Quận 7",
        severity: "Trung bình",
        distance: "3.2 km",
        time: "Cập nhật 45 phút trước",
        advice: "Nước ngập từ 30 - 45cm, các phương tiện xe máy nên chọn lộ trình tránh đường này.",
        icon: AlertTriangle,
        color: "bg-amber-500",
        textColor: "text-yellow-400",
        borderColor: "border-yellow-500",
        lat: "10.7412",
        lng: "106.7320",
      },
      {
        id: 3,
        title: "Công trình thi công cầu vượt",
        type: "construction",
        typeName: "Cảnh báo giao thông",
        location: "Nút giao An Phú, TP. Thủ Đức",
        severity: "Chú ý",
        distance: "4.5 km",
        time: "Hôm nay",
        advice: "Mặt đường hẹp, rào chắn công trình hạn chế tầm nhìn về đêm.",
        icon: Building2,
        color: "bg-blue-500",
        textColor: "text-blue-400",
        borderColor: "border-blue-500",
        lat: "10.7980",
        lng: "106.7580",
      },
      {
        id: 4,
        title: "Điểm sơ tán khẩn cấp: SVĐ Hoa Lư",
        type: "shelter",
        typeName: "Điểm An Toàn",
        location: "Số 2 Đinh Tiên Hoàng, Quận 1",
        severity: "An toàn",
        distance: "850 m",
        time: "Mở 24/7",
        advice: "Điểm tập kết cứu hộ chính của khu vực với kho dự trữ y tế và nhu yếu phẩm.",
        icon: ShieldCheck,
        color: "bg-emerald-500",
        textColor: "text-emerald-400",
        borderColor: "border-emerald-500",
        lat: "10.7876",
        lng: "106.6989",
      },
    ],
    []
  );

  // Tính khoảng cách thực tế từ GPS của người dùng đến từng điểm
  const hazardPoints = useMemo(() => {
    return baseHazardPoints.map((p) => {
      let calculatedDistance = p.distance;
      if (userLocation) {
        const dist = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          parseFloat(p.lat),
          parseFloat(p.lng)
        );
        calculatedDistance = dist.text;
      }
      return {
        ...p,
        calculatedDistance,
      };
    });
  }, [baseHazardPoints, userLocation]);

  const filteredPoints = hazardPoints.filter((p) => {
    if (selectedFilter === "all") return true;
    return p.type === selectedFilter;
  });

  const selectedPoint = hazardPoints.find((p) => p.id === activeMarker) || hazardPoints[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Map size={16} />
            Bản Đồ An Toàn Trực Tuyến (Leaflet & OpenStreetMap)
          </div>
          <h1 className="text-3xl font-extrabold text-white">Bản Đồ Khu Vực Nguy Hiểm & Sơ Tán</h1>
          <p className="text-slate-300 text-sm mt-1">
            Tích hợp GPS trực tiếp của bạn cùng dữ liệu không gian OpenStreetMap giúp theo dõi các điểm hỏa hoạn, ngập lụt và trạm cứu hộ an toàn.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "Tất cả điểm" },
            { id: "fire", label: "Hỏa hoạn" },
            { id: "flood", label: "Ngập úng" },
            { id: "construction", label: "Giao thông" },
            { id: "shelter", label: "Điểm an toàn" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedFilter === f.id
                  ? "bg-red-600 text-white border-red-500 shadow-md"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAP VIEWER CONTAINER */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Interactive Leaflet + OpenStreetMap Canvas (2 cols) */}
        <div className="lg:col-span-2">
          <HazardLeafletMap
            points={filteredPoints}
            activeMarkerId={activeMarker}
            onSelectMarker={(id) => setActiveMarker(id)}
            userLocation={userLocation}
            onUserLocationChange={(loc) => setUserLocation(loc)}
          />

          {/* Quick info bar below map */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <LocateFixed size={14} className="text-cyan-400" />
              <span>
                {userLocation ? (
                  <>
                    Vị trí thực tế GPS của bạn:{" "}
                    <strong className="text-white font-mono">
                      {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </strong>{" "}
                    (Sai số ~{Math.round(userLocation.accuracy)}m)
                  </>
                ) : (
                  "Đang kết nối GPS thiết bị của bạn..."
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-400 font-semibold">• 3 Điểm nguy cơ</span>
              <span className="text-emerald-400 font-semibold">• 1 Trạm an toàn</span>
            </div>
          </div>
        </div>

        {/* Selected Marker Detail Card (1 col) */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
              Chi Tiết Điểm Đang Chọn
            </span>

            <div className="mt-3 flex items-start gap-3">
              <div className={`p-3 rounded-2xl ${selectedPoint.color} text-white shrink-0 shadow-lg`}>
                <selectedPoint.icon size={24} />
              </div>
              <div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${selectedPoint.textColor} ${selectedPoint.borderColor} bg-slate-950`}
                >
                  {selectedPoint.typeName}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                  {selectedPoint.title}
                </h3>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Vị trí:</span>
                <span className="font-semibold text-white text-right">{selectedPoint.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Khoảng cách từ GPS của bạn:</span>
                <span className="font-bold text-yellow-400 text-sm">
                  {selectedPoint.calculatedDistance || selectedPoint.distance}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cập nhật:</span>
                <span>{selectedPoint.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tọa độ OpenStreetMap:</span>
                <span className="font-mono text-[11px] text-cyan-300">
                  {selectedPoint.lat}, {selectedPoint.lng}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <p className="text-yellow-400 font-semibold mb-1">Khuyến nghị an toàn:</p>
              <p className="text-slate-300 leading-relaxed">{selectedPoint.advice}</p>
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-red-950/40"
              >
                <Navigation size={14} />
                Chỉ Đường Thoát Hiểm
              </a>
              <a
                href={`https://www.openstreetmap.org/?mlat=${selectedPoint.lat}&mlon=${selectedPoint.lng}#map=16/${selectedPoint.lat}/${selectedPoint.lng}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition"
                title="Mở trên OpenStreetMap"
              >
                OSM
              </a>
            </div>
          </div>

          {/* Quick Safe Shelters List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Building2 size={16} className="text-emerald-400" />
              Cơ Sở Cứu Hộ Gần Nhất
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/50 flex items-center justify-between border border-slate-800">
                <div>
                  <p className="font-semibold text-white">Bệnh Viện Chợ Rẫy (Cấp Cứu)</p>
                  <p className="text-[10px] text-slate-400">Cách 2.1km • 201B Nguyễn Chí Thanh</p>
                </div>
                <a
                  href="tel:02838554137"
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition"
                >
                  <Phone size={12} />
                </a>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/50 flex items-center justify-between border border-slate-800">
                <div>
                  <p className="font-semibold text-white">Đội Cảnh Sát PCCC Quận 1</p>
                  <p className="text-[10px] text-slate-400">Cách 1.1km • Trực 24/7</p>
                </div>
                <a
                  href="tel:114"
                  className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
                >
                  <Phone size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
