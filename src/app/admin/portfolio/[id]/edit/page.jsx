"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function EditPortfolioPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchPortfolio();
    }
  }, [params.id]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/admin/portfolio/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setPortfolio(data.data);
      } else {
        setError(data.message || "Failed to fetch portfolio item");
      }
    } catch (error) {
      console.error("Fetch portfolio error:", error);
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

  if (!portfolio) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Portfolio item not found</h3>
        <p className="text-gray-500">The portfolio item you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <PortfolioForm initialData={portfolio} isEdit={true} />;
}