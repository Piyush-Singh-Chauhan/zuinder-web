"use client";


import ContactSection from "@/component/Home/ContactSection";
import { useLanguage } from "@/i18n/LanguageProvider";


export default function ContactPage() {
    const { t } = useLanguage();
    return (
        <>
      <div className="min-h-screen bg-white pt-30"> {/* header ke neeche jagah chhodne ke liye */}
        {/* Breadcrumb + Title */}
        <section className="relative z-10 overflow-hidden bg-white pb-[30px] pt-[55px]">
  <div className="container mx-auto px-4">
    <div className="-mx-4 flex flex-wrap items-center">
      {/* Left Side */}
      <div className="w-full px-4 md:w-8/12 lg:w-7/12">
        <div className="mb-12 max-w-[570px] md:mb-0">
          <h1 className="mb-5 text-2xl font-bold text-[#004A70] sm:text-3xl md:text-4xl">
            {t("contact.title")}
          </h1>
          <p className="text-base font-medium leading-relaxed text-gray-600">
            {t("contact.intro")}
          </p>
        </div>
      </div>

      {/* Right Side (Breadcrumb) */}
      <div className="w-full px-4 md:w-4/12 lg:w-5/12">
        <div className="text-start md:text-end">
          <ul className="flex flex-wrap items-center md:justify-end">
            <li className="flex items-center">
              <a
                href="/"
                className="pr-1 text-base font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
              >
                {t("common.home")}
              </a>
              <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
            </li>
            <li className="text-base font-medium text-[#F15A29]">
              {t("contact.breadcrumb")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
  
        {/* Contact Section */}
        <ContactSection />
      </div>
      </>
    );
  }