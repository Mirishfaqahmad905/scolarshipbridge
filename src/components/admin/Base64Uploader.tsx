import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

interface Base64UploaderProps {
  onImageUploaded?: (mediaRecord: any) => void;
  value?: string;
  onChange?: (base64OrUrl: string) => void;
  label?: string;
  helperText?: string;
}

export const Base64Uploader: React.FC<Base64UploaderProps> = ({
  onImageUploaded,
  value,
  onChange,
  label = 'Featured Image (Base64 Stored)',
  helperText = 'Select or drag an image (JPEG, PNG, WEBP, GIF). It will be encoded as Base64 and stored in media.json.'
}) => {
  const { addToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(value || '');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [altText, setAltText] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      addToast({
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload a JPEG, PNG, WEBP, or GIF image.'
      });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      addToast({
        type: 'error',
        title: 'Image Too Large',
        message: 'Image size exceeds maximum 8MB limit.'
      });
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setPreview(base64Data);

      if (onChange) {
        onChange(base64Data);
      }

      // Auto-upload to backend media library
      try {
        setIsUploading(true);
        const res = await scholarshipApi.media.uploadBase64({
          fileName: file.name,
          imageData: base64Data,
          altText: altText || file.name.split('.')[0],
          caption: caption || '',
          fileSize: file.size
        });

        if (res && res.success) {
          addToast({
            type: 'success',
            title: 'Image Uploaded & Saved',
            message: `${file.name} encoded to Base64 and stored in media.json.`
          });
          if (onImageUploaded) {
            onImageUploaded(res.data);
          }
        }
      } catch (err: any) {
        addToast({
          type: 'error',
          title: 'Upload Failed',
          message: err?.response?.data?.message || 'Could not upload image to backend.'
        });
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    setFileName('');
    setFileSize(0);
    if (onChange) {
      onChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex-shrink-0 flex items-center justify-center">
            <img
              src={preview}
              alt={altText || 'Preview'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-1 text-left w-full">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <Check className="w-3 h-3" /> Base64 Encoded
              </span>
              {fileSize > 0 && (
                <span className="text-xs text-slate-500 font-mono">
                  {(fileSize / 1024).toFixed(1)} KB
                </span>
              )}
            </div>
            {fileName && (
              <p className="text-xs font-medium text-slate-700 truncate max-w-sm">
                {fileName}
              </p>
            )}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                Change Image
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs font-medium text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>

          {isUploading && (
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Uploading to media.json...</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]' 
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Click to upload or drag & drop image
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              PNG, JPG, WEBP, or GIF (Converts automatically to Base64)
            </p>
          </div>
        </div>
      )}

      {helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};
