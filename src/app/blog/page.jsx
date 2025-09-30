"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useState, useEffect } from "react";

export default function BlogHeader() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/admin/blogs');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            const filteredBlogs = result.data.filter(blog => blog.isPublished);
            setBlogs(filteredBlogs);
          } else {
            console.error('Invalid API response structure');
            // Fallback to static data
            const translated = t("blog.items") || [];
            const fallbackBlogs = [
              {
                _id: 1,
                slug: "exploring-the-mern-stack-powering-modern-web-development",
                title: { [currentLanguage]: translated[0]?.title || "Blog Title 1" },
                description: { [currentLanguage]: translated[0]?.desc || "Blog description 1" },
                image: "/assets/img/blog/blog1.webp",
              },
              {
                _id: 2,
                slug: "best-ui-components-for-modern-websites",
                title: { [currentLanguage]: translated[1]?.title || "Blog Title 2" },
                description: { [currentLanguage]: translated[1]?.desc || "Blog description 2" },
                image: "/assets/img/blog/blog2.webp",
              },
              {
                _id: 3,
                slug: "the-power-of-uiux-elevating-digital-experiences",
                title: { [currentLanguage]: translated[2]?.title || "Blog Title 3" },
                description: { [currentLanguage]: translated[2]?.desc || "Blog description 3" },
                image: "/assets/img/blog/blog3.webp",
              },
            ];
            setBlogs(fallbackBlogs);
          }
        } else {
          console.error('Failed to fetch blogs');
          // Fallback to static data if API fails
          const translated = t("blog.items") || [];
          const fallbackBlogs = [
            {
              _id: 1,
              slug: "exploring-the-mern-stack-powering-modern-web-development",
              title: { [currentLanguage]: translated[0]?.title || "Blog Title 1" },
              description: { [currentLanguage]: translated[0]?.desc || "Blog description 1" },
              image: "/assets/img/blog/blog1.webp",
            },
            {
              _id: 2,
              slug: "best-ui-components-for-modern-websites",
              title: { [currentLanguage]: translated[1]?.title || "Blog Title 2" },
              description: { [currentLanguage]: translated[1]?.desc || "Blog description 2" },
              image: "/assets/img/blog/blog2.webp",
            },
            {
              _id: 3,
              slug: "the-power-of-uiux-elevating-digital-experiences",
              title: { [currentLanguage]: translated[2]?.title || "Blog Title 3" },
              description: { [currentLanguage]: translated[2]?.desc || "Blog description 3" },
              image: "/assets/img/blog/blog3.webp",
            },
          ];
          setBlogs(fallbackBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to static data on error
        const translated = t("blog.items") || [];
        const fallbackBlogs = [
          {
            _id: 1,
            slug: "exploring-the-mern-stack-powering-modern-web-development",
            title: { [language]: translated[0]?.title || "Blog Title 1" },
            description: { [language]: translated[0]?.desc || "Blog description 1" },
            image: "/assets/img/blog/blog1.webp",
          },
          {
            _id: 2,
            slug: "best-ui-components-for-modern-websites",
            title: { [language]: translated[1]?.title || "Blog Title 2" },
            description: { [language]: translated[1]?.desc || "Blog description 2" },
            image: "/assets/img/blog/blog2.webp",
          },
          {
            _id: 3,
            slug: "the-power-of-uiux-elevating-digital-experiences",
            title: { [language]: translated[2]?.title || "Blog Title 3" },
            description: { [language]: translated[2]?.desc || "Blog description 3" },
            image: "/assets/img/blog/blog3.webp",
          },
        ];
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [language, t]);

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
                  {t("blogs.blogTitle")}
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                  {t("blogs.blogDesc")}
                </p>
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
                  <li className="font-medium text-[#F15A29]">
                    {t("blogs.breadcrumb")}
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

      {/* Blog Cards Section */}
      <section id="news" className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="container">
          <div
            className="
              grid gap-6 sm:gap-8
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3
            "
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="relative group">
                  <div className="shadow-blog flex h-full flex-col overflow-hidden rounded-xl bg-white">
                    <div className="relative block aspect-video bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-1 flex-col justify-between px-4 py-6 sm:px-6 md:px-8">
                      <div>
                        <div className="mb-3 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="mb-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="mb-4 h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              blogs.map((blog) => {
                const blogTitle = blog.title?.[language] || blog.title?.en || blog.title || 'Untitled';
                const blogDescription = blog.description?.[language] || blog.description?.en || blog.description || 'No description available';
                const blogImage = blog.image || '/assets/img/blog/blog1.webp';
                const blogLink = `/blog/${blog.slug || blog._id}`;
                
                return (
                  <article key={blog._id} className="relative group">
                    <div className="shadow-blog flex h-full flex-col overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:scale-[1.02]">
                      {/* Blog Image */}
                      <div className="relative block aspect-video">
                        <Image
                          src={blogImage}
                          alt={blogTitle}
                          fill
                          className="w-full object-cover duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Blog Content */}
                      <div className="flex flex-1 flex-col justify-between px-4 py-6 sm:px-6 md:px-8">
                        <div>
                          <h3 className="mb-3 text-lg sm:text-xl font-semibold text-black line-clamp-2">
                            <Link
                              href={blogLink}
                              className="hover:text-primary duration-200"
                            >
                              <span className="absolute inset-0" aria-hidden="true"></span>
                              {blogTitle}
                            </Link>
                          </h3>
                          <p className="mb-4 text-sm sm:text-base font-medium text-gray-600 line-clamp-3">
                            {blogDescription}
                          </p>
                        </div>
                        <Link
                          href={blogLink}
                          className="text-sm font-medium text-[#004A70] underline hover:text-[#F15A29] hover:no-underline duration-200"
                        >
                          {t("blog.readMore")}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}