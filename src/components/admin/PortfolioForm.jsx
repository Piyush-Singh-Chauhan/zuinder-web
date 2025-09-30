"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function PortfolioForm({ initialData = null, isEdit = false }) {
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
    category: {
      en: initialData?.category?.en || "",
      pt: initialData?.category?.pt || ""
    },
    image: initialData?.image || "",
    link: initialData?.link || "",
    technologies: initialData?.technologies?.join(", ") || "",
    client: initialData?.client || "",
    projectDate: initialData?.projectDate ? new Date(initialData.projectDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    isActive: initialData?.isActive ?? true,
    order: initialData?.order || 0
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
      if (field === "category") {
        if (!value.trim()) return `Category (${lang.toUpperCase()}) is required`;
        if (value.length > 100) return `Category must not exceed 100 characters`;
      }
    } else {
      // Single field validation
      if (field === "link") {
        if (!value.trim()) return "Project link is required";
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL";
        }
      }
      if (field === "client") {
        if (value && value.length > 100) return "Client name must not exceed 100 characters";
      }
      if (field === "order") {
        if (value && (value < 0 || value > 999)) return "Display order must be between 0 and 999";
      }
      if (field === "technologies") {
        if (value && value.length > 200) return "Technologies must not exceed 200 characters";
      }
      if (field === "image") {
        // Handle both File objects and string URLs
        if (!value || (typeof value === 'string' && !value.trim()) || (value instanceof File && !value.name)) {
          return "Project image is required";
        }
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
      category_en: validateField("category", formData.category.en, "en"),
      category_pt: validateField("category", formData.category.pt, "pt"),
      link: validateField("link", formData.link),
      client: validateField("client", formData.client),
      order: validateField("order", formData.order),
      technologies: validateField("technologies", formData.technologies)
    };

    setFieldErrors(newFieldErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newFieldErrors).some(error => error !== "");
    if (hasErrors) {
      setError("Please fix the errors below");
      setLoading(false);
      return;
    }

    if (!formData.image || (typeof formData.image === 'string' && !formData.image.trim()) || (formData.image instanceof File && !formData.image.name)) {
      setError("Image is required");
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
        technologies: formData.technologies ? formData.technologies.split(",").map(tech => tech.trim()).filter(tech => tech) : [],
        order: parseInt(formData.order) || 0,
        projectDate: new Date(formData.projectDate)
      };

      const url = isEdit ? `/api/admin/portfolio/${initialData._id}` : "/api/admin/portfolio";
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
        router.push("/admin/portfolio");
      } else {
        setError(data.message || `Failed to ${isEdit ? "update" : "create"} portfolio item`);
      }
    } catch (error) {
      console.error("Portfolio form error:", error);
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
            {isEdit ? "Edit Portfolio Item" : "Add New Portfolio Item"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isEdit ? "Update your portfolio item" : "Add a new project to your portfolio"}
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
        {/* Basic Information */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Basic portfolio item information and settings.
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

                {/* Category */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.category.en}
                      onChange={(e) => handleChange("category", e.target.value, "en")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, category_en: validateField("category", e.target.value, "en") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.category_en ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="e.g., Web Development"
                      required
                    />
                    {fieldErrors.category_en && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.category_en}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category (Portuguese) *
                    </label>
                    <input
                      type="text"
                      value={formData.category.pt}
                      onChange={(e) => handleChange("category", e.target.value, "pt")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, category_pt: validateField("category", e.target.value, "pt") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.category_pt ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="e.g., Desenvolvimento Web"
                      required
                    />
                    {fieldErrors.category_pt && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.category_pt}</p>
                    )}
                  </div>
                </div>

                {/* Project Image */}
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(url) => handleChange("image", url)}
                  label="Project Image"
                  required={true}
                />

                {/* Project Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Link *
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => handleChange("link", e.target.value)}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, link: validateField("link", e.target.value) }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.link ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="https://project-demo.com"
                    required
                  />
                  {fieldErrors.link && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.link}</p>
                  )}
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => handleChange("client", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, client: validateField("client", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.client ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Client name"
                    />
                    {fieldErrors.client && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.client}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Project Date
                    </label>
                    <input
                      type="date"
                      value={formData.projectDate}
                      onChange={(e) => handleChange("projectDate", e.target.value)}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="999"
                      value={formData.order}
                      onChange={(e) => handleChange("order", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, order: validateField("order", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.order ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="0"
                    />
                    {fieldErrors.order && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.order}</p>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => handleChange("technologies", e.target.value)}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, technologies: validateField("technologies", e.target.value) }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.technologies ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="React, Next.js, TailwindCSS"
                  />
                  {fieldErrors.technologies && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.technologies}</p>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <input
                    id="active"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                    className="h-4 w-4 text-[#F15A29] focus:ring-[#F15A29] border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                    Active (show on website)
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
                Detailed description of the project.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (English) *
                  </label>
                  <textarea
                    rows={4}
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
                    rows={4}
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
              : (isEdit ? "Update Portfolio Item" : "Add Portfolio Item")
            }
          </button>
        </div>
      </form>
    </div>
  );
}