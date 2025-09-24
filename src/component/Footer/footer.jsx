"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-10 bg-[#004A70] pb-12 pt-[100px] text-white">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap">
          {/* Contact Info */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12">
            <div className="mb-10">
              <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-[44px]">
                {t("footer.letsTalk")}
              </h2>
              <h3 className="mb-2 text-2xl font-bold text-[#F15A29]">{t("footer.contactInfo")}</h3>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.email")}</p>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.address")}</p>
              <p className="mb-1 text-base font-medium text-[#4A90A4]">{t("footer.phone")}</p>
            </div>
          </div>

          {/* What I Do */}
          <div className="w-full px-4 md:w-1/2 lg:w-3/12">
            <div className="mb-10">
              <h3 className="mb-9 text-xl font-semibold text-white">{t("footer.whatIDo")}</h3>
              <ul className="space-y-3">
                {(t("footer.whatIDoLinks") || []).map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* News */}
          <div className="w-full px-4 md:w-1/2 lg:w-2/12">
            <div className="mb-10">
              <h3 className="mb-9 text-xl font-semibold text-white">{t("footer.news")}</h3>
              <ul className="space-y-3">
                {(t("footer.newsLinks") || []).map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="inline-block text-base text-[#4A90A4] hover:text-[#F15A29] transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-4 md:w-1/2 lg:w-3/12">
            <div className="mb-10">
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
        <div className="mt-10 border-t border-white/10 pt-12">
          <div className="mb-5 flex items-center justify-center space-x-4">
            {["facebook", "twitter", "linkedin"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90A4] text-dark duration-200 hover:bg-[#F15A29] hover:text-white"
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
