export interface NominatimSearchResult {
  place_id: number;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  type?: string;
  importance?: number;
  address?: {
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    [key: string]: string | undefined;
  };
}

export interface ReverseGeocodeResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Tìm kiếm địa điểm bằng OpenStreetMap Nominatim API
 * https://nominatim.openstreetmap.org/search
 */
export async function searchNominatim(
  query: string,
  limit = 5
): Promise<NominatimSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", limit.toString());
  // Ưu tiên kết quả tại Việt Nam
  url.searchParams.set("countrycodes", "vn");
  url.searchParams.set("accept-language", "vi,en");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Nominatim error: ${res.status}`);
    }

    const data: NominatimSearchResult[] = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm qua Nominatim:", error);
    return [];
  }
}

/**
 * Tìm địa chỉ từ tọa độ (Reverse Geocoding)
 * https://nominatim.openstreetmap.org/reverse
 */
export async function reverseGeocodeNominatim(
  lat: number,
  lon: number
): Promise<ReverseGeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "json");
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lon", lon.toString());
  url.searchParams.set("zoom", "18");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "vi,en");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Nominatim reverse error: ${res.status}`);
    }

    const data: ReverseGeocodeResult = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi giải mã tọa độ Nominatim:", error);
    return null;
  }
}

/**
 * Định dạng địa chỉ gọn gàng, thân thiện với người dùng Việt Nam
 */
export function formatAddress(result: NominatimSearchResult | ReverseGeocodeResult): string {
  if (!result) return "";
  const addr = result.address;
  if (!addr) return result.display_name;

  const parts: string[] = [];

  const houseRoad = [addr.house_number, addr.road].filter(Boolean).join(" ");
  if (houseRoad) parts.push(houseRoad);
  if (addr.neighbourhood && addr.neighbourhood !== addr.road) parts.push(addr.neighbourhood);
  if (addr.suburb) parts.push(addr.suburb);
  if (addr.city) parts.push(addr.city);
  else if (addr.state) parts.push(addr.state);

  return parts.length > 0 ? parts.join(", ") : result.display_name;
}

/**
 * Tính khoảng cách giữa hai tọa độ (Haversine formula) theo km hoặc mét
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { text: string; meters: number } {
  const R = 6371e3; // bán kính Trái Đất theo mét
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = Math.round(R * c);

  if (meters < 1000) {
    return { text: `${meters} m`, meters };
  }
  return { text: `${(meters / 1000).toFixed(1)} km`, meters };
}
