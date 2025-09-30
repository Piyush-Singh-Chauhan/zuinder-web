"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/newsletter");
      const data = await response.json();
      
      if (data.success) {
        setSubscribers(data.data);
        setStats(data.stats);
      } else {
        setError(data.message || "Failed to fetch subscribers");
      }
    } catch (error) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="mt-2 text-sm text-gray-700">Manage your newsletter subscription list</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-md mr-4">
              <span className="text-white text-xl">✅</span>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Active</dt>
              <dd className="text-lg font-medium text-gray-900">{stats.totalActive || 0}</dd>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-md mr-4">
              <span className="text-white text-xl">❌</span>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Inactive</dt>
              <dd className="text-lg font-medium text-gray-900">{stats.totalInactive || 0}</dd>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-md mr-4">
              <span className="text-white text-xl">📧</span>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total</dt>
              <dd className="text-lg font-medium text-gray-900">{stats.total || 0}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {subscribers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers found</h3>
            <p className="text-gray-500">No newsletter subscriptions yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <li key={subscriber._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{subscriber.email}</p>
                    <p className="text-xs text-gray-500">Subscribed: {formatDate(subscriber.createdAt)}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subscriber.isActive 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {subscriber.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}