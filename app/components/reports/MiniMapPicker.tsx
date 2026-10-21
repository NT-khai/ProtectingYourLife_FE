"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

interface MiniMapPickerProps {
  center: { lat: number; lng: number };
  markerPosition: { lat: number; lng: number } | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function MiniMapPicker({
  center,
  markerPosition,
  onLocationSelect,
}: MiniMapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Khởi tạo Mini Map với OpenStreetMap Tiêu Chuẩn (OSM Chuẩn)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialLat = markerPosition?.lat || center.lat || 10.7769;
    const initialLng = markerPosition?.lng || center.lng || 106.7009;

    const map = L.map(containerRef.current, {
      center: [initialLat, initialLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    });

    // Layer bản đồ OpenStreetMap Chuẩn (Standard OSM)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Xử lý click trên mini map để chọn điểm sự cố
    map.on("click", (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(6));
      const lng = parseFloat(e.latlng.lng.toFixed(6));
      onLocationSelect(lat, lng);
    });

    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Cập nhật marker khi markerPosition thay đổi
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (markerPosition) {
      const pos: [number, number] = [markerPosition.lat, markerPosition.lng];

      const pinIcon = L.divIcon({
        className: "mini-incident-pin",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 9999px;
              background: linear-gradient(135deg, #ef4444, #b91c1c);
              border: 2px solid #ffffff;
              box-shadow: 0 4px 12px rgba(239, 68, 68, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
            ">
              🚨
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid #b91c1c;
              margin-top: -2px;
            "></div>
          </div>
        `,
      });

      if (!markerRef.current) {
        const marker = L.marker(pos, {
          icon: pinIcon,
          draggable: true,
        }).addTo(map);

        marker.on("dragend", () => {
          const newPos = marker.getLatLng();
          onLocationSelect(
            parseFloat(newPos.lat.toFixed(6)),
            parseFloat(newPos.lng.toFixed(6))
          );
        });

        markerRef.current = marker;
      } else {
        markerRef.current.setLatLng(pos);
      }

      // Di chuyển bản đồ đến điểm marker
      map.panTo(pos);
    }
  }, [markerPosition]);

  return (
    <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-100 shadow-inner">
      <div ref={containerRef} className="w-full h-full z-0" />
      <div className="absolute bottom-2 left-2 right-2 z-10 pointer-events-none flex justify-between items-center text-[10px] text-slate-300 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-800">
        <span>💡 Nhấp hoặc kéo thả ghim đỏ để chỉnh vị trí sự cố</span>
        <span className="font-semibold text-emerald-400">OpenStreetMap Chuẩn</span>
      </div>
    </div>
  );
}
