"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Portfolio() {
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
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/admin/portfolio');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            setPortfolioItems(result.data);
          } else {
            console.error('Invalid API response structure');
            // Fallback to static data structure with translation
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
            
            const i18nItems = (t("portfolioHome.items") || []).map((transItem, idx) => ({
              _id: `portfolio-${idx}`,
              title: { [language]: transItem.title },
              category: { [language]: transItem.category },
              description: { [language]: transItem.description },
              image: portfolioDataStatic[idx]?.image,
              slug: portfolioDataStatic[idx]?.link?.replace('/portfolio/', ''),
            }));
            setPortfolioItems(i18nItems);
          }
        } else {
          console.error('Failed to fetch portfolio');
          // Fallback to static data structure with translation
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
          
          const i18nItems = (t("portfolioHome.items") || []).map((transItem, idx) => ({
            _id: `portfolio-${idx}`,
            title: { [language]: transItem.title },
            category: { [language]: transItem.category },
            description: { [language]: transItem.description },
            image: portfolioDataStatic[idx]?.image,
            slug: portfolioDataStatic[idx]?.link?.replace('/portfolio/', ''),
          }));
          setPortfolioItems(i18nItems);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Fallback to static data
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
        
        const i18nItems = (t("portfolioHome.items") || []).map((transItem, idx) => ({
          _id: `portfolio-${idx}`,
          title: { [language]: transItem.title },
          category: { [language]: transItem.category },
          description: { [language]: transItem.description },
          image: portfolioDataStatic[idx]?.image,
          slug: portfolioDataStatic[idx]?.link?.replace('/portfolio/', ''),
        }));
        setPortfolioItems(i18nItems);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [language, t]);

  const filters = t("portfolioHome.filters") || [];
  const activeFilterLabel = filters[selectedFilterIndex] || "";

  // Get unique categories from portfolio items
  const dynamicFilters = ['All', ...new Set(portfolioItems.map(item => 
    item.category?.[language] || item.category?.en || item.category || 'Uncategorized'
  ).filter(Boolean))];

  // Use dynamic filters if available, otherwise fallback to translation filters
  const availableFilters = dynamicFilters.length > 1 ? dynamicFilters : filters;

  const filteredData = selectedFilterIndex === 0 
    ? portfolioItems 
    : portfolioItems.filter((item) => {
        const itemCategory = getLocalizedText(item.category, 'Uncategorized');
        return itemCategory === (availableFilters[selectedFilterIndex] || activeFilterLabel);
      });

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
          {/* Filter tabs */}
          {availableFilters.length > 1 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {availableFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFilterIndex(index)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedFilterIndex === index
                      ? 'bg-[#F15A29] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
          
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group relative overflow-hidden rounded-md shadow-service">
                  <div className="relative aspect-[518/291] w-full bg-gray-200 animate-pulse"></div>
                  <div className="mt-3">
                    <div className="mb-2 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredData.map((item, index) => {
                const itemTitle = getLocalizedText(item.title, 'Portfolio Item');
                const itemDescription = getLocalizedText(item.description, 'Description not available');
                const itemImage = item.image || '/assets/img/portfolio/portfolio-01.jpg';
                const itemLink = item.slug ? `/portfolio/${item.slug}` : (item.link || '#');
                
                return (
                  <div
                    key={item._id || index}
                    className="group relative overflow-hidden rounded-md shadow-service"
                  >
                    <div className="relative aspect-[518/291] w-full">
                      <Image
                        src={itemImage}
                        alt={itemTitle}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F15A29]/20 opacity-0 transition-all group-hover:opacity-100">
                        <button
                          className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white"
                          onClick={() => setModalImage(itemImage)}
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
                        href={itemLink}
                        className="inline-block text-xl font-semibold text-black hover:text-primary mb-2"
                      >
                        {itemTitle}
                      </a>
                    </h3>
                    <p className="text-body-color text-base font-medium">
                      {itemDescription}
                    </p>
                  </div>
                );
              })
            )}
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
