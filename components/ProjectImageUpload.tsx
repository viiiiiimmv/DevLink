'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon, Upload, X } from 'lucide-react'

interface ProjectImageUploadProps {
  currentImage?: string
  onImageChange: (image: { url: string; publicId: string } | null) => void
  className?: string
}

export default function ProjectImageUpload({
  currentImage,
  onImageChange,
  className = ''
}: ProjectImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(currentImage || null)
  }, [currentImage])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.')
      return
    }

    uploadImage(file)
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    setUploadProgress(20)

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? prev : prev + 15))
      }, 150)

      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload/project-image', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressTimer)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const result = await response.json()
      setPreview(result.url)
      onImageChange({ url: result.url, publicId: result.public_id })
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 300)
    }
  }

  const removeImage = () => {
    setPreview(null)
    onImageChange(null)

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
      {/* Image Preview Box */}
      <div className="relative w-full aspect-video overflow-hidden rounded-[4px] border border-border bg-muted shadow-inner">
        {preview ? (
          <Image
            src={preview}
            alt="Project"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-10 w-10 mb-2 opacity-60" />
            <span className="text-xs text-muted-foreground">No project preview image uploaded</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-background/85 backdrop-blur-xs flex flex-col items-center justify-center p-6">
            <div className="text-xs font-medium text-foreground mb-2">Uploading project asset...</div>
            <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {preview && !uploading && (
          <button
            type="button"
            onClick={removeImage}
            className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-md hover:bg-[#EF4444]/90 transition-colors"
            title="Remove image"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Cloudinary Media Dropzone per Section 4.B */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-[1.5px] border-dashed rounded-[4px] p-5 text-center transition-all duration-150 cursor-pointer ${
          dragOver
            ? 'border-foreground bg-foreground/10'
            : 'border-border bg-card hover:border-foreground hover:bg-foreground/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-6 w-6 text-slate-400 dark:text-muted-foreground mb-2" />
        <p className="text-sm font-medium text-foreground dark:text-foreground">
          {dragOver ? 'Drop your image here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">
          PNG, JPG, GIF up to 5MB
        </p>

        {/* Upload Status Bar */}
        {uploading && (
          <div className="mt-3 w-full">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Uploading to Cloudinary...</span>
              <span className="font-mono text-foreground">{uploadProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-200"
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
