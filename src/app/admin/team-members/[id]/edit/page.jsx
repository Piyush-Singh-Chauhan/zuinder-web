"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchTeamMember();
    }
  }, [id]);

  const fetchTeamMember = async () => {
    try {
      const response = await fetch(`/api/admin/team-members/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setTeamMember(data.data);
      } else {
        setError(data.message || "Failed to fetch team member");
      }
    } catch (error) {
      console.error("Fetch team member error:", error);
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

  if (!teamMember) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Team member not found</h3>
        <p className="text-gray-500">The team member you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <TeamMemberForm initialData={teamMember} isEdit={true} />;
}