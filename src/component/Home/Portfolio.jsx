"use client";

import { useState, useEffect } from "react";
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

export default function PortfolioSection() {
  const { t, language } = useLanguage();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get localized text
  const getLocalizedText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || textObj.pt || fallback;
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setPortfolioItems(data.data);
      } else {
        // Fallback to static data if no portfolio items from API
        const translated = t("portfolioHome.items") || [];
        const fallbackItems = translated.map((transItem, idx) => ({
          _id: idx + 1,
          title: transItem.title,
          category: transItem.category,
          description: transItem.description,
          image: portfolioDataStatic[idx]?.image,
          link: portfolioDataStatic[idx]?.link,
        }));
        setPortfolioItems(fallbackItems);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio items:', error);
      // Fallback to static data
      const translated = t("portfolioHome.items") || [];
      const fallbackItems = translated.map((transItem, idx) => ({
        _id: idx + 1,
        title: transItem.title,
        category: transItem.category,
        description: transItem.description,
        image: portfolioDataStatic[idx]?.image,
        link: portfolioDataStatic[idx]?.link,
      }));
      setPortfolioItems(fallbackItems);
    } finally {
      setLoading(false);
    }
  };

  // Build i18n-aware data
  const i18nItems = portfolioItems.map((item) => ({
    title: getLocalizedText(item.title),
    category: getLocalizedText(item.category),
    description: getLocalizedText(item.description),
    image: item.image,
    link: item.link,
    _id: item._id
  }));

  const filters = t("portfolioHome.filters") || [];
  const activeFilterLabel = filters[selectedFilterIndex] || "";

  const filteredData =
    selectedFilterIndex === 0
      ? i18nItems
      : i18nItems.filter((item) => item.category === activeFilterLabel);

  return (
    <section id="portfolio" className="bg-[#f8f9ff] py-[70px] sm:py-[90px] lg:py-[120px] ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="w-full px-4">
          <div className="mx-auto mb-12 text-center max-w-[600px]">
            <span className="mb-2 block text-lg font-semibold text-[#F15A29]">
              {t("portfolioHome.badge")}
            </span>
            <h2 className="mb-5 text-3xl font-bold sm:text-4xl md:text-[45px] leading-[55px] text-black">
              {t("portfolioHome.title")}
            </h2>
            <p className="text-lg font-medium text-body-color">
              {t("portfolioHome.desc")}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="w-full px-4 mb-12 flex flex-wrap justify-center gap-2">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilterIndex(idx)}
              className={`mb-2 rounded-full px-5 py-2 text-sm sm:text-base font-semibold capitalize transition ${
                selectedFilterIndex === idx
                  ? "bg-[#004A70] text-white"
                  : "text-body-color hover:bg-[#004A70]/5 hover:text-[#004A70]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F15A29]"></div>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div key={item._id || index} className="group relative overflow-hidden rounded-md shadow-service">
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
                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
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
                <p className="text-body-color text-base font-medium">{item.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

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
    </section>
  );
}
