"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

const portfolioDataStatic = [
  {
    image: "/assets/img/portfolio/portfolio-01.jpg",
    link: "/portfolio/startup-landing-page",
  },
  {
    image: "/assets/img/portfolio/portfolio-02.jpg",
    link: "/portfolio/job-portal-landing-page",
  },
  {
    image: "/assets/img/portfolio/portfolio-03.jpg",
    link: "/portfolio/saas-landing-page",
  },
  {
    image: "/assets/img/portfolio/portfolio-04.jpg",
    link: "/portfolio/business-corporate-template",
  },
];

export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const i18nItems = (t("portfolioHome.items") || []).map((transItem, idx) => ({
    title: transItem.title,
    category: transItem.category,
    description: transItem.description,
    image: portfolioDataStatic[idx]?.image,
    link: portfolioDataStatic[idx]?.link,
  }));

  const filters = t("portfolioHome.filters") || [];
  const activeFilterLabel = filters[selectedFilterIndex] || "";

  const filteredData =
    selectedFilterIndex === 0
      ? i18nItems
      : i18nItems.filter((item) => item.category === activeFilterLabel);

  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white pt-[150px] pb-[50px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            {/* Left Content */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-12 max-w-[570px] md:mb-0">
                <h1 className="mb-5 text-2xl font-bold text-[#004A70] sm:text-3xl">
                  {t("portfolio.title")}
                </h1>
                <p className="text-base font-medium leading-relaxed text-[#333333]">
                  {t("portfolio.desc")}
                </p>
              </div>
            </div>

            {/* Right Breadcrumb */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-end">
                <ul className="flex items-center md:justify-end">
                  <li className="flex items-center">
                    <a
                      href="/"
                      className="pr-1 text-base font-medium text-[#004A70] hover:text-[#df5f04]"
                    >
                      {t("common.home")}
                    </a>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-[#333333]"></span>
                  </li>
                  <li className="text-base font-medium text-[#df5f04]">
                    {t("portfolio.breadcrumb")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Background SVGs */}
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
            ></rect>
            <rect
              opacity="0.05"
              width="345.355"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 74 330.677)"
              fill="url(#paint1_linear_0:1)"
            ></rect>
            <defs>
              <linearGradient
                id="paint0_linear_0:1"
                x1="68.4956"
                y1="0"
                x2="68.4956"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_0:1"
                x1="172.678"
                y1="0"
                x2="172.678"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>

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
            ></rect>
            <defs>
              <linearGradient
                id="paint0_linear_54:595"
                x1="144.859"
                y1="0"
                x2="144.859"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </section>
      {/* Portfolio Section */}

      <section className="bg-white pt-[90px] pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-md shadow-service"
              >
                <div className="relative aspect-[518/291] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F15A29]/20 opacity-0 transition-all group-hover:opacity-100">
                    <button
                      className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white"
                      onClick={() => setModalImage(item.image)}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="mt-3">
                  <a
                    href={item.link}
                    className="inline-block text-xl font-semibold text-black hover:text-primary mb-2"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="text-body-color text-base font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setModalImage(null)}
        >
          <div className="relative w-[90%] max-w-3xl">
            <Image
              src={modalImage}
              alt="portfolio"
              width={1200}
              height={800}
              className="rounded-md"
            />
            <button
              className="absolute top-3 right-3 text-white text-3xl font-bold"
              onClick={() => setModalImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
