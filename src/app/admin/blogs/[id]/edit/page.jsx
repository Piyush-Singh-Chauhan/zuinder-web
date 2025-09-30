"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setBlog(data.data);
      } else {
        setError(data.message || "Failed to fetch blog");
      }
    } catch (error) {
      console.error("Fetch blog error:", error);
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

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Blog not found</h3>
        <p className="text-gray-500">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <BlogForm initialData={blog} isEdit={true} />;
}