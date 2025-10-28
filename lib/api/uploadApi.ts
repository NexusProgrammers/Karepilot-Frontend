import { tokenManager } from '../utils/tokenManager';

const API_BASE_URL = 'https://karepilot-backend.vercel.app/api/v1';

export interface UploadFileResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    publicId: string;
    fileType: string;
    fileName: string;
    category: 'image' | 'document' | 'unknown';
  };
}

export const uploadFile = async (file: File, folder?: string): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  if (folder) {
    formData.append('folder', folder);
  }

  const token = tokenManager.getToken();
  
  const response = await fetch(`${API_BASE_URL}/upload/file`, {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload file');
  }

  return response.json();
};

export const deleteUploadedFile = async (publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<void> => {
  const token = tokenManager.getToken();
  
  const response = await fetch(`${API_BASE_URL}/upload/delete/${publicId}?resourceType=${resourceType}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete file');
  }
};

