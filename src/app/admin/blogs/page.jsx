"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ConfirmationDialog from "@/components/admin/ConfirmationDialog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(null);
  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        admin: "true"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/blogs?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    setItemToDelete(blogId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(itemToDelete);
    try {
      const response = await fetch(`/api/admin/blogs/${itemToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove blog from list
        setBlogs(blogs.filter(blog => blog._id !== itemToDelete));
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      setError("Network error occurred");
    } finally {
      setDeleteLoading(null);
      setShowConfirmDialog(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setItemToDelete(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your blog posts and articles
          </p>
        </div>
        <div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F15A29] hover:bg-[#004A70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F15A29] w-full sm:w-auto justify-center"
          >
            <span className="mr-2">✏️</span>
            New Blog Post
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <label htmlFor="search" className="sr-only">
          Search blogs
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F15A29] focus:border-[#F15A29]"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Blogs Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? "No blogs match your search." : "Get started by creating your first blog post."}
                </p>
                <Link
                  href="/admin/blogs/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F15A29] hover:bg-[#004A70]"
                >
                  Create Blog Post
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <li key={blog._id} className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {blog.title?.en || "Untitled"}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              {blog.description?.en || "No description"}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <span>Created: {formatDate(blog.createdAt)}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Views: {blog.views || 0}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Read time: {blog.readTime || 5} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium self-start sm:self-center ${
                          blog.isPublished 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {blog.isPublished ? "Published" : "Draft"}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/blogs/${blog._id}/edit`}
                            className="text-[#F15A29] hover:text-[#004A70] text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            disabled={deleteLoading === blog._id}
                            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                          >
                            {deleteLoading === blog._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination */}
          {blogs.length > 0 && pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 sm:px-6 gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700 text-center sm:text-left">
                  Showing page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{pagination.totalPages}</span>
                  {" "}({pagination.totalBlogs} total blogs)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!pagination.hasPrev}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={!pagination.hasNext}
                  className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        type="danger"
      />
    </div>
  );
}