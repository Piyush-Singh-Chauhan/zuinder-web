"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [additionalCounts, setAdditionalCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardResponse, countsResponse] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/dashboard/counts")
      ]);
      
      const dashboardData = await dashboardResponse.json();
      const countsData = await countsResponse.json();
      
      if (dashboardData.success) {
        setDashboardData(dashboardData.data);
      } else {
        setError(dashboardData.message || "Failed to fetch dashboard data");
      }
      
      if (countsData.success) {
        setAdditionalCounts(countsData.data);
      }
      
    } catch (error) {
      console.error("Dashboard fetch error:", error);
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

  const { stats, recent } = dashboardData || {};
  const { services, teamMembers } = additionalCounts || {};

  const statCards = [
    {
      title: "Total Blogs",
      value: stats?.blogs?.total || 0,
      subtitle: `${stats?.blogs?.published || 0} published`,
      icon: "📝",
      color: "bg-blue-500",
      link: "/admin/blogs"
    },
    {
      title: "Portfolio Items",
      value: stats?.portfolios?.total || 0,
      subtitle: `${stats?.portfolios?.active || 0} active`,
      icon: "💼",
      color: "bg-green-500",
      link: "/admin/portfolio"
    },
    {
      title: "Services",
      value: services?.total || 0,
      subtitle: "Total services",
      icon: "⚙️",
      color: "bg-yellow-500",
      link: "/admin/services"
    },
    {
      title: "Team Members",
      value: teamMembers?.total || 0,
      subtitle: "Total members",
      icon: "👥",
      color: "bg-indigo-500",
      link: "/admin/team"
    },
    {
      title: "Contact Messages",
      value: stats?.contacts?.total || 0,
      subtitle: "Total inquiries",
      icon: "📧",
      color: "bg-purple-500",
      link: "/admin/contacts"
    },
    {
      title: "Newsletter Subscribers",
      value: stats?.subscribers?.total || 0,
      subtitle: `${stats?.subscribers?.active || 0} active`,
      icon: "📬",
      color: "bg-orange-500",
      link: "/admin/newsletter"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Zuinder Admin Panel! 👋
          </h1>
          <p className="text-gray-600">
            Manage your website content, view analytics, and handle user interactions all in one place.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${card.color} p-3 rounded-md`}>
                      <span className="text-white text-xl">{card.icon}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 truncate">
                        {card.value}
                      </dd>
                      <dd className="text-sm text-gray-600 truncate">
                        {card.subtitle}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Blogs */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Blogs
            </h3>
            {recent?.blogs?.length > 0 ? (
              <div className="space-y-3">
                {recent.blogs.map((blog) => (
                  <div key={blog._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {blog.title?.en || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      blog.isPublished 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No blogs yet</p>
            )}
            <div className="mt-4">
              <Link 
                href="/admin/blogs" 
                className="text-sm text-[#F15A29] hover:text-[#004A70] font-medium"
              >
                View all blogs →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Contacts
            </h3>
            {recent?.contacts?.length > 0 ? (
              <div className="space-y-3">
                {recent.contacts.map((contact) => (
                  <div key={contact._id} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {contact.email}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No contacts yet</p>
            )}
            <div className="mt-4">
              <Link 
                href="/admin/contacts" 
                className="text-sm text-[#F15A29] hover:text-[#004A70] font-medium"
              >
                View all contacts →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F15A29] hover:bg-[#004A70] transition-colors justify-center"
            >
              <span className="mr-2">✏️</span>
              New Blog Post
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4A90A4] hover:bg-[#004A70] transition-colors justify-center"
            >
              <span className="mr-2">💼</span>
              Add Portfolio
            </Link>
            <Link
              href="/admin/contacts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors justify-center"
            >
              <span className="mr-2">📧</span>
              View Messages
            </Link>
            <Link
              href="/admin/newsletter"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors justify-center"
            >
              <span className="mr-2">📬</span>
              Subscribers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}