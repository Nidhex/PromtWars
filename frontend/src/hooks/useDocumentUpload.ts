import { useState, useCallback } from 'react';
import { UploadedDocument } from '../types/student';
import { profileService } from '../services/profileService';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'txt'];

export function useDocumentUpload(onSuccess?: (doc: UploadedDocument) => void) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB)`;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return `Unsupported file format. Please upload PDF, DOCX, or TXT documents.`;
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return null;
    }

    setUploading(true);
    setError(null);
    try {
      const res = await profileService.uploadDocument(file);
      if (res.success && res.data) {
        onSuccess?.(res.data);
        return res.data;
      } else {
        setError(res.error || 'Document upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading document');
    } finally {
      setUploading(false);
    }
    return null;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    }
  }, []);

  return {
    uploading,
    error,
    dragActive,
    uploadFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearError: () => setError(null),
  };
}
