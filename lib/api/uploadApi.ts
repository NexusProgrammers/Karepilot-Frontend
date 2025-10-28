import { fetchWithAuth } from './fetchUtils';

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

  const response = await fetchWithAuth('/upload/file', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload file');
  }

  return response.json();
};

export const deleteUploadedFile = async (publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<void> => {
  const response = await fetchWithAuth(`/upload/delete/${publicId}?resourceType=${resourceType}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete file');
  }
};

