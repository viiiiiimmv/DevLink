'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, Upload, X, User } from 'lucide-react'

interface PhotoUploadProps {
  currentPhoto?: string
  onPhotoChange: (photo: { url: string; publicId: string } | null) => void
  className?: string
}

export default function PhotoUpload({ currentPhoto, onPhotoChange, className = '' }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB.')
      return
    }

    uploadPhoto(file)
  }

  const uploadPhoto = async (file: File) => {
    setUploading(true)
    setUploadProgress(20)

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? prev : prev + 15))
      }, 150)

      const formData = new FormData()
      formData.append('photo', file)

      const response = await fetch('/api/upload/photo', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressTimer)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Failed to upload photo')
      }

      const result = await response.json()
      setPreview(result.url)
      onPhotoChange({ url: result.url, publicId: result.public_id })
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload photo. Please try again.')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 300)
    }
  }

  const removePhoto = async () => {
    setPreview(null)
    onPhotoChange(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Photo Preview */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#334155] bg-[#1E293B] shadow-inner">
            {preview ? (
              <Image
                src={preview}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                <User size={48} />
              </div>
            )}

            {/* Loading Overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-[#090D16]/80 backdrop-blur-xs flex flex-col items-center justify-center p-3">
                <div className="text-[#F8FAFC] text-xs font-medium mb-1">Uploading...</div>
                <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6366F1] transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Remove Button */}
          {preview && !uploading && (
            <button
              onClick={removePhoto}
              className="absolute -top-1 -right-1 w-6 h-6 bg-[#EF4444] text-white rounded-full flex items-center justify-center hover:bg-[#EF4444]/90 transition-colors shadow-md"
              title="Remove photo"
            >
              <X size={14} />
            </button>
          )}

          {/* Camera Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 w-9 h-9 bg-[#6366F1] text-white rounded-full flex items-center justify-center hover:bg-[#4F46E5] active:bg-[#4338CA] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#0F172A]"
            title="Upload photo"
          >
            <Camera size={16} />
          </button>
        </div>
      </div>

      {/* Cloudinary Media Dropzone per Section 4.B */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-[1.5px] border-dashed rounded-[12px] p-6 text-center transition-all duration-150 cursor-pointer ${
          dragOver
            ? 'border-[#6366F1] bg-[#6366F1]/5'
            : 'border-[#475569] bg-[#0F172A] hover:border-[#6366F1] hover:bg-[#6366F1]/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-7 w-7 text-[#94A3B8] mb-2" />
        <p className="text-sm font-medium text-[#F8FAFC]">
          {dragOver ? 'Drop your photo here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">
          PNG, JPG, GIF up to 5MB
        </p>

        {/* Upload Status Bar */}
        {uploading && (
          <div className="mt-4 w-full">
            <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
              <span>Uploading to Cloudinary...</span>
              <span className="font-mono text-[#06B6D4]">{uploadProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  )
}
