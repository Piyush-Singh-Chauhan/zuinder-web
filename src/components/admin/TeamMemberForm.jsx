"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function TeamMemberForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    name: {
      en: initialData?.name?.en || "",
      pt: initialData?.name?.pt || ""
    },
    role: {
      en: initialData?.role?.en || "",
      pt: initialData?.role?.pt || ""
    },
    image: initialData?.image || "",
    isActive: initialData?.isActive ?? true,
    order: initialData?.order || 0
  });

  // Field validation functions
  const validateField = (field, value, lang = null) => {
    if (lang) {
      // Multi-language field validation
      if (field === "name") {
        if (!value.trim()) return `Name (${lang.toUpperCase()}) is required`;
        if (value.length > 100) return `Name must not exceed 100 characters`;
      }
      if (field === "role") {
        if (!value.trim()) return `Role (${lang.toUpperCase()}) is required`;
        if (value.length > 100) return `Role must not exceed 100 characters`;
      }
    } else {
      // Single field validation
      if (field === "image") {
        // Handle both File objects and string URLs
        if (!value || (typeof value === 'string' && !value.trim()) || (value instanceof File && !value.name)) {
          return "Team member image is required";
        }
      }
      if (field === "order") {
        if (value && (value < 0 || value > 999)) return "Display order must be between 0 and 999";
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
      name_en: validateField("name", formData.name.en, "en"),
      name_pt: validateField("name", formData.name.pt, "pt"),
      role_en: validateField("role", formData.role.en, "en"),
      role_pt: validateField("role", formData.role.pt, "pt"),
      image: validateField("image", formData.image),
      order: validateField("order", formData.order)
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
      setError("Team member image is required");
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
        order: parseInt(formData.order) || 0
      };

      const url = isEdit ? `/api/admin/team-members/${initialData._id}` : "/api/admin/team-members";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
        credentials: "include" // Include cookies with the request
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin/team-members");
      } else {
        setError(data.message || `Failed to ${isEdit ? "update" : "create"} team member`);
      }
    } catch (error) {
      console.error("Team member form error:", error);
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
            {isEdit ? "Edit Team Member" : "Create New Team Member"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isEdit ? "Update your team member" : "Add a new team member to your website"}
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
                Basic team member information and settings.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.name.en}
                      onChange={(e) => handleChange("name", e.target.value, "en")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, name_en: validateField("name", e.target.value, "en") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.name_en ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter English name"
                      required
                    />
                    {fieldErrors.name_en && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.name_en}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">{formData.name.en.length}/100 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name (Portuguese) *
                    </label>
                    <input
                      type="text"
                      value={formData.name.pt}
                      onChange={(e) => handleChange("name", e.target.value, "pt")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, name_pt: validateField("name", e.target.value, "pt") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.name_pt ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter Portuguese name"
                      required
                    />
                    {fieldErrors.name_pt && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.name_pt}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">{formData.name.pt.length}/100 characters</p>
                  </div>
                </div>

                {/* Role */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.role.en}
                      onChange={(e) => handleChange("role", e.target.value, "en")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, role_en: validateField("role", e.target.value, "en") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.role_en ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter English role"
                      required
                    />
                    {fieldErrors.role_en && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.role_en}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">{formData.role.en.length}/100 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role (Portuguese) *
                    </label>
                    <input
                      type="text"
                      value={formData.role.pt}
                      onChange={(e) => handleChange("role", e.target.value, "pt")}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, role_pt: validateField("role", e.target.value, "pt") }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.role_pt ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="Enter Portuguese role"
                      required
                    />
                    {fieldErrors.role_pt && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.role_pt}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">{formData.role.pt.length}/100 characters</p>
                  </div>
                </div>

                {/* Team Member Image */}
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(url) => handleChange("image", url)}
                  label="Team Member Image"
                  required={true}
                />

                {/* Meta Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              : (isEdit ? "Update Team Member" : "Create Team Member")
            }
          </button>
        </div>
      </form>
    </div>
  );
}