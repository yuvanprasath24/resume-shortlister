"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
  error?: string
}

interface ResumeUploaderProps {
  onComplete?: (files: UploadedFile[]) => void
}

export function ResumeUploader({ onComplete }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = useCallback(async (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: "uploading" as const,
        progress: 0,
      }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing for each file
    for (const file of newFiles) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, progress, status: "uploading" } : f
          )
        )
      }

      // Simulate processing
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "processing" } : f
        )
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mark complete
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "complete" } : f
        )
      )
    }

    if (onComplete) {
      onComplete(newFiles)
    }
  }, [onComplete])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files)
      }
    },
    [processFiles]
  )

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Upload Resumes</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag and drop PDF or DOCX files, or click to browse
          </p>
          <Button variant="outline" className="mt-4 bg-transparent">
            Select Files
          </Button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              {files.length} file{files.length !== 1 && "s"}
            </h4>
            <span className="text-xs text-muted-foreground">
              {files.filter((f) => f.status === "complete").length} processed
            </span>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <File className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </span>
                    {file.status === "uploading" && (
                      <Progress value={file.progress} className="h-1 w-20" />
                    )}
                    {file.status === "processing" && (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                      </span>
                    )}
                    {file.status === "complete" && (
                      <span className="flex items-center gap-1 text-xs text-accent">
                        <CheckCircle className="h-3 w-3" />
                        Complete
                      </span>
                    )}
                    {file.status === "error" && (
                      <span className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {file.error || "Error"}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
