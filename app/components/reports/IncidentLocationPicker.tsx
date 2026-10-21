"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  LocateFixed,
  MapPin,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Compass,
} from "lucide-react";
import { reverseGeocodeNominatim, formatAddress } from "@/app/lib/nominatim";

// Dynamic import MiniMapPicker with ssr: false
const MiniMapPicker = dynamic(() => import("./MiniMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[220px] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400">
      <RefreshCw size={16} className="animate-spin mr-2 text-cyan-400" />
      Đang tải bản đồ OpenStreetMap chuẩn...
    </div>
  ),
});

interface IncidentLocationPickerProps {
  locationText: string;
  coordinates: { lat: number; lng: number } | null;
  locationMethod: "gps" | "nominatim" | "map_click" | "manual";
  onChange: (data: {
    location: string;
    coordinates: { lat: number; lng: number } | null;
    method: "gps" | "nominatim" | "map_click" | "manual";
  }) => void;
}

export default function IncidentLocationPicker({
  locationText,
  coordinates,
  onChange,
}: IncidentLocationPickerProps) {
  // Trạng thái GPS
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);

  // Lấy vị trí sự cố qua GPS thiết bị
  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      setGpsError("Trình duyệt không hỗ trợ định vị GPS.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setGpsAccuracy(accuracy);

        const lat = parseFloat(latitude.toFixed(6));
        const lng = parseFloat(longitude.toFixed(6));

        // Tự động phân giải địa chỉ đường phố từ tọa độ GPS
        const geoResult = await reverseGeocodeNominatim(lat, lng);
        const resolvedAddress = geoResult
          ? formatAddress(geoResult)
          : `Tọa độ GPS: ${lat}, ${lng}`;

        onChange({
          location: resolvedAddress,
          coordinates: { lat, lng },
          method: "gps",
        });

        setGpsLoading(false);
      },
      (err) => {
        let msg = "Không thể lấy tọa độ GPS.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Quyền truy cập vị trí GPS bị từ chối. Vui lòng cho phép quyền vị trí trên trình duyệt.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Không bắt được tín hiệu vệ tinh GPS.";
        } else if (err.code === err.TIMEOUT) {
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

  // Xử lý click trên Mini Map OSM để tinh chỉnh điểm ghim
  const handleMapLocationSelect = async (lat: number, lng: number) => {
    const geoResult = await reverseGeocodeNominatim(lat, lng);
    const resolvedAddress = geoResult
      ? formatAddress(geoResult)
      : `Tọa độ bản đồ: ${lat}, ${lng}`;

    onChange({
      location: resolvedAddress,
      coordinates: { lat, lng },
      method: "map_click",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          Vị trí sự cố (GPS & OpenStreetMap) <span className="text-red-500">*</span>
        </label>
        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
          <Compass size={12} /> OSM Chuẩn
        </span>
      </div>

      {/* Khu vực bấm lấy GPS */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
            <LocateFixed size={15} /> Định vị GPS trực tiếp
          </span>
          {coordinates && (
            <button
              type="button"
              onClick={handleGetGPS}
              disabled={gpsLoading}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950 hover:bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-800 transition disabled:opacity-50"
            >
              <RefreshCw size={11} className={gpsLoading ? "animate-spin" : ""} />
              {gpsLoading ? "Đang lấy..." : "Lấy lại GPS"}
            </button>
          )}
        </div>

        {gpsError ? (
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-400" />
            <span>{gpsError}</span>
          </div>
        ) : coordinates ? (
          <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-900/60 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px]">
                Tọa độ GPS: <strong className="text-cyan-300">{coordinates.lat}, {coordinates.lng}</strong>
              </span>
              {gpsAccuracy && (
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Sai số ±{Math.round(gpsAccuracy)}m
                </span>
              )}
            </div>
            <p className="text-white font-medium text-xs leading-snug">
              📍 {locationText}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGetGPS}
            disabled={gpsLoading}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-950/50"
          >
            <LocateFixed size={15} className={gpsLoading ? "animate-spin" : ""} />
            {gpsLoading ? "Đang dò tín hiệu GPS vệ tinh..." : "Bấm vào đây để lấy vị trí GPS hiện tại"}
          </button>
        )}
      </div>

      {/* Trường nhập / hiển thị địa chỉ chi tiết */}
      <div className="relative">
        <MapPin size={16} className="absolute left-3 top-3 text-red-500" />
        <input
          type="text"
          required
          placeholder="Địa chỉ sự cố (số nhà, tên đường, khu vực...)"
          value={locationText}
          onChange={(e) =>
            onChange({
              location: e.target.value,
              coordinates,
              method: "manual",
            })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-red-500 outline-none"
        />
      </div>

      {/* Mini Leaflet Map Preview (OpenStreetMap Chuẩn) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" />
            Bản đồ ghim vị trí sự cố (OSM chuẩn):
          </span>
          {coordinates ? (
            <span className="font-mono text-cyan-300 text-[10px]">
              {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
            </span>
          ) : (
            <span className="text-amber-400 text-[10px]">Chưa xác định tọa độ</span>
          )}
        </div>

        <MiniMapPicker
          center={coordinates || { lat: 10.7769, lng: 106.7009 }}
          markerPosition={coordinates}
          onLocationSelect={handleMapLocationSelect}
        />
      </div>
    </div>
  );
}
