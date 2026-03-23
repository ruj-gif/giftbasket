import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

export default function FileUpload({ currentUrl, onUploadSuccess, onUploadError, accept = 'image/*' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // In static template, api.uploadFile creates a local blob URL
      const response = await api.uploadFile(file);
      
      if (response.success && response.data?.url) {
        setSuccess(true);
        if (onUploadSuccess) onUploadSuccess(response.data.url);
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to upload file');
      if (onUploadError) onUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <label className="relative flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-primary" />
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Choose File</span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>

        {currentUrl && !uploading && !error && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium">File Ready</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-md">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {success && !error && (
        <div className="text-[10px] text-gray-500 italic">
          Note: Since this is a static site, your upload is only temporarily stored in your browser's memory.
        </div>
      )}
    </div>
  );
}
