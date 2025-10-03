"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Services() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        // Filter only active services and sort by order
        const activeServices = data.data
          .filter(service => service.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        // Limit to 3 services for home page
        setServices(activeServices.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get localized text
  const getLocalizedText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || textObj.pt || fallback;
  };


  return (
    <section
      id="services"
      className="bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row flex-wrap -mx-4 mb-10 lg:mb-[60px] items-end">
          <div className="w-full lg:w-8/12 px-4 mb-6 lg:mb-0">
            <div className="max-w-full md:max-w-[625px]">
              <span className="mb-2 block text-lg font-semibold text-[#de5f04]">
                {t("servicesHome.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[45px]/[55px] font-bold text-[#004A70]">
                {t("servicesHome.title")}
              </h2>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 flex lg:justify-end">
            <Link
              href="/services"
              className="hover:text-[#de5f04] text-lg font-medium text-white underline"
            >
              {t("servicesHome.explore")}
            </Link>
          </div>
        </div>

 

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F15A29]"></div>
            </div>
          ) : (
            services.map((service, idx) => (
              <article
                key={service._id || idx}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                {service.image && (
                  <div className="relative w-full h-64 sm:h-56 md:h-64 lg:h-56 xl:h-64">
                    <Image
                      src={service.image}
                      alt={getLocalizedText(service.title)}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-6 lg:p-8 xl:p-10 flex flex-col flex-1">
                  <h3>
                    <Link
                      href={`/services#${service._id}`}
                      className="text-[#004A70] hover:text-[#de5f04] mb-4 block text-lg sm:text-xl font-bold"
                    >
                      {getLocalizedText(service.title)}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6 border-b border-[#F3F3F3] pb-7 text-base leading-relaxed flex-1">
                    {getLocalizedText(service.description)}
                  </p>
                  
                  {/* Features */}
                  {service.features && (getLocalizedText(service.features) && getLocalizedText(service.features).length > 0) && (
                    <div className="mb-4">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {getLocalizedText(service.features).slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-[#F15A29] rounded-full mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Price */}
                  {service.price && (
                    <div className="text-[#de5f04] font-semibold mb-4">
                      {service.price}
                    </div>
                  )}
                  
                  <Link
                    href={`/services#${service._id}`}
                    className="text-[#004A70]  hover:text-[#de5f04] inline-flex items-center gap-2 sm:gap-3 text-base font-medium mt-auto"
                  >
                    <span>{t("servicesHome.viewDetails")}</span>
                    <svg
                      width="22"
                      height="18"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75002C2.33752 10.2094 1.99377 10.5532 1.99377 10.9657C1.99377 11.3782 2.33752 11.7563 2.75002 11.7563H17.4282L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9282 19.0094 12.1344 19.0094C12.3407 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

 