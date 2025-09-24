"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function BlogSection() {
  const { t } = useLanguage();
  const translated = t("blog.items") || [];
  const blogs = [
    {
      id: 1,
      title: translated[0]?.title,
      desc: translated[0]?.desc,
      image: "/assets/img/blog/blog1.webp",
      link: "/blog/exploring-the-mern-stack-powering-modern-web-development",
    },
    {
      id: 2,
      title: translated[1]?.title,
      desc: translated[1]?.desc,
      image: "/assets/img/blog/blog2.webp",
      link: "/blog/best-ui-components-for-modern-websites",
    },
    {
      id: 3,
      title: translated[2]?.title,
      desc: translated[2]?.desc,
      image: "/assets/img/blog/blog3.webp",
      link: "/blog/the-power-of-uiux-elevating-digital-experiences",
    },
  ];

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
          {blogs.map((blog) => (
            <article key={blog.id} className="relative group">
              <div className="shadow-blog flex h-full flex-col overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:scale-[1.02]">
                {/* Blog Image */}
                <div className="relative block aspect-video">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="rounded-t-xl w-full object-cover duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex flex-1 flex-col justify-between px-4 py-6 sm:px-6 md:px-8">
                  <div>
                    <h3 className="mb-3 line-clamp-2">
                      <Link
                        href={blog.link}
                        className="hover:text-primary text-lg sm:text-xl font-semibold text-black duration-200"
                      >
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-body-color mb-4 line-clamp-3 text-sm sm:text-base font-medium">
                      {blog.desc}
                    </p>
                  </div>
                  <Link
                    href={blog.link}
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