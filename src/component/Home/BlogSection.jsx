"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useState, useEffect } from "react";

export default function BlogSection() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Helper function to get localized text
  const getLocalizedText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || textObj.pt || fallback;
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs?limit=3');
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setBlogs(data.data);
      } else {
        // Fallback to static data if no blogs from API
        const translated = t("blog.items") || [];
        setBlogs([
          {
            _id: 1,
            title: { en: translated[0]?.title, pt: translated[0]?.title },
            description: { en: translated[0]?.desc, pt: translated[0]?.desc },
            image: "/assets/img/blog/blog1.webp",
            slug: "exploring-the-mern-stack-powering-modern-web-development",
          },
          {
            _id: 2,
            title: { en: translated[1]?.title, pt: translated[1]?.title },
            description: { en: translated[1]?.desc, pt: translated[1]?.desc },
            image: "/assets/img/blog/blog2.webp",
            slug: "best-ui-components-for-modern-websites",
          },
          {
            _id: 3,
            title: { en: translated[2]?.title, pt: translated[2]?.title },
            description: { en: translated[2]?.desc, pt: translated[2]?.desc },
            image: "/assets/img/blog/blog3.webp",
            slug: "the-power-of-uiux-elevating-digital-experiences",
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      // Fallback to static data
      const translated = t("blog.items") || [];
      setBlogs([
        {
          _id: 1,
          title: { en: translated[0]?.title, pt: translated[0]?.title },
          description: { en: translated[0]?.desc, pt: translated[0]?.desc },
          image: "/assets/img/blog/blog1.webp",
          slug: "exploring-the-mern-stack-powering-modern-web-development",
        },
        {
          _id: 2,
          title: { en: translated[1]?.title, pt: translated[1]?.title },
          description: { en: translated[1]?.desc, pt: translated[1]?.desc },
          image: "/assets/img/blog/blog2.webp",
          slug: "best-ui-components-for-modern-websites",
        },
        {
          _id: 3,
          title: { en: translated[2]?.title, pt: translated[2]?.title },
          description: { en: translated[2]?.desc, pt: translated[2]?.desc },
          image: "/assets/img/blog/blog3.webp",
          slug: "the-power-of-uiux-elevating-digital-experiences",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="news" className="bg-[#f8f9ff] py-16 sm:py-20 lg:pt-[120px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-20">
              <span className="text-[#F15A29] mb-2 block text-sm sm:text-base font-semibold">
                {t("blog.badge")}
              </span>
              <h2 className="mb-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-[45px]">
                {t("blog.title")}
              </h2>
              <p className="text-body-color text-base sm:text-lg font-medium">
                {t("blog.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="
          grid gap-6 sm:gap-8
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
        ">
          {blogs.slice(0, 3).map((blog) => (
            <article key={blog._id} className="relative group">
              <div className="shadow-blog flex h-full flex-col overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:scale-[1.02]">
                {/* Blog Image */}
                <div className="relative block aspect-video">
                  <Image
                    src={blog.image}
                    alt={getLocalizedText(blog.title)}
                    fill
                    className="rounded-t-xl w-full object-cover duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex flex-1 flex-col justify-between px-4 py-6 sm:px-6 md:px-8">
                  <div>
                    <h3 className="mb-3 line-clamp-2">
                      <Link
                        href={blog.slug ? `/blog/${blog.slug}` : `#`}
                        className="hover:text-primary text-lg sm:text-xl font-semibold text-black duration-200"
                      >
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {getLocalizedText(blog.title)}
                      </Link>
                    </h3>
                    <p className="text-body-color mb-4 line-clamp-3 text-sm sm:text-base font-medium">
                      {getLocalizedText(blog.description)}
                    </p>
                  </div>
                  <Link
                    href={blog.slug ? `/blog/${blog.slug}` : `#`}
                    className="hover:text-primary text-xs sm:text-sm font-medium text-black underline duration-200 hover:no-underline"
                  >
                    {t("blog.readMore")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}