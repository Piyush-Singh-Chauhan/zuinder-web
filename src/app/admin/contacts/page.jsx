"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ConfirmationDialog from "@/components/admin/ConfirmationDialog";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
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
    fetchContacts();
  }, [currentPage, searchTerm]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/contacts?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Fetch contacts error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    setItemToDelete(contactId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(itemToDelete);
    try {
      const response = await fetch(`/api/admin/contacts?id=${itemToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.filter(contact => contact._id !== itemToDelete));
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete contact error:", error);
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
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="mt-2 text-sm text-gray-700">
          View and manage contact form submissions
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search contacts..."
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
          {/* Contacts Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📧</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "No contacts match your search." : "No contact form submissions yet."}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <li key={contact._id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium text-gray-900">
                                {contact.name}
                              </h3>
                              {contact.company && (
                                <span className="text-sm text-gray-500">
                                  at {contact.company}
                                </span>
                              )}
                            </div>
                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                              <span>📧 {contact.email}</span>
                              <span>📱 {contact.phone}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">
                              {contact.message}
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                              Submitted: {formatDate(contact.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-[#F15A29] hover:text-[#004A70] text-sm font-medium"
                          >
                            Reply
                          </a>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            disabled={deleteLoading === contact._id}
                            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                          >
                            {deleteLoading === contact._id ? "Deleting..." : "Delete"}
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
          {contacts.length > 0 && pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!pagination.hasPrev}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={!pagination.hasNext}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{pagination.totalPages}</span>
                    {" "}({pagination.totalContacts} total contacts)
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={!pagination.hasPrev}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                      disabled={!pagination.hasNext}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
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
        title="Delete Contact"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        type="danger"
      />
    </div>
  );
}