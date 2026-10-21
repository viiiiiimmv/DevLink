'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, User, X } from 'lucide-react'

interface TestimonialAvatarUploadProps {
  currentAvatar?: string
  onAvatarChange: (avatar: { url: string; publicId: string } | null) => void
  className?: string
}

export default function TestimonialAvatarUpload({
  currentAvatar,
  onAvatarChange,
  className = '',
}: TestimonialAvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(currentAvatar || null)
  }, [currentAvatar])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.')
      return
    }

    uploadAvatar(file)
  }

  const uploadAvatar = async (file: File) => {
    setUploading(true)
    setUploadProgress(20)

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? prev : prev + 15))
      }, 150)

      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/upload/testimonial-avatar', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressTimer)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Failed to upload avatar')
      }

      const result = await response.json()
      setPreview(result.url)
      onAvatarChange({ url: result.url, publicId: result.public_id })
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload avatar. Please try again.')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 300)
    }
  }

  const removeAvatar = () => {
    setPreview(null)
    onAvatarChange(null)

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
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#334155] bg-[#1E293B] shadow-inner shrink-0">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#94A3B8]">
              <User className="h-8 w-8" />
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-[#090D16]/85 backdrop-blur-xs flex items-center justify-center p-1">
              <div className="text-[10px] text-[#F8FAFC] font-medium">{uploadProgress}%</div>
            </div>
          )}

          {preview && !uploading && (
            <button
              type="button"
              onClick={removeAvatar}
              className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-md hover:bg-[#EF4444]/90 transition-colors"
              title="Remove avatar"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div className="text-xs text-[#94A3B8]">
          Upload reviewer or client photo for credential and social proof.
        </div>
      </div>

      {/* Cloudinary Media Dropzone per Section 4.B */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-[1.5px] border-dashed rounded-[12px] p-4 text-center transition-all duration-150 cursor-pointer ${
          dragOver
            ? 'border-[#6366F1] bg-[#6366F1]/5'
            : 'border-slate-300 dark:border-[#475569] bg-slate-50/70 dark:bg-[#0F172A] hover:border-[#6366F1] hover:bg-[#6366F1]/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-5 w-5 text-slate-400 dark:text-[#94A3B8] mb-1.5" />
        <p className="text-sm font-medium text-slate-800 dark:text-[#F8FAFC]">
          {dragOver ? 'Drop avatar here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
          PNG, JPG, GIF up to 5MB
        </p>

        {/* Upload Status Bar */}
        {uploading && (
          <div className="mt-3 w-full">
            <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

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
