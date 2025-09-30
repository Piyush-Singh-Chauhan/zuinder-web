"use client";

import { useState } from "react";

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  label = "Image",
  required = false,
  accept = "image/*"
}) {
  const [uploadError, setUploadError] = useState("");
  const [imagePreview, setImagePreview] = useState(currentImage || "");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Only JPEG, PNG, and WebP images are allowed");
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError("File size should not exceed 5MB");
      return;
    }

    setUploadError("");

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setSelectedFile(file);
    
    // Pass the file object to parent component for later upload
    onImageChange(file);

    // Clear the file input so the same file can be selected again if needed
    event.target.value = "";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Create a fake event object to reuse handleFileSelect
      const fakeEvent = {
        target: { files: [file], value: "" }
      };
      handleFileSelect(fakeEvent);
    }
  };

  return (
    <div className="space-y-4">
      {/* Show current image if exists */}
      {currentImage && !imagePreview && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Image
          </label>
          <div className="relative inline-block">
            <img
              src={currentImage}
              alt="Current image"
              className="h-32 w-auto rounded-md border border-gray-300 object-cover max-w-full"
              onError={(e) => {
                e.target.src = "/placeholder-image.svg";
              }}
            />
          </div>
        </div>
      )}

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {currentImage && !imagePreview ? "Replace Image" : label} {required && "*"}
        </label>
        <div 
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
            dragActive 
              ? "border-[#F15A29] bg-orange-50" 
              : "border-gray-300 hover:border-[#F15A29]"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#F15A29] hover:text-[#004A70] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#F15A29]"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept={accept}
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="pl-0 sm:pl-1 pt-1 sm:pt-0">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 px-2">PNG, JPG, WebP up to 5MB (will upload when you save)</p>
            </div>
        </div>

      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="text-red-600 text-sm">{uploadError}</div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 w-auto rounded-md border border-gray-300 object-cover max-w-full"
              onError={(e) => {
                e.target.src = "/placeholder-image.svg";
              }}
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview("");
                setSelectedFile(null);
                onImageChange("");
                // Cleanup object URL to prevent memory leaks
                if (imagePreview && imagePreview.startsWith('blob:')) {
                  URL.revokeObjectURL(imagePreview);
                }
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}