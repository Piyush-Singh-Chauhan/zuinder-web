"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function TeamSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[120px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 max-w-[510px] mx-auto text-center md:mb-16">
          <span className="mb-2 block text-lg font-semibold text-[#F15A29]">
            {t("team.badge")}
          </span>
          <h2 className="mb-4 text-2xl font-bold text-dark sm:text-3xl md:text-[40px]">
            {t("team.title")}
          </h2>
          <p className="text-base text-body-color">
            {t("team.desc")}
          </p>
        </div>

        {/* Team Cards */}
        <div className="flex flex-wrap justify-center -mx-4">
          {t("teamMembers").map((member, index) => (
            <div
              key={index}
              className="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <div className="mx-auto mb-10 w-full max-w-[280px] sm:max-w-[330px]">
                <div className="relative aspect-[149/182] overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-5 left-0 w-full text-center">
                    <div className="relative mx-5 rounded-lg bg-white px-3 py-5 shadow-md">
                      <h3 className="text-dark text-base font-semibold md:text-lg">
                        {member.name}
                      </h3>
                      <p className="text-body-color text-sm md:text-base">
                        {member.role}
                      </p>

                      {/* Decorative SVGs */}
                      <span className="absolute bottom-0 left-0">
                        <svg
                          width="61"
                          height="30"
                          viewBox="0 0 61 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="45"
                            r="45"
                            fill=" #F15A29"
                            fillOpacity="0.11"
                          />
                        </svg>
                      </span>
                      <span className="absolute right-0 top-0">
                        <svg
                          width="20"
                          height="25"
                          viewBox="0 0 20 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {Array.from({ length: 15 }).map((_, i) => {
                            const x = (i % 4) * 6 + 0.7;
                            const y = Math.floor(i / 4) * 6 + 1.5;
                            return (
                              <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="0.65"
                                transform="rotate(-90)"
                                fill="#3056D3"
                              />
                            );
                          })}
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
