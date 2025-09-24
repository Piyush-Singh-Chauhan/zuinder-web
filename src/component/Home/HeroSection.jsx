"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      id="home"
      className="relative bg-bg pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Left Content */}
          <div
            className="w-full px-4 lg:w-6/12 xl:w-5/12"
            data-aos="fade-right"
          >
            <div className="hero-content text-center lg:text-left">
              <h1 className="text-text mb-4 text-3xl leading-snug font-bold sm:text-4xl lg:text-[40px] xl:text-[42px]">
                {t("hero.title").includes("<br>") ? (
                  <span dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
                ) : (
                  t("hero.title")
                )}
              </h1>
              <p className="text-text mb-8 max-w-xl mx-auto lg:mx-0 text-base opacity-80">
                {t("hero.subtitle")}
              </p>

              {/* Buttons */}
              <ul className="flex flex-wrap font-bold justify-center lg:justify-start items-center gap-6 sm:gap-8">
                <li>
                  <a
                    href="/portfolio"
                    className="bg-[#F15A29] hover:bg-[#004A70] inline-flex items-center justify-center rounded-lg px-8 sm:px-10 py-3 sm:py-4 text-base font-medium text-white transition duration-300"
                  >
                    {t("hero.explore")}
                  </a>
                </li>
                <li className="leading-none">
                  <a
                    href="#"
                    className="text-text hover:text-primary inline-flex items-center justify-center py-1 text-base font-normal transition-colors"
                  >
                    <span className="mr-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="11"
                          fill="var(--color-secondary)"
                        ></circle>
                        <rect
                          x="6.9"
                          y="13.36"
                          width="8.18"
                          height="1.63"
                          fill="white"
                        ></rect>
                        <rect
                          x="10.18"
                          y="6"
                          width="1.63"
                          height="4.09"
                          fill="white"
                        ></rect>
                        <path
                          d="M11 12.54L13.83 9.47H8.16L11 12.54Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                    {t("hero.download")}
                  </a>
                </li>
              </ul>

              {/* Trusted Clients */}
              <div className="clients pt-12 sm:pt-16">
                <p className="mb-4 flex items-center justify-center lg:justify-start text-xs font-normal text-text opacity-70">
                  {t("hero.trusted")}
                  <span className="ml-2 inline-block h-[1px] w-8 bg-text/50"></span>
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                  <div className="w-auto">
                    <Image
                      src="/assets/img/clients/lineicons.svg"
                      alt="Lineicons"
                      width={150}
                      height={40}
                      className="h-auto max-w-[150px] sm:max-w-[200px]"
                    />
                  </div>
                  <div className="w-auto">
                    <Image
                      src="/assets/img/clients/formbold.svg"
                      alt="Formbold"
                      width={150}
                      height={40}
                      className="h-auto max-w-[150px] sm:max-w-[200px]"
                    />
                  </div>
                  <div className="w-auto">
                    <Image
                      src="/assets/img/clients/uideck.svg"
                      alt="Uideck"
                      width={150}
                      height={40}
                      className="h-auto max-w-[150px] sm:max-w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden px-4 xl:block xl:w-1/12"></div>
          <div className="w-full px-4 lg:w-6/12 mt-10 lg:mt-0" data-aos="fade-left">
            <div className="flex w-full lg:justify-end">
              <div className="relative z-10 aspect-[491/515] w-full max-w-[420px] sm:max-w-[491px] mx-auto lg:mx-0">
                <Image
                  src="/assets/img/Hero/hero-image-01.webp"
                  alt="hero"
                  fill
                  priority
                  className="object-contain"
                />
                {/* Dotted Background */}
                <span className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-[-1]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {[...Array(5)].map((_, row) =>
                      [...Array(5)].map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={2.5 + col * 22}
                          cy={2.5 + row * 22}
                          r="2.5"
                          fill="var(--color-secondary)"
                        />
                      ))
                    )}
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
