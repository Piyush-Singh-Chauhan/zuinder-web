"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function BlogForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    title: {
      en: initialData?.title?.en || "",
      pt: initialData?.title?.pt || ""
    },
    description: {
      en: initialData?.description?.en || "",
      pt: initialData?.description?.pt || ""
    },
    content: {
      en: initialData?.content?.en || "",
      pt: initialData?.content?.pt || ""
    },
    slug: initialData?.slug || "",
    image: initialData?.image || "",
    tags: initialData?.tags?.join(", ") || "",
    author: initialData?.author || "Zuinder Team",
    readTime: initialData?.readTime || 5,
    isPublished: initialData?.isPublished ?? true
  });

  // Field validation functions
  const validateField = (field, value, lang = null) => {
    if (lang) {
      // Multi-language field validation
      if (field === "title") {
        if (!value.trim()) return `Title (${lang.toUpperCase()}) is required`;
        if (value.length > 200) return `Title must not exceed 200 characters`;
      }
      if (field === "description") {
        if (!value.trim()) return `Description (${lang.toUpperCase()}) is required`;
        if (value.length > 500) return `Description must not exceed 500 characters`;
      }
      if (field === "content") {
        if (!value.trim()) return `Content (${lang.toUpperCase()}) is required`;
        if (value.length < 10) return `Content must be at least 10 characters`;
      }
    } else {
      // Single field validation
      if (field === "slug") {
        if (!value.trim()) return "URL Slug is required";
        if (!/^[a-z0-9-]+$/.test(value)) return "Slug can only contain lowercase letters, numbers, and hyphens";
      }
      if (field === "image") {
        // Handle both File objects and string URLs
        if (!value || (typeof value === 'string' && !value.trim()) || (value instanceof File && !value.name)) {
          return "Featured image is required";
        }
      }
      if (field === "author") {
        if (value && value.length > 50) return "Author name must not exceed 50 characters";
      }
      if (field === "readTime") {
        if (value && (value < 1 || value > 60)) return "Read time must be between 1 and 60 minutes";
      }
      if (field === "tags") {
        if (value && value.length > 200) return "Tags must not exceed 200 characters";
      }
    }
    return "";
  };

  // Handle input changes with validation
  const handleChange = (field, value, lang = null) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value
        }
      }));
      // Real-time validation
      const error = validateField(field, value, lang);
      setFieldErrors(prev => ({
        ...prev,
        [`${field}_${lang}`]: error
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      // Real-time validation
      const error = validateField(field, value);
      setFieldErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  // Generate slug from English title
  const generateSlug = () => {
    const slug = formData.title.en
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    
    handleChange("slug", slug);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate all fields
    const newFieldErrors = {
      title_en: validateField("title", formData.title.en, "en"),
      title_pt: validateField("title", formData.title.pt, "pt"),
      description_en: validateField("description", formData.description.en, "en"),
      description_pt: validateField("description", formData.description.pt, "pt"),
      content_en: validateField("content", formData.content.en, "en"),
      content_pt: validateField("content", formData.content.pt, "pt"),
      slug: validateField("slug", formData.slug),
      image: validateField("image", formData.image),
      author: validateField("author", formData.author),
      readTime: validateField("readTime", formData.readTime),
      tags: validateField("tags", formData.tags)
    };

    setFieldErrors(newFieldErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newFieldErrors).some(error => error !== "");
    if (hasErrors) {
      setError("Please fix the errors below");
      setLoading(false);
      return;
    }

    // Additional image validation
    if (!formData.image || (typeof formData.image === 'string' && !formData.image.trim()) || (formData.image instanceof File && !formData.image.name)) {
      setError("Featured image is required");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = formData.image;

      // If formData.image is a File object, upload it to Cloudinary first
      if (formData.image instanceof File) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", formData.image);

        const uploadResponse = await fetch("/api/admin/upload", {
          method: "POST",
          body: formDataToUpload,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          imageUrl = uploadData.url;
        } else {
          setError(uploadData.message || "Failed to upload image");
          setLoading(false);
          return;
        }
      }

      // Prepare data for API
      const apiData = {
        ...formData,
        image: imageUrl, // Use the uploaded Cloudinary URL
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        readTime: parseInt(formData.readTime) || 5
      };

      const url = isEdit ? `/api/admin/blogs/${initialData._id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || `Failed to ${isEdit ? "update" : "create"} blog`);
      }
    } catch (error) {
      console.error("Blog form error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isEdit ? "Update your blog post" : "Create a new blog post for your website"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          {/* Basic Information */}
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Basic blog post information and settings.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                {/* Title */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) => handleChange("title", e.target.value, "en")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, title_en: validateField("title", e.target.value, "en") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.title_en ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter English title"
                      required
                    />
                    {fieldErrors.title_en && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.title_en}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title (Portuguese) *
                    </label>
                    <input
                      type="text"
                      value={formData.title.pt}
                      onChange={(e) => handleChange("title", e.target.value, "pt")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, title_pt: validateField("title", e.target.value, "pt") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.title_pt ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter Portuguese title"
                      required
                    />
                    {fieldErrors.title_pt && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.title_pt}</p>
                    )}
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    URL Slug *
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm flex-col sm:flex-row">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, slug: validateField("slug", e.target.value) }))}
                      className={`flex-1 block w-full border-gray-300 rounded-md sm:rounded-r-none sm:rounded-l-md focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.slug ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="blog-post-url"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-md sm:rounded-l-none sm:rounded-r-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 whitespace-nowrap"
                    >
                      Generate
                    </button>
                  </div>
                  {fieldErrors.slug && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    URL-friendly version of the title
                  </p>
                </div>

                {/* Featured Image */}
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(url) => handleChange("image", url)}
                  label="Featured Image"
                  required={true}
                />

                {/* Meta Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => handleChange("author", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, author: validateField("author", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.author ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Author name"
                    />
                    {fieldErrors.author && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.author}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={formData.readTime}
                      onChange={(e) => handleChange("readTime", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, readTime: validateField("readTime", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.readTime ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {fieldErrors.readTime && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.readTime}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleChange("tags", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, tags: validateField("tags", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.tags ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="web development, react, nextjs"
                    />
                    {fieldErrors.tags && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.tags}</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => handleChange("isPublished", e.target.checked)}
                    className="h-4 w-4 text-[#F15A29] focus:ring-[#F15A29] border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Description</h3>
              <p className="mt-1 text-sm text-gray-500">
                Short description for the blog post preview.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (English) *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description.en}
                    onChange={(e) => handleChange("description", e.target.value, "en")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, description_en: validateField("description", e.target.value, "en") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.description_en ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter English description"
                    required
                  />
                  {fieldErrors.description_en && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.description_en}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{formData.description.en.length}/500 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (Portuguese) *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description.pt}
                    onChange={(e) => handleChange("description", e.target.value, "pt")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, description_pt: validateField("description", e.target.value, "pt") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.description_pt ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter Portuguese description"
                    required
                  />
                  {fieldErrors.description_pt && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.description_pt}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{formData.description.pt.length}/500 characters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Content</h3>
              <p className="mt-1 text-sm text-gray-500">
                Full blog post content in both languages.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content (English) *
                  </label>
                  <textarea
                    rows={10}
                    value={formData.content.en}
                    onChange={(e) => handleChange("content", e.target.value, "en")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, content_en: validateField("content", e.target.value, "en") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.content_en ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter full blog content in English"
                    required
                  />
                  {fieldErrors.content_en && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.content_en}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content (Portuguese) *
                  </label>
                  <textarea
                    rows={10}
                    value={formData.content.pt}
                    onChange={(e) => handleChange("content", e.target.value, "pt")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, content_pt: validateField("content", e.target.value, "pt") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.content_pt ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter full blog content in Portuguese"
                    required
                  />
                  {fieldErrors.content_pt && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.content_pt}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || Object.values(fieldErrors).some(error => error !== "")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#F15A29] hover:bg-[#004A70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F15A29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <LoadingSpinner size="small" className="mr-2" />
            ) : null}
            {loading 
              ? (isEdit ? "Updating..." : "Creating...") 
              : (isEdit ? "Update Blog Post" : "Create Blog Post")
            }
          </button>
        </div>
      </form>
    </div>
  );
}