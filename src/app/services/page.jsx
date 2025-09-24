"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ServiceDetails() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("website-development");

  const tabs = (t("services.tabs") || []).map((tab) => ({
    id: tab.id,
    label: tab.label,
    image: tab.image,
    title: tab.title,
    description1: tab.description1,
    description2: tab.description2,
    marketing: tab.marketing,
    branding: tab.branding,
  }));

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white pt-[150px] pb-[50px]">
        <div className="container mx-auto px-4">
          <div className="mx-[-16px] flex flex-wrap items-center">
            {/* Left Content */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-12 max-w-[570px] md:mb-0">
                <h1 className="mb-5 text-2xl font-bold text-[#004A70] sm:text-3xl">
                  {t("services.introTitle")}
                </h1>
                <p className="text-base font-medium leading-relaxed text-body-color text-gray-500">
                  {t("services.introDesc")}
                </p>
              </div>
            </div>

            {/* Right Breadcrumb */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-end">
                <ul className="flex items-center md:justify-end">
                  <li className="flex items-center">
                    <a
                      className="pr-1 text-base font-medium text-[#004A70] hover:text-[#e85b27]"
                      href="/"
                    >
                      {t("common.home")}
                    </a>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                  <li className="text-base font-medium text-primary text-[#e85b27]">
                    {t("services.breadcrumb")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative SVGs */}
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
            />
            <rect
              opacity="0.05"
              width="345.355"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 74 330.677)"
              fill="url(#paint1_linear_0:1)"
            />
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
            />
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

      <section className="bg-gray-50 pt-[90px] pb-20">
        <div className="container mx-auto px-5">
          <div className="-mx-5 flex flex-wrap">
            {/* Sidebar */}
            <div className="w-full px-5 lg:w-4/12 space-y-10">
              <div>
                <h3 className="mb-[22px] text-[34px] font-bold text-black">
                  {t("services.sidebarTitle")}
                </h3>
                <div className="border-gray-300 rounded-xs border">
                  {tabs.map((tab) => (
                    <a
                      key={tab.id}
                      href={`#${tab.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab.id);
                      }}
                      className={`flex w-full items-center gap-3 border-b border-gray-300 px-5 py-4 text-lg font-medium duration-200 last:border-0 hover:text-[#c93b0c] ${
                        activeTab === tab.id
                          ? "text-[#c93b0c] font-semibold"
                          : "text-black"
                      }`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75002C2.33752 10.2094 1.99377 10.5532 1.99377 10.9657C1.99377 11.3782 2.33752 11.7563 2.75002 11.7563H17.4282L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9282 19.0094 12.1344 19.0094C12.3407 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z"
                          fill="currentColor"
                        />
                      </svg>
                      {tab.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Box */}
              <div className="bg-[#02527d] px-7 py-10 text-center">
                <div className="mx-auto w-full max-w-[215px]">
                  <h3 className="mb-5 text-2xl font-bold text-white">
                    {t("services.contactBoxTitle")}
                  </h3>
                  <p className="mb-1.5 text-white">(+550) 647 876 093</p>
                  <p className="mb-9 text-white">support@company.com</p>
                  <a href="/contact">
                  <button className="flex h-12 w-full items-center justify-center rounded-full bg-[#c93b0c] text-white font-medium">
                    {t("services.callBack")}
                  </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-5 lg:w-8/12">
              <div>
                <div className="relative mb-8 aspect-[34/20] rounded-xs bg-stone-100">
                  <Image
                    src={currentTab.image}
                    alt={currentTab.title}
                    fill
                    className="object-cover object-center rounded-xs"
                    sizes="100vw"
                  />
                </div>
                <h1 className="mb-7 text-2xl font-bold text-black sm:text-4xl lg:text-3xl">
                  {currentTab.title}
                </h1>
                <p className="mb-8 text-base text-body-color sm:text-lg lg:text-base xl:text-lg text-gray-500">
                  {currentTab.description1}
                </p>
                <p className="mb-10 text-base text-body-color sm:text-lg lg:text-base xl:text-lg text-gray-500">
                  {currentTab.description2}
                </p>

                {/* Marketing Solutions */}
                <h4 className="mb-8 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  <span className="text-primary text-[#e85a28]">01.</span>{" "}
                  {t("services.marketing")}
                </h4>
                <ul className="mb-7 list-inside list-disc marker:text-[#e85b27] text-gray-500">
                  {currentTab.marketing.map((item, idx) => (
                    <li
                      key={idx}
                      className="mb-3 text-base text-body-color sm:text-lg lg:text-base xl:text-lg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mb-10 text-base text-body-color sm:text-lg lg:text-base xl:text-lg text-gray-500">
                  {t("services.extraParagraph")}
                </p>

                {/* Branding Solutions */}
                <h4 className="mb-8 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  <span className="text-primary text-[#e85a28]">02.</span>{" "}
                  {t("services.branding")}
                </h4>
                <p className="mb-8 text-base text-body-color sm:text-lg lg:text-base xl:text-lg text-gray-500">
                  {currentTab.branding}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
