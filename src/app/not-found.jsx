// pages/404.js
"use client";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Custom404() {
  const { t } = useLanguage();
  return (
    <section className="py-[120px] lg:pt-[200px]">
      <div className="px-4 xl:container mx-auto">
        <div className="w-full rounded-xl border px-6 py-10 sm:p-[70px] mx-auto">
          <div className="relative pt-6 text-center md:pt-8">
            <span className="text-primary mb-2 block text-lg font-semibold text-[#c7340d]">{t("error.oops")}</span>
            <h1 className="font-heading text-dark mb-5 text-3xl font-semibold sm:text-4xl md:text-[50px] md:leading-[60px]">
              {t("error.title")}
            </h1>
          </div>
          <p className="text-gray-500 mb-6 text-center">
            {t("error.desc")}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/"
              className="px-8 py-3 rounded-full font-medium text-white 
                           [background:linear-gradient(98deg,#e46703_-1.68%,#c7340d_103.45%)] 
                           hover:[background:linear-gradient(98deg,#c7340d_-1.68%,#e46703_103.45%)] 
                           transition duration-300 disabled:opacity-50"
            >
              {t("error.home")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
