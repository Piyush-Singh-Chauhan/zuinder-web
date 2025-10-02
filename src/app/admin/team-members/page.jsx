"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import ConfirmationDialog from "@/components/admin/ConfirmationDialog";

export default function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, [searchTerm]);

  const fetchTeamMembers = async () => {
    try {
      const params = new URLSearchParams({
        admin: "true"
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/admin/team-members?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setTeamMembers(data.data);
      } else {
        setError(data.message || "Failed to fetch team members");
      }
    } catch (error) {
      console.error("Fetch team members error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teamMemberId) => {
    setItemToDelete(teamMemberId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(itemToDelete);
    try {
      const response = await fetch(`/api/admin/team-members/${itemToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (data.success) {
        setTeamMembers(teamMembers.filter(member => member._id !== itemToDelete));
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error("Delete team member error:", error);
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your team members
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/team-members/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F15A29] hover:bg-[#004A70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F15A29]"
          >
            <span className="mr-2">👥</span>
            Add New Team Member
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search team members..."
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
          {/* Team Members Grid */}
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "No team members match your search." : "Get started by adding your first team member."}
              </p>
              <Link
                href="/admin/team-members/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F15A29] hover:bg-[#004A70]"
              >
                Add Team Member
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member._id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {member.image && (
                          <img 
                            src={member.image} 
                            alt={member.name?.en || "Team Member"}
                            className="h-10 w-10 object-cover rounded"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {member.name?.en || "Untitled"}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {member.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {member.role?.en || "No role"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        Order: {member.order} | {formatDate(member.createdAt)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/team-members/${member._id}/edit`}
                          className="text-[#F15A29] hover:text-[#004A70] text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id)}
                          disabled={deleteLoading === member._id}
                          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                        >
                          {deleteLoading === member._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Cancel"
        type="danger"
      />
    </div>
  );
}