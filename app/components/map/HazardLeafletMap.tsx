"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Locate, RefreshCw, Compass } from "lucide-react";

export interface HazardPoint {
  id: number;
  title: string;
  type: string;
  typeName: string;
  location: string;
  severity: string;
  distance: string;
  time: string;
  advice: string;
  lat: string | number;
  lng: string | number;
  color?: string;
  calculatedDistance?: string;
}

interface UserGPSLocation {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

interface HazardLeafletMapProps {
  points: HazardPoint[];
  activeMarkerId: number | null;
  onSelectMarker: (id: number) => void;
  userLocation: UserGPSLocation | null;
  onUserLocationChange?: (location: UserGPSLocation) => void;
}

export default function HazardLeafletMap({
  points,
  activeMarkerId,
  onSelectMarker,
  userLocation,
  onUserLocationChange,
}: HazardLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userAccuracyCircleRef = useRef<L.Circle | null>(null);

  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [clickedCoord, setClickedCoord] = useState<{ lat: number; lng: number } | null>(null);

  // Khởi tạo bản đồ Leaflet với OpenStreetMap Chuẩn (bỏ chế độ tối)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const defaultLat = userLocation?.lat || 10.7769;
    const defaultLng = userLocation?.lng || 106.7009;

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 13,
      zoomControl: false,
    });

    // Layer bản đồ OpenStreetMap Tiêu chuẩn (Standard OSM)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Layer nhóm các điểm nguy hiểm
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Xử lý sự kiện click trên bản đồ
    map.on("click", (e: L.LeafletMouseEvent) => {
      setClickedCoord({
        lat: parseFloat(e.latlng.lat.toFixed(5)),
        lng: parseFloat(e.latlng.lng.toFixed(5)),
      });
    });

    mapRef.current = map;

    // Đảm bảo kích thước bản đồ hiển thị chuẩn khi mount
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Cập nhật vị trí GPS người dùng trên bản đồ
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (userLocation) {
      const userLatLng: [number, number] = [userLocation.lat, userLocation.lng];

      // Custom icon GPS với hiệu ứng radar ping
      const userIcon = L.divIcon({
        className: "leaflet-user-marker",
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        html: `
          <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background: rgba(14, 165, 233, 0.45); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background: #0284c7; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.8); display: flex; align-items: center; justify-content: center;">
              <div style="width: 6px; height: 6px; border-radius: 9999px; background: #ffffff;"></div>
            </div>
          </div>
        `,
      });

      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker(userLatLng, {
          icon: userIcon,
          zIndexOffset: 1000,
        }).addTo(map);

        userMarkerRef.current.bindPopup(`
          <div style="font-size: 13px; line-height: 1.4; padding: 4px;">
            <div style="font-weight: 700; color: #0284c7; display: flex; align-items: center; gap: 4px;">
              📍 Vị trí GPS của bạn
            </div>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">
              Tọa độ: ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}
            </div>
            <div style="font-size: 11px; color: #059669; margin-top: 2px;">
              Độ chính xác: ±${Math.round(userLocation.accuracy)}m
            </div>
          </div>
        `);
      } else {
        userMarkerRef.current.setLatLng(userLatLng);
      }

      // Vòng tròn thể hiện độ chính xác GPS
      if (userLocation.accuracy) {
        if (!userAccuracyCircleRef.current) {
          userAccuracyCircleRef.current = L.circle(userLatLng, {
            radius: Math.min(userLocation.accuracy, 500),
            color: "#0284c7",
            fillColor: "#0284c7",
            fillOpacity: 0.15,
            weight: 1.5,
          }).addTo(map);
        } else {
          userAccuracyCircleRef.current.setLatLng(userLatLng);
          userAccuracyCircleRef.current.setRadius(Math.min(userLocation.accuracy, 500));
        }
      }
    }
  }, [userLocation]);

  // Cập nhật các marker nguy hiểm / an toàn trên bản đồ
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;
    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    points.forEach((point) => {
      const lat = typeof point.lat === "string" ? parseFloat(point.lat) : point.lat;
      const lng = typeof point.lng === "string" ? parseFloat(point.lng) : point.lng;
      if (isNaN(lat) || isNaN(lng)) return;

      const isSelected = point.id === activeMarkerId;

      let bgGrad = "linear-gradient(135deg, #ef4444, #dc2626)";
      let iconEmoji = "🔥";
      let borderColor = "#ef4444";

      if (point.type === "flood") {
        bgGrad = "linear-gradient(135deg, #f59e0b, #d97706)";
        iconEmoji = "🌊";
        borderColor = "#f59e0b";
      } else if (point.type === "construction") {
        bgGrad = "linear-gradient(135deg, #3b82f6, #2563eb)";
        iconEmoji = "🚧";
        borderColor = "#3b82f6";
      } else if (point.type === "shelter") {
        bgGrad = "linear-gradient(135deg, #10b981, #059669)";
        iconEmoji = "🛡️";
        borderColor = "#10b981";
      }

      const size = isSelected ? 46 : 38;
      const pinHtml = `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
          cursor: pointer;
        ">
          ${
            isSelected
              ? `<div style="
                  position: absolute;
                  inset: -6px;
                  border-radius: 18px;
                  background: ${borderColor};
                  opacity: 0.4;
                  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                "></div>`
              : ""
          }
          <div style="
            width: ${size}px;
            height: ${size}px;
            border-radius: 14px;
            background: ${bgGrad};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isSelected ? "20px" : "16px"};
            box-shadow: 0 6px 16px rgba(0,0,0,0.35);
            border: 2px solid ${isSelected ? "#ffffff" : "rgba(255,255,255,0.85)"};
          ">
            ${iconEmoji}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-point-marker",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        html: pinHtml,
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : 100,
      });

      marker.bindPopup(`
        <div style="min-width: 220px; padding: 2px; font-family: inherit;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 9999px; background: rgba(255,255,255,0.1); color: ${borderColor};">
              ${point.typeName}
            </span>
            <span style="font-size: 11px; color: #94a3b8;">
              ${point.calculatedDistance ? `Cách ${point.calculatedDistance}` : point.distance}
            </span>
          </div>
          <div style="font-weight: 700; font-size: 14px; color: #ffffff; margin-bottom: 4px; line-height: 1.3;">
            ${point.title}
          </div>
          <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 8px;">
            📍 ${point.location}
          </div>
          <div style="font-size: 11px; background: #020617; border: 1px solid #1e293b; padding: 6px 8px; border-radius: 8px; color: #f1f5f9; line-height: 1.4;">
            ⚠️ ${point.advice}
          </div>
          <div style="margin-top: 8px; display: flex; gap: 6px;">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}"
              target="_blank"
              rel="noreferrer"
              style="
                flex: 1;
                background: #ef4444;
                color: #ffffff;
                text-align: center;
                padding: 6px 10px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 700;
                text-decoration: none;
                display: block;
              "
            >
              Chỉ đường
            </a>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onSelectMarker(point.id);
      });

      markersLayer.addLayer(marker);

      if (isSelected && mapRef.current) {
        marker.openPopup();
      }
    });
  }, [points, activeMarkerId, onSelectMarker]);

  // Hàm kích hoạt lấy GPS người dùng
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGpsError("Trình duyệt của bạn không hỗ trợ định vị GPS.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const newLoc: UserGPSLocation = {
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp,
        };

        if (onUserLocationChange) {
          onUserLocationChange(newLoc);
        }

        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 15, {
            duration: 1.5,
          });
        }

        setGpsLoading(false);
      },
      (error) => {
        console.warn("Lỗi GPS:", error.message);
        let msg = "Không thể lấy vị trí GPS.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Bạn đã từ chối cấp quyền truy cập vị trí GPS.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Tín hiệu GPS không khả dụng.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Hết thời gian chờ nhận tín hiệu GPS.";
        }
        setGpsError(msg);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Tự động yêu cầu GPS khi component tải lần đầu nếu chưa có vị trí
  useEffect(() => {
    if (!userLocation && navigator.geolocation) {
      handleLocateMe();
    }
  }, []);

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-700 bg-slate-100 shadow-2xl">
      {/* Container của Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Overlay: Bảng trạng thái GPS & Nhãn OSM Chuẩn */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* GPS Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3.5 py-2 rounded-2xl shadow-xl text-xs text-slate-200">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                userLocation ? "bg-cyan-400" : "bg-amber-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                userLocation ? "bg-cyan-500" : "bg-amber-500"
              }`}
            />
          </span>
          <span className="font-semibold">
            {userLocation ? (
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">GPS Đang hoạt động</span>
                <span className="text-[11px] text-slate-400">
                  (±{Math.round(userLocation.accuracy)}m)
                </span>
              </span>
            ) : gpsLoading ? (
              <span className="text-amber-400 flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin" /> Đang tìm vị trí GPS...
              </span>
            ) : (
              <span className="text-slate-400">Chưa kích hoạt GPS</span>
            )}
          </span>
        </div>

        {/* Nút công cụ bản đồ */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Nhãn OSM Chuẩn */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-semibold shadow-xl">
            <Compass size={14} className="text-emerald-400" />
            <span>Bản đồ OpenStreetMap Chuẩn</span>
          </div>

          {/* Nút Tìm lại GPS của tôi */}
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={gpsLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white text-xs font-bold shadow-xl shadow-cyan-900/30 transition disabled:opacity-50"
            title="Định vị vị trí GPS hiện tại"
          >
            <Locate size={14} className={gpsLoading ? "animate-spin" : ""} />
            <span>{gpsLoading ? "Đang dò..." : "Vị trí của tôi"}</span>
          </button>
        </div>
      </div>

      {/* Thông báo lỗi GPS nếu có */}
      {gpsError && (
        <div className="absolute top-18 left-4 right-4 z-20 pointer-events-auto max-w-md mx-auto p-2.5 rounded-xl bg-amber-950/90 border border-amber-800 text-amber-300 text-xs flex items-center justify-between gap-2 shadow-xl backdrop-blur">
          <span>⚠️ {gpsError}</span>
          <button
            type="button"
            onClick={() => setGpsError(null)}
            className="text-amber-400 hover:text-white font-bold px-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Bottom Overlay: Tọa độ khi click + Chú giải bản đồ */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Tọa độ click */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 shadow-xl">
          {clickedCoord ? (
            <span>
              📍 Tọa độ chọn: <span className="font-mono text-cyan-300 font-semibold">{clickedCoord.lat}, {clickedCoord.lng}</span>
            </span>
          ) : (
            <span className="text-slate-400">Nhấp vào bản đồ để xem tọa độ hoặc chọn sự cố</span>
          )}
        </div>

        {/* Chú giải nhanh */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-2xl text-[11px] text-slate-300 shadow-xl">
          <span className="font-semibold text-white">Chú giải:</span>
          <span className="flex items-center gap-1">🔥 Cháy</span>
          <span className="flex items-center gap-1">🌊 Ngập</span>
          <span className="flex items-center gap-1">🚧 Giao thông</span>
          <span className="flex items-center gap-1">🛡️ Trạm an toàn</span>
        </div>
      </div>
    </div>
  );
}
