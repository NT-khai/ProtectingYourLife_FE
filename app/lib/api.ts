// =============================================================================
// API client
// =============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ----------------- CORE -----------------

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Dữ liệu JSON gửi đi (tự stringify + set Content-Type) */
  data?: unknown;
  /** Dùng cho FormData / Blob... (không set Content-Type để trình duyệt tự xử lý) */
  body?: BodyInit | null;
}

/** NestJS có thể trả `message` là string hoặc mảng (validation errors) */
function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const { message, error } = payload as Record<string, unknown>;
    const raw = message ?? error;
    if (Array.isArray(raw)) return raw.join(", ");
    if (typeof raw === "string" && raw) return raw;
  }
  return fallback;
}

async function parseJsonSafe(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  { data, body, headers, ...rest }: RequestOptions = {},
): Promise<T> {
  const hasJsonBody = data !== undefined;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    credentials: "include", // gửi cookie
    headers: {
      ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: hasJsonBody ? JSON.stringify(data) : body,
  });

  if (!response.ok) {
    const payload = await parseJsonSafe(response);
    throw new ApiError(
      extractErrorMessage(payload, `Lỗi máy chủ (${response.status})`),
      response.status,
      payload,
    );
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// ----------------- USER TYPES -----------------

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

// ----------------- AUTH APIS -----------------

export interface LoginPayload {
  email: string;
  matkhau: string;
}

export interface RegisterPayload extends LoginPayload {
  hovaten: string;
}

export const authApi = {
  login: (data: LoginPayload) =>
    apiRequest("/auth/login", { method: "POST", data }),

  register: (data: RegisterPayload) =>
    apiRequest("/auth/register", { method: "POST", data }),

  logout: () => apiRequest<void>("/auth/logout", { method: "POST" }),

  getMe: () => apiRequest<UserData>("/auth/me"),
};

// ----------------- INCIDENT APIS -----------------

export type IncidentSeverity = "Cap bach" | "Trung binh" | "Thap";
export type IncidentStatus = "Cho xu ly" | "Dang xu ly" | "Da xu ly";

export interface IncidentData {
  id?: number;
  userId?: number;
  loaiSuCo: string;
  mucDo: IncidentSeverity;
  tieuDe: string;
  latitude: number;
  longitude: number;
  diaChi: string;
  moTaChiTiet?: string;
  imageUrl?: string;
  trangThai?: IncidentStatus;
  ngayTao?: string;
}

export const incidentApi = {
  getAll: () => apiRequest<IncidentData[]>("/api/incidents"),

  getStats: () => apiRequest("/api/incidents/stats"),

  getMyReports: () => apiRequest<IncidentData[]>("/api/incidents/my-reports"),

  getById: (id: number) => apiRequest<IncidentData>(`/api/incidents/${id}`),

  create: (data: IncidentData) =>
    apiRequest<IncidentData>("/api/incidents", { method: "POST", data }),

  updateStatus: (id: number, status: IncidentStatus) =>
    apiRequest<IncidentData>(`/api/incidents/${id}/status`, {
      method: "PATCH",
      data: { status },
    }),

  approve: (id: number) =>
    apiRequest<IncidentData>(`/api/incidents/${id}/approve`, {
      method: "PATCH",
    }),

  delete: (id: number) =>
    apiRequest<void>(`/api/incidents/${id}`, { method: "DELETE" }),
};

// ----------------- FEEDBACK APIS -----------------

export interface FeedbackData {
  id?: number;
  hovaten: string;
  email: string;
  content: string;
  createdAt?: string;
}

export type CreateFeedbackPayload = Pick<
  FeedbackData,
  "hovaten" | "email" | "content"
>;

export const feedbackApi = {
  create: (data: CreateFeedbackPayload) =>
    apiRequest("/api/feedback", { method: "POST", data }),

  getAll: () => apiRequest<FeedbackData[]>("/api/feedback"),

  delete: (id: number) =>
    apiRequest<void>(`/api/feedback/${id}`, { method: "DELETE" }),
};

// ----------------- USER & PROFILE APIS -----------------

export const userApi = {
  getAll: () => apiRequest<UserData[]>("/api/users"),

  updateRole: (id: number, role: string) =>
    apiRequest(`/api/users/${id}/role`, { method: "PATCH", data: { role } }),

  delete: (id: number) =>
    apiRequest<void>(`/api/users/${id}`, { method: "DELETE" }),

  getMyProfile: () => apiRequest<UserProfileData>("/api/users/profile/me"),

  updateMyProfile: (data: Partial<UserProfileData>) =>
    apiRequest<UserProfileData>("/api/users/profile/me", {
      method: "PUT",
      data,
    }),
};

// ----------------- FILE UPLOAD API -----------------

export interface UploadResult {
  success: boolean;
  url: string;
  filename: string;
}

export function uploadImage(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<UploadResult>("/api/upload", {
    method: "POST",
    body: formData,
  });
}
