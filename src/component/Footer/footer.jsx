"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the backend
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/admin/services');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            // Filter active services and sort by order
            const activeServices = result.data
              .filter(service => service.isActive)
              .sort((a, b) => (a.order || 0) - (b.order || 0));
            setServices(activeServices);
          }
        }
      } catch (error) {
        console.error('Error fetching services for footer:', error);
      }
    };

    fetchServices();
  }, []);

  // Helper function to get localized text
  const getLocalizedText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || textObj.pt || fallback;
  };

  return (
    <footer className="relative z-10 bg-[#004A70] pb-8 pt-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">
          {/* Contact Info */}
          <div className="w-full px-4 mb-10 md:w-1/2 lg:w-4/12">
            <div className="">
              <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-[44px]">
                {t("footer.letsTalk")}
              </h2>
              <h3 className="mb-2 text-2xl font-bold text-[#F15A29]">{t("footer.contactInfo")}</h3>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.email")}</p>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.address")}</p>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.phone")}</p>
            </div>
          </div>

          {/* What I Do - Services */}
          <div className="w-full px-4 mb-10 md:w-1/2 lg:w-3/12">
            <div className="">
              <h3 className="mb-9 text-xl font-semibold text-white">{t("footer.whatIDo")}</h3>
              <ul className="space-y-3">
                {services.length > 0 ? (
                  services.map((service) => (
                    <li key={service._id}>
                      <a
                        href={`/services#${service._id}`}
                        className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                      >
                        {getLocalizedText(service.title, 'Service')}
                      </a>
                    </li>
                  ))
                ) : (
                  // Fallback to static links if services can't be loaded
                  (t("footer.whatIDoLinks") || []).map(
                    (item, i) => (
                      <li key={i}>
                        <a
                          href="/services"
                          className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          </div>
          
          {/* News */}
          <div className="w-full px-4 mb-10 md:w-1/2 lg:w-2/12">
            <div className="">
              <h3 className="mb-9 text-xl font-semibold text-white">{t("footer.news")}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/resources/case-studies"
                    className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                  >
                    {language === 'pt' ? 'Estudos de Caso' : 'Case Studies'}
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                  >
                    {language === 'pt' ? 'Artigos do Blog' : 'Blog Articles'}
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/industry-reports"
                    className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                  >
                    {language === 'pt' ? 'Relatórios da Indústria' : 'Industry Reports'}
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/free-templates"
                    className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                  >
                    {language === 'pt' ? 'Templates Gratuitos' : 'Free Templates'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-4 mb-10 md:w-1/2 lg:w-3/12">
            <div className="">
              <h3 className="mb-9 text-xl font-semibold text-white">{t("footer.quickLinks")}</h3>
              <ul className="space-y-3">
                {(t("footer.quickLinksItems") || []).map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" border-t border-white/10 pt-12">
          <div className="flex flex-wrap items-center justify-center mb-5 -mx-2">
            {["facebook", "twitter", "linkedin"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90A4] text-dark duration-200 hover:bg-[#F15A29] hover:text-white mx-2 my-1"
              >
                {/* Placeholder Icon */}
                <span className="text-sm font-bold">{social[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
          <p className="text-center text-base font-medium text-[#4A90A4]">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}