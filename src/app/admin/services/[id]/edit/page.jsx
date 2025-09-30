"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function EditServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/admin/services/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setService(data.data);
      } else {
        setError(data.message || "Failed to fetch service");
      }
    } catch (error) {
      console.error("Fetch service error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Service not found</h3>
        <p className="text-gray-500">The service you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <ServiceForm initialData={service} isEdit={true} />;
}