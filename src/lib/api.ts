const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://nexora-be-two.vercel.app/api').replace(/\/$/, '');
const TOKEN_KEY = 'nexora_admin_token';
const REQUEST_TIMEOUT_MS = 45000;

const getToken = () => localStorage.getItem(TOKEN_KEY);

const buildHeaders = (includeJson = true) => {
  const headers: Record<string, string> = {};

  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        ...buildHeaders(!(options.body instanceof FormData)),
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error((typeof data === 'object' && data && 'message' in data ? String(data.message) : 'Request failed'));
    }

    return data as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out. Please check the backend connection and try again.');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Request failed unexpectedly.');
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export type Batch = {
  id: string;
  name: string;
  enrollmentDate?: string;
  createdAt: string;
  students?: Student[];
};

export type Student = {
  id: string;
  studentId?: string;
  name: string;
  email: string;
  phone?: string;
  course?: string;
  courses?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Certificate = {
  id: string;
  batchId: string;
  studentId?: string | null;
  studentCode?: string;
  studentName: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
};

export const loginAdminApi = async (email: string, password: string) => {
  const data = await request<{ token: string; admin: { email: string }; message: string }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
};

export const fetchBatches = async () => {
  const data = await request<{ batches: Batch[] }>('/batches');
  return data.batches;
};

export const createBatch = async (name: string, enrollmentDate?: string) => {
  const data = await request<{ batch: Batch; message: string }>('/batches', {
    method: 'POST',
    body: JSON.stringify({ name, enrollmentDate }),
  });
  return data.batch;
};

export const updateBatch = async (batchId: string, name: string, enrollmentDate?: string) => {
  const data = await request<{ batch: Batch; message: string }>(`/batches/${batchId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, enrollmentDate }),
  });
  return data.batch;
};

export const fetchBatchStudents = async (batchId: string) => {
  const data = await request<{ students: Student[] }>(`/students/${batchId}`);
  return data.students;
};

export const addStudentToBatch = async (batchId: string, payload: Partial<Student>) => {
  const data = await request<{ student: Student; message: string }>(`/students/${batchId}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.student;
};

export const updateStudentInBatch = async (batchId: string, studentId: string, payload: Partial<Student>) => {
  const data = await request<{ student: Student; message: string }>(`/students/${batchId}/${studentId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return data.student;
};

export const deleteStudentFromBatch = async (batchId: string, studentId: string) => {
  return request<{ message: string }>(`/students/${batchId}/${studentId}`, {
    method: 'DELETE',
  });
};

export const deleteBatchById = async (batchId: string) => {
  return request<{ message: string }>(`/batches/${batchId}`, {
    method: 'DELETE',
  });
};

export const fetchBatchCertificates = async (batchId: string) => {
  const data = await request<{ certificates: Certificate[] }>(`/certificates/${batchId}`);
  return data.certificates;
};

export const lookupCertificateByStudentCode = async (studentCode: string) => {
  return request<{
    studentCode: string;
    studentName: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
  }>(`/certificates/lookup/${encodeURIComponent(studentCode)}`);
};

export const uploadCertificateToBatch = async (batchId: string, payload: {
  studentId?: string | null;
  studentName: string;
  studentCode: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append('file', payload.file);
  if (payload.studentId) formData.append('studentId', payload.studentId);
  formData.append('studentName', payload.studentName);
  formData.append('studentCode', payload.studentCode);

  const response = await fetch(`${API_BASE_URL}/certificates/${batchId}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken() || ''}`,
    },
    body: formData,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error((typeof data === 'object' && data && 'message' in data ? String(data.message) : 'Upload failed'));
  }

  return (typeof data === 'object' && data && 'certificate' in data ? (data as { certificate: Certificate }).certificate : null) as Certificate;
};

export const deleteCertificateFromBatch = async (batchId: string, certificateId: string) => {
  return request<{ message: string }>(`/certificates/${batchId}/${certificateId}`, {
    method: 'DELETE',
  });
};

export const getAdminToken = () => getToken();
