"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { t, language } = useLanguage();
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blogs/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setBlog(result.data);
          } else {
            setError('Invalid API response');
          }
        } else if (response.status === 404) {
          setError('Blog not found');
        } else {
          setError('Failed to fetch blog');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Error loading blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Loading Skeleton */}
        <section className="relative z-10 overflow-hidden bg-white pb-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="-mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                <div className="mb-8 max-w-[570px] md:mb-0">
                  <div className="mb-4 h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="w-full px-4 md:w-4/12 lg:w-5/12">
                <div className="text-start md:text-end">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Loading Skeleton */}
        <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[120px] px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8 aspect-video bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const blogTitle = blog.title?.[language] || blog.title?.en || blog.title || 'Untitled';
  const blogDescription = blog.description?.[language] || blog.description?.en || blog.description || '';
  const blogContent = blog.content?.[language] || blog.content?.en || blog.content || '';
  const blogImage = blog.image || '/assets/img/blog/blog1.webp';

  return (
    <>
      {/* Header Section */}
      <section className="relative z-10 overflow-hidden bg-white pb-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="-mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-0">
            {/* Left — Title & Intro */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0">
                <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004A70] leading-snug">
                  {blogTitle}
                </h1>
                {blogDescription && (
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                    {blogDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Right — Breadcrumb */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-start md:text-end">
                <ul className="flex flex-wrap items-center md:justify-end text-sm sm:text-base">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="pr-1 font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
                    >
                      {t("common.home")}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
                  </li>
                  <li className="flex items-center">
                    <Link
                      href="/blog"
                      className="pr-1 font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
                    >
                      {t("blogs.breadcrumb")}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
                  </li>
                  <li className="font-medium text-[#F15A29]">
                    {blogTitle}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Left */}
        <span className="absolute bottom-0 left-0 z-[-1]">
          <svg
            width="730"
            height="206"
            viewBox="0 0 730 206"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.08"
              width="136.991"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 -201.278 330.677)"
              fill="url(#paint0_linear_0:1)"
            />
            <rect
              opacity="0.05"
              width="345.355"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 74 330.677)"
              fill="url(#paint1_linear_0:1)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0:1"
                x1="68.4956"
                y1="0"
                x2="68.4956"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_0:1"
                x1="172.678"
                y1="0"
                x2="172.678"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>

        {/* Decorative Background Right */}
        <span className="absolute right-0 top-0 z-[-1]">
          <svg
            width="405"
            height="206"
            viewBox="0 0 405 206"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.08"
              width="289.718"
              height="563.705"
              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 603.461 -125.138)"
              fill="url(#paint0_linear_54:595)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_54:595"
                x1="144.859"
                y1="0"
                x2="144.859"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
      </section>

      {/* Blog Content Section */}
      <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="relative aspect-video">
              <Image
                src={blogImage}
                alt={blogTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-8 lg:p-12">
              {/* Meta Information */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#004A70]/10 text-[#004A70] rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {blog.createdAt && (
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                {blogContent ? (
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {blogDescription || 'Content not available.'}
                  </p>
                )}
              </div>

              {/* Back to Blog Button */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                      fill="currentColor"
                    />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}