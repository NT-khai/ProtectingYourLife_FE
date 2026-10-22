const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FetchOptions extends RequestInit {
  data?: any;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    credentials: "include", // send cookies
    headers: {
      ...(data ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMsg = `Lỗi máy chủ (${response.status})`;
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || errJson.error || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
}

// ----------------- AUTH APIS -----------------
export const authApi = {
  login: (data: { email: string; matkhau: string }) =>
    apiRequest("/auth/login", { method: "POST", data }),

  register: (data: { hovaten: string; email: string; matkhau: string }) =>
    apiRequest("/auth/register", { method: "POST", data }),

  logout: () => apiRequest("/auth/logout", { method: "POST" }),

  getMe: () => apiRequest("/auth/me", { method: "GET" }),
};

// ----------------- INCIDENT APIS -----------------
export interface IncidentData {
  id?: number;
  userId?: number;
  loaiSuCo: string;
  mucDo: string; // 'Cap bach' | 'Trung binh' | 'Thap'
  tieuDe: string;
  latitude: number;
  longitude: number;
  diaChi: string;
  moTaChiTiet?: string;
  imageUrl?: string;
  trangThai?: string; // 'Cho xu ly' | 'Dang xu ly' | 'Da xu ly'
  ngayTao?: string;
}

export const incidentApi = {
  getAll: (): Promise<IncidentData[]> =>
    apiRequest("/api/incidents", { method: "GET" }),

  getStats: () => apiRequest("/api/incidents/stats", { method: "GET" }),

  getMyReports: (): Promise<IncidentData[]> =>
    apiRequest("/api/incidents/my-reports", { method: "GET" }),

  getById: (id: number): Promise<IncidentData> =>
    apiRequest(`/api/incidents/${id}`, { method: "GET" }),

  create: (data: IncidentData): Promise<IncidentData> =>
    apiRequest("/api/incidents", { method: "POST", data }),

  updateStatus: (id: number, status: string): Promise<IncidentData> =>
    apiRequest(`/api/incidents/${id}/status`, {
      method: "PATCH",
      data: { status },
    }),

  approve: (id: number): Promise<IncidentData> =>
    apiRequest(`/api/incidents/${id}/approve`, { method: "PATCH" }),

  delete: (id: number) =>
    apiRequest(`/api/incidents/${id}`, { method: "DELETE" }),
};

// ----------------- FEEDBACK APIS -----------------
export interface FeedbackData {
  id?: number;
  hovaten: string;
  email: string;
  content: string;
  createdAt?: string;
}

export const feedbackApi = {
  create: (data: { hovaten: string; email: string; content: string }) =>
    apiRequest("/api/feedback", { method: "POST", data }),

  getAll: (): Promise<FeedbackData[]> =>
    apiRequest("/api/feedback", { method: "GET" }),

  delete: (id: number) =>
    apiRequest(`/api/feedback/${id}`, { method: "DELETE" }),
};

// ----------------- USER & PROFILE APIS -----------------
export interface UserData {
  id: number;
  hovaten: string;
  email: string;
  role: string;
  avatar?: string;
  ngaytao?: string;
}

export interface UserProfileData {
  id?: number;
  userId: number;
  hovaten: string;
  soDienThoai?: string;
  diaChi?: string;
  avatar?: string;
}

export const userApi = {
  getAll: (): Promise<UserData[]> =>
    apiRequest("/api/users", { method: "GET" }),

  updateRole: (id: number, role: string) =>
    apiRequest(`/api/users/${id}/role`, {
      method: "PATCH",
      data: { role },
    }),

  delete: (id: number) => apiRequest(`/api/users/${id}`, { method: "DELETE" }),

  getMyProfile: (): Promise<UserProfileData> =>
    apiRequest("/api/users/profile/me", { method: "GET" }),

  updateMyProfile: (data: Partial<UserProfileData>): Promise<UserProfileData> =>
    apiRequest("/api/users/profile/me", { method: "PUT", data }),
};

// ----------------- FILE UPLOAD API -----------------
export async function uploadImage(
  file: File
): Promise<{ success: boolean; url: string; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = "Tải ảnh thất bại";
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
