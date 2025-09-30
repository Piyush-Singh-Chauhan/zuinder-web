"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ServiceForm({ initialData = null, isEdit = false }) {
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
    image: initialData?.image || "",
    features: {
      en: initialData?.features?.en || [""],
      pt: initialData?.features?.pt || [""]
    },
    price: initialData?.price || "",
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
        if (value.length > 1000) return `Description must not exceed 1000 characters`;
      }
    } else {
      // Single field validation
      if (field === "image") {
        // Handle both File objects and string URLs
        if (!value || (typeof value === 'string' && !value.trim()) || (value instanceof File && !value.name)) {
          return "Service image is required";
        }
      }
      if (field === "price") {
        if (value && value.length > 100) return "Price must not exceed 100 characters";
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

  // Handle features array
  const handleFeatureChange = (index, value, lang) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].map((feature, i) => i === index ? value : feature)
      }
    }));
  };

  const addFeature = (lang) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: [...prev.features[lang], ""]
      }
    }));
  };

  const removeFeature = (index, lang) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].filter((_, i) => i !== index)
      }
    }));
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
      image: validateField("image", formData.image),
      price: validateField("price", formData.price),
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
      setError("Service image is required");
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
        features: {
          en: formData.features.en.filter(feature => feature.trim()),
          pt: formData.features.pt.filter(feature => feature.trim())
        },
        order: parseInt(formData.order) || 0
      };

      const url = isEdit ? `/api/admin/services/${initialData._id}` : "/api/admin/services";
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
        router.push("/admin/services");
      } else {
        setError(data.message || `Failed to ${isEdit ? "update" : "create"} service`);
      }
    } catch (error) {
      console.error("Service form error:", error);
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
            {isEdit ? "Edit Service" : "Create New Service"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {isEdit ? "Update your service" : "Add a new service to your website"}
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
                Basic service information and settings.
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
                    <p className="mt-1 text-xs text-gray-500">{formData.title.en.length}/200 characters</p>
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
                    <p className="mt-1 text-xs text-gray-500">{formData.title.pt.length}/200 characters</p>
                  </div>
                </div>

                {/* Service Image */}
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={(url) => handleChange("image", url)}
                  label="Service Image"
                  required={true}
                />

                {/* Meta Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      onBlur={(e) => setFieldErrors(prev => ({ ...prev, price: validateField("price", e.target.value) }))}
                      className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                        fieldErrors.price ? "border-red-500 bg-red-50" : ""
                      }`}
                      placeholder="$99/month"
                    />
                    {fieldErrors.price && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.price}</p>
                    )}
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
                Detailed description of the service.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (English) *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description.en}
                    onChange={(e) => handleChange("description", e.target.value, "en")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, description_en: validateField("description", e.target.value, "en") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.description_en ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter detailed English description"
                    required
                  />
                  {fieldErrors.description_en && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.description_en}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{formData.description.en.length}/1000 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (Portuguese) *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description.pt}
                    onChange={(e) => handleChange("description", e.target.value, "pt")}
                    onBlur={(e) => setFieldErrors(prev => ({ ...prev, description_pt: validateField("description", e.target.value, "pt") }))}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29] ${
                      fieldErrors.description_pt ? "border-red-500 bg-red-50" : ""
                    }`}
                    placeholder="Enter detailed Portuguese description"
                    required
                  />
                  {fieldErrors.description_pt && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.description_pt}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{formData.description.pt.length}/1000 characters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Features</h3>
              <p className="mt-1 text-sm text-gray-500">
                Key features of this service (optional).
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                {/* English Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (English)
                  </label>
                  {formData.features.en.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value, "en")}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29]"
                        placeholder="Enter feature"
                        maxLength={200}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index, "en")}
                        className="text-red-600 hover:text-red-800"
                        disabled={formData.features.en.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("en")}
                    className="text-[#F15A29] hover:text-[#004A70] text-sm"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* Portuguese Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (Portuguese)
                  </label>
                  {formData.features.pt.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value, "pt")}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-[#F15A29] focus:border-[#F15A29]"
                        placeholder="Enter feature"
                        maxLength={200}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index, "pt")}
                        className="text-red-600 hover:text-red-800"
                        disabled={formData.features.pt.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature("pt")}
                    className="text-[#F15A29] hover:text-[#004A70] text-sm"
                  >
                    + Add Feature
                  </button>
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
              : (isEdit ? "Update Service" : "Create Service")
            }
          </button>
        </div>
      </form>
    </div>
  );
}