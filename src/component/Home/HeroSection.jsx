"use client";

import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section
      id="home"
      className="relative bg-bg pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap  items-center -mx-4">
          {/* Top Content (Text) */}
          <div
            className="w-full px-4"
            data-aos="fade-right"
          >
            <div className="hero-content text-center">
              <h1 className="text-text mb-4 text-3xl text-[#004A70] leading-snug font-bold sm:text-4xl lg:text-[40px] xl:text-[42px]">
                {t("hero.title").includes("<br>") ? (
                  <span dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
                ) : (
                  t("hero.title")
                )}
              </h1>
              <p className="text-text mb-8 max-w-3xl mx-auto text-base opacity-80">
                {t("hero.subtitle")}
              </p>

              {/* Buttons */}
              <ul className="flex flex-wrap font-bold justify-center items-center gap-10 sm:gap-8">
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
                <p className="mb-4 flex items-center justify-center text-xs font-normal text-text opacity-70">
                  {t("hero.trusted")}
                  <span className="ml-2 inline-block h-[1px] w-8 bg-text/50"></span>
                </p>
                <div className="flex flex-wrap justify-center items-center gap-10">
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

          {/* Bottom Video */}
          <div className="w-full px-4 mt-10 lg:mt-16" data-aos="fade-up">
            <div className="relative z-10 aspect-[18/7] w-full max-w-full mx-auto">
              {/* Always show the actual video */}
              <video
                src="/assets/video/zuinder-hero-video.mp4"
                // autoPlay
                loop
                muted
                controls
                className="w-full h-full object-contain rounded-lg"
              />
              {/* Dotted Background */}
              {/* <span className="absolute -bottom-6 -left-20 sm:-bottom-8 sm:-left-8 z-[-1]">
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
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}